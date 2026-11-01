create table public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 160),
  email text,
  company text,
  notes text not null default '' check (char_length(notes) <= 4000),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid,
  name text not null check (char_length(name) between 1 and 160),
  description text not null default '' check (char_length(description) <= 4000),
  status text not null default 'active'
    check (status in ('active', 'completed', 'archived')),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id),
  foreign key (client_id, organization_id)
    references public.clients(id, organization_id)
    on delete set null (client_id)
);

alter table public.links
  add column project_id uuid;

alter table public.links
  add constraint links_project_same_org_fk
  foreign key (project_id, organization_id)
  references public.projects(id, organization_id)
  on delete set null (project_id);

alter table public.ai_analyses
  add column project_id uuid;

alter table public.ai_analyses
  add constraint ai_analyses_project_same_org_fk
  foreign key (project_id, organization_id)
  references public.projects(id, organization_id)
  on delete set null (project_id);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null,
  title text not null check (char_length(title) between 1 and 160),
  description text not null default '' check (char_length(description) <= 4000),
  status text not null default 'new'
    check (status in ('new', 'in_progress', 'completed')),
  priority text not null default 'normal'
    check (priority in ('low', 'normal', 'high')),
  due_at timestamptz,
  position integer not null default 0,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (project_id, organization_id)
    references public.projects(id, organization_id)
    on delete cascade
);

create index clients_org_name_idx
  on public.clients (organization_id, name);
create index projects_org_status_updated_idx
  on public.projects (organization_id, status, updated_at desc);
create index links_project_idx
  on public.links (project_id)
  where project_id is not null;
create index ai_analyses_project_idx
  on public.ai_analyses (project_id)
  where project_id is not null;
create index tasks_project_status_position_idx
  on public.tasks (project_id, status, position, created_at);

alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;

create policy "organization members read clients"
  on public.clients
  for select
  to authenticated
  using (public.is_org_member(organization_id));

create policy "organization members create clients"
  on public.clients
  for insert
  to authenticated
  with check (
    public.is_org_member(organization_id)
    and created_by = auth.uid()
  );

create policy "client creators or admins update clients"
  on public.clients
  for update
  to authenticated
  using (
    public.is_org_member(organization_id)
    and (created_by = auth.uid() or public.can_manage_org(organization_id))
  )
  with check (
    public.is_org_member(organization_id)
    and (created_by = auth.uid() or public.can_manage_org(organization_id))
  );

create policy "client creators or admins delete clients"
  on public.clients
  for delete
  to authenticated
  using (
    public.is_org_member(organization_id)
    and (created_by = auth.uid() or public.can_manage_org(organization_id))
  );

create policy "organization members read projects"
  on public.projects
  for select
  to authenticated
  using (public.is_org_member(organization_id));

create policy "organization members create projects"
  on public.projects
  for insert
  to authenticated
  with check (
    public.is_org_member(organization_id)
    and created_by = auth.uid()
  );

create policy "project creators or admins update projects"
  on public.projects
  for update
  to authenticated
  using (
    public.is_org_member(organization_id)
    and (created_by = auth.uid() or public.can_manage_org(organization_id))
  )
  with check (
    public.is_org_member(organization_id)
    and (created_by = auth.uid() or public.can_manage_org(organization_id))
  );

create policy "project creators or admins delete projects"
  on public.projects
  for delete
  to authenticated
  using (
    public.is_org_member(organization_id)
    and (created_by = auth.uid() or public.can_manage_org(organization_id))
  );

create policy "organization members read tasks"
  on public.tasks
  for select
  to authenticated
  using (public.is_org_member(organization_id));

create policy "organization members create tasks"
  on public.tasks
  for insert
  to authenticated
  with check (
    public.is_org_member(organization_id)
    and created_by = auth.uid()
  );

create policy "organization members update tasks"
  on public.tasks
  for update
  to authenticated
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "organization members delete tasks"
  on public.tasks
  for delete
  to authenticated
  using (public.is_org_member(organization_id));

grant select, insert, update, delete on public.clients to authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, delete on public.tasks to authenticated;
grant update (title, description, status, priority, due_at, position, updated_at)
  on public.tasks to authenticated;
