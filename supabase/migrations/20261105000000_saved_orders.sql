-- Saved orders: an analysis becomes a project ("order") with tasks and a stored
-- snapshot of the analysis the user saw. Saved analyses are exempt from the
-- 90-day cleanup.

alter table public.projects
  add column if not exists analysis_snapshot jsonb,
  add column if not exists snapshot_language text,
  add column if not exists decision text
    check (decision in ('take', 'negotiate', 'decline'));

alter table public.tasks
  add column if not exists timing text not null default ''
    check (char_length(timing) <= 160);

-- Atomically turns an analysis into an order: client (reused by name),
-- project, tasks and the analysis link are created together.
create or replace function public.save_order(
  p_organization_id uuid,
  p_analysis_id uuid,
  p_name text,
  p_client_name text,
  p_snapshot jsonb,
  p_language text,
  p_decision text,
  p_tasks jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_client_id uuid;
  v_project_id uuid;
  v_client_name text := nullif(btrim(coalesce(p_client_name, '')), '');
begin
  if v_user is null or not public.is_org_member(p_organization_id) then
    raise exception 'Access denied' using errcode = '42501';
  end if;
  if p_tasks is null or jsonb_typeof(p_tasks) <> 'array' or jsonb_array_length(p_tasks) > 30 then
    raise exception 'Invalid tasks' using errcode = '22023';
  end if;
  if char_length(btrim(coalesce(p_name, ''))) not between 1 and 160 then
    raise exception 'Invalid name' using errcode = '22023';
  end if;

  perform 1
  from public.ai_analyses
  where id = p_analysis_id
    and organization_id = p_organization_id
    and created_by = v_user
    and project_id is null
  for update;
  if not found then
    raise exception 'Analysis is unavailable' using errcode = 'P0002';
  end if;

  if v_client_name is not null then
    select c.id into v_client_id
    from public.clients c
    where c.organization_id = p_organization_id
      and lower(c.name) = lower(v_client_name)
    order by c.created_at
    limit 1;

    if v_client_id is null then
      insert into public.clients (organization_id, name, created_by)
      values (p_organization_id, v_client_name, v_user)
      returning id into v_client_id;
    end if;
  end if;

  insert into public.projects (
    organization_id, client_id, name, description, created_by,
    analysis_snapshot, snapshot_language, decision
  )
  values (
    p_organization_id, v_client_id, btrim(p_name), '', v_user,
    p_snapshot, p_language, p_decision
  )
  returning id into v_project_id;

  insert into public.tasks (
    organization_id, project_id, title, description, timing, status, position, created_by
  )
  select
    p_organization_id,
    v_project_id,
    left(btrim(t.value ->> 'title'), 160),
    left(coalesce(t.value ->> 'description', ''), 4000),
    left(coalesce(t.value ->> 'timing', ''), 160),
    case when coalesce(t.value ->> 'done', 'false')::boolean then 'completed' else 'new' end,
    (t.ordinality - 1)::integer,
    v_user
  from jsonb_array_elements(p_tasks) with ordinality as t(value, ordinality);

  update public.ai_analyses
  set project_id = v_project_id
  where id = p_analysis_id;

  return v_project_id;
end;
$$;

revoke all on function public.save_order(uuid, uuid, text, text, jsonb, text, text, jsonb) from public, anon;
grant execute on function public.save_order(uuid, uuid, text, text, jsonb, text, text, jsonb) to authenticated;

-- Task counts per order for the list page (invoker rights: RLS applies).
create or replace function public.order_task_counts(p_organization_id uuid)
returns table (project_id uuid, total bigint, done bigint)
language sql
stable
security invoker
set search_path = public
as $$
  select t.project_id, count(*), count(*) filter (where t.status = 'completed')
  from public.tasks t
  where t.organization_id = p_organization_id
  group by t.project_id;
$$;

revoke all on function public.order_task_counts(uuid) from public, anon;
grant execute on function public.order_task_counts(uuid) to authenticated;

-- Saved analyses are kept; only unsaved ones expire after 90 days.
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
  where created_at < now() - interval '90 days'
    and project_id is null;
  get diagnostics v_deleted = row_count;

  delete from public.ai_analysis_usage
  where bucket_start < now() - interval '2 days';

  return v_deleted;
end;
$$;

revoke all on function public.delete_expired_ai_analyses() from public, anon, authenticated;
grant execute on function public.delete_expired_ai_analyses() to service_role;

notify pgrst, 'reload schema';
