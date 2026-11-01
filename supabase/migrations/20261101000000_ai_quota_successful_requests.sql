create or replace function public.check_ai_analysis_quota()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_minute_start timestamptz := date_trunc('minute', now());
  v_day_start timestamptz := date_trunc('day', now() at time zone 'utc') at time zone 'utc';
  v_minute_count integer;
  v_day_count integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select coalesce((
    select request_count
    from public.ai_analysis_usage
    where user_id = v_user_id
      and bucket = 'minute'
      and bucket_start = v_minute_start
  ), 0) into v_minute_count;

  select coalesce((
    select request_count
    from public.ai_analysis_usage
    where user_id = v_user_id
      and bucket = 'day'
      and bucket_start = v_day_start
  ), 0) into v_day_count;

  return jsonb_build_object(
    'minute_count', v_minute_count,
    'day_count', v_day_count,
    'allowed', v_minute_count < 5 and v_day_count < 50
  );
end;
$$;

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

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text, 0));

  select coalesce((
    select request_count
    from public.ai_analysis_usage
    where user_id = v_user_id
      and bucket = 'minute'
      and bucket_start = v_minute_start
  ), 0) into v_minute_count;

  select coalesce((
    select request_count
    from public.ai_analysis_usage
    where user_id = v_user_id
      and bucket = 'day'
      and bucket_start = v_day_start
  ), 0) into v_day_count;

  if v_minute_count >= 5 or v_day_count >= 50 then
    return jsonb_build_object(
      'minute_count', v_minute_count,
      'day_count', v_day_count,
      'allowed', false
    );
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
    'day_count', v_day_count,
    'allowed', true
  );
end;
$$;

revoke all on function public.check_ai_analysis_quota() from public, anon;
grant execute on function public.check_ai_analysis_quota() to authenticated;

revoke all on function public.consume_ai_analysis_quota() from public, anon;
grant execute on function public.consume_ai_analysis_quota() to authenticated;
