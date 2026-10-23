alter table public.profiles
  add column preferred_language text not null default 'lt'
  check (preferred_language in (
    'lt', 'en', 'ru', 'pl', 'fr', 'de', 'es', 'uk',
    'it', 'pt', 'nl', 'sv', 'ja', 'zh'
  ));
