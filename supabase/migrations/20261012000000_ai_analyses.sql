create table public.ai_analyses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  original_text text not null check (char_length(original_text) between 1 and 12000),
  summary text not null check (char_length(summary) between 1 and 2000),
  action_items jsonb not null default '[]'::jsonb
    check (jsonb_typeof(action_items) = 'array'),
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (id, organization_id)
);

alter table public.links
  add column ai_analysis_id uuid;

alter table public.links
  add constraint links_ai_analysis_same_org_fk
  foreign key (ai_analysis_id, organization_id)
  references public.ai_analyses(id, organization_id)
  on delete set null (ai_analysis_id);

create index ai_analyses_org_created_idx
  on public.ai_analyses (organization_id, created_at desc);
create index links_ai_analysis_idx
  on public.links (ai_analysis_id)
  where ai_analysis_id is not null;

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

revoke all on function public.is_org_member(uuid) from public;
grant execute on function public.is_org_member(uuid) to authenticated;

alter table public.ai_analyses enable row level security;

create policy "organization members read AI analyses"
  on public.ai_analyses
  for select
  to authenticated
  using (public.is_org_member(organization_id));

create policy "organization members create AI analyses"
  on public.ai_analyses
  for insert
  to authenticated
  with check (
    public.is_org_member(organization_id)
    and created_by = auth.uid()
  );
create policy "authors or admins delete AI analyses"
  on public.ai_analyses
  for delete
  to authenticated
  using (created_by = auth.uid() or public.can_manage_org(organization_id));

grant select, insert, delete on public.ai_analyses to authenticated;
grant select, insert, update, delete on public.links to authenticated;

create table public.ai_analysis_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  bucket text not null check (bucket in ('minute', 'day')),
  bucket_start timestamptz not null,
  request_count integer not null default 0 check (request_count > 0),
  primary key (user_id, bucket, bucket_start)
);

alter table public.ai_analysis_usage enable row level security;
revoke all on public.ai_analysis_usage from anon, authenticated;

create or replace function public.consume_ai_analysis_quota()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_minute_count integer;
  v_day_count integer;
  v_minute_start timestamptz := date_trunc('minute', now());
  v_day_start timestamptz := date_trunc('day', now() at time zone 'utc') at time zone 'utc';
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  insert into public.ai_analysis_usage (user_id, bucket, bucket_start, request_count)
  values (v_user_id, 'minute', v_minute_start, 1)
  on conflict (user_id, bucket, bucket_start)
  do update set request_count = public.ai_analysis_usage.request_count + 1
  returning request_count into v_minute_count;

  insert into public.ai_analysis_usage (user_id, bucket, bucket_start, request_count)
  values (v_user_id, 'day', v_day_start, 1)
  on conflict (user_id, bucket, bucket_start)
  do update set request_count = public.ai_analysis_usage.request_count + 1
  returning request_count into v_day_count;

  return jsonb_build_object(
    'minute_count', v_minute_count,
    'day_count', v_day_count
  );
end;
$$;

revoke all on function public.consume_ai_analysis_quota() from public, anon;
grant execute on function public.consume_ai_analysis_quota() to authenticated;

create or replace function public.delete_expired_ai_analyses()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  delete from public.ai_analyses
  where created_at < now() - interval '90 days';
  get diagnostics v_deleted = row_count;

  delete from public.ai_analysis_usage
  where bucket_start < now() - interval '2 days';

  return v_deleted;
end;
$$;

revoke all on function public.delete_expired_ai_analyses() from public, anon, authenticated;
grant execute on function public.delete_expired_ai_analyses() to service_role;