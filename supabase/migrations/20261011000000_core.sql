create extension if not exists pg_trgm;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  color text not null default '#64748b',
  created_at timestamptz not null default now(),
  unique (organization_id, name),
  unique (id, organization_id)
);

create table public.links (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  category_id uuid,
  created_by uuid not null references auth.users(id),
  title text not null check (char_length(title) between 1 and 160),
  url text not null check (char_length(url) <= 2048),
  description text not null default '' check (char_length(description) <= 2000),
  is_important boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_checked_at timestamptz,
  last_status_code integer,
  unique (id, organization_id),
  foreign key (category_id, organization_id)
    references public.categories(id, organization_id)
);

create index links_org_created_idx
  on public.links (organization_id, created_at desc);
create index links_org_category_idx
  on public.links (organization_id, category_id);
create index links_title_trgm_idx
  on public.links using gin (title gin_trgm_ops);
create index links_description_trgm_idx
  on public.links using gin (description gin_trgm_ops);

create or replace function public.is_org_member(p_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members m
    where m.organization_id = p_org_id
      and m.user_id = auth.uid()
  );
$$;

create or replace function public.can_manage_org(p_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members m
    where m.organization_id = p_org_id
      and m.user_id = auth.uid()
      and m.role in ('owner', 'admin')
  );
$$;

revoke all on function public.is_org_member(uuid) from public;
revoke all on function public.can_manage_org(uuid) from public;
grant execute on function public.is_org_member(uuid) to authenticated;
grant execute on function public.can_manage_org(uuid) to authenticated;

create or replace function public.create_organization(p_name text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_org_id uuid;
  v_name text := btrim(p_name);
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if v_name is null or char_length(v_name) < 1 or char_length(v_name) > 100 then
    raise exception 'Organization name must be 1-100 characters' using errcode = '22023';
  end if;

  insert into public.organizations (name, created_by)
  values (v_name, v_user_id)
  returning id into v_org_id;

  insert into public.organization_members (organization_id, user_id, role)
  values (v_org_id, v_user_id, 'owner');

  return v_org_id;
end;
$$;

revoke all on function public.create_organization(text) from public, anon;
grant execute on function public.create_organization(text) to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.categories enable row level security;
alter table public.links enable row level security;

create policy "users read own profile" on public.profiles
  for select to authenticated using (id = auth.uid());
create policy "users update own profile" on public.profiles
  for update to authenticated using (id = auth.uid())
  with check (id = auth.uid());

create policy "organization members read organization" on public.organizations
  for select to authenticated using (public.is_org_member(id));
create policy "organization admins update organization" on public.organizations
  for update to authenticated using (public.can_manage_org(id))
  with check (public.can_manage_org(id));
create policy "organization admins delete organization" on public.organizations
  for delete to authenticated using (public.can_manage_org(id));

create policy "users read own or visible memberships" on public.organization_members
  for select to authenticated
  using (user_id = auth.uid() or public.is_org_member(organization_id));

create policy "members read categories" on public.categories
  for select to authenticated using (public.is_org_member(organization_id));
create policy "admins manage categories" on public.categories
  for all to authenticated using (public.can_manage_org(organization_id))
  with check (public.can_manage_org(organization_id));

create policy "members read links" on public.links
  for select to authenticated using (public.is_org_member(organization_id));
create policy "members create links" on public.links
  for insert to authenticated
  with check (public.is_org_member(organization_id) and created_by = auth.uid());
create policy "creator or admins update links" on public.links
  for update to authenticated
  using (public.is_org_member(organization_id)
    and (created_by = auth.uid() or public.can_manage_org(organization_id)))
  with check (public.is_org_member(organization_id)
    and (created_by = auth.uid() or public.can_manage_org(organization_id)));
create policy "creator or admins delete links" on public.links
  for delete to authenticated
  using (created_by = auth.uid() or public.can_manage_org(organization_id));

grant select, update on public.profiles to authenticated;
grant select, update, delete on public.organizations to authenticated;
grant select on public.organization_members to authenticated;
grant select, insert, update, delete on public.categories to authenticated;
grant select, insert, update, delete on public.links to authenticated;

create or replace function public.search_links(
  p_organization_id uuid,
  p_query text,
  p_category_id uuid default null
)
returns table (
  id uuid,
  title text,
  url text,
  description text,
  category_id uuid,
  category_name text,
  is_important boolean,
  created_at timestamptz,
  last_checked_at timestamptz,
  last_status_code integer,
  score real
)
language sql
stable
set search_path = public
set pg_trgm.similarity_threshold = 0.2
as $$
  select
    l.id, l.title, l.url, l.description, l.category_id, c.name,
    l.is_important, l.created_at, l.last_checked_at, l.last_status_code,
    case when nullif(btrim(p_query), '') is null then 0::real
      else greatest(similarity(l.title, p_query), similarity(l.description, p_query))
    end as score
  from public.links l
  left join public.categories c on c.id = l.category_id
    and c.organization_id = l.organization_id
  where l.organization_id = p_organization_id
    and (p_category_id is null or l.category_id = p_category_id)
    and (
      nullif(btrim(p_query), '') is null
      or l.title % p_query
      or l.description % p_query
      or strpos(lower(l.title), lower(p_query)) > 0
      or strpos(lower(l.description), lower(p_query)) > 0
    )
  order by l.is_important desc, score desc, l.created_at desc
  limit 100;
$$;

grant execute on function public.search_links(uuid, text, uuid) to authenticated;