create extension if not exists pgcrypto;

create type if not exists public.application_type as enum ('school_only', 'school_and_workshop');

create type if not exists public.application_status as enum (
  'draft',
  'submitted',
  'under_review',
  'approved',
  'rejected'
);

create type if not exists public.recommendation_status as enum (
  'pending',
  'requested',
  'received',
  'expired'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  application_type public.application_type not null,
  status public.application_status not null default 'draft',
  applicant_name text not null,
  applicant_email text not null,
  applicant_phone text not null,
  institution text not null,
  data jsonb not null default '{}'::jsonb,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete cascade,
  referee_name text not null,
  referee_email text not null,
  token uuid not null default gen_random_uuid(),
  status public.recommendation_status not null default 'pending',
  file_path text,
  file_name text,
  uploaded_at timestamptz,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists recommendations_token_key on public.recommendations(token);
create index if not exists recommendations_application_id_idx on public.recommendations(application_id);

create trigger set_applications_updated_at
before update on public.applications
for each row
execute function public.set_updated_at();

create trigger set_recommendations_updated_at
before update on public.recommendations
for each row
execute function public.set_updated_at();

alter table public.applications enable row level security;
alter table public.recommendations enable row level security;

comment on table public.applications is 'Application records are managed by server-side Supabase clients.';
comment on table public.recommendations is 'Referee records and uploads are managed by server-side Supabase clients.';

-- Baseline security posture:
-- Do not add anonymous policies yet. Later submission flows should write through
-- the server-side service role client, while RLS stays enabled to protect direct
-- public access from the browser.
