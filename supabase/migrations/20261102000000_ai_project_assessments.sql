alter table public.ai_analyses
  add column project_assessment jsonb not null default '{}'::jsonb
  check (jsonb_typeof(project_assessment) = 'object');
