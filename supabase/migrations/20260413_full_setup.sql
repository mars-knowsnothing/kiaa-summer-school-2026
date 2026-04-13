-- ═══════════════════════════════════════════════════════════
-- KIAA Summer School 2026 — Full Supabase Setup (Clean Init)
-- 在 Supabase Dashboard → SQL Editor 中执行此脚本
--
-- ⚠️  此脚本会 DROP 已有的旧表和类型，然后重新创建。
--     如果数据库中已有数据，执行前请先备份。
-- ═══════════════════════════════════════════════════════════

-- ── 0. Clean up old objects (safe if they don't exist) ──

drop table if exists public.recommendations cascade;
drop table if exists public.registrations cascade;
drop table if exists public.applications cascade;
drop type if exists public.application_type cascade;
drop type if exists public.application_status cascade;
drop type if exists public.registration_type cascade;
drop type if exists public.registration_status cascade;
drop type if exists public.recommendation_status cascade;
drop function if exists public.set_updated_at() cascade;

-- ── 1. Extensions ──

create extension if not exists pgcrypto;

-- ── 2. Enum types ──

create type public.registration_type as enum (
  'school_only',
  'school_and_workshop'
);

create type public.registration_status as enum (
  'draft',
  'submitted',
  'under_review',
  'approved',
  'rejected'
);

create type public.recommendation_status as enum (
  'pending',
  'requested',
  'received',
  'expired'
);

-- ── 3. Helper function ──

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── 4. Tables ──

create table public.registrations (
  id              uuid primary key default gen_random_uuid(),
  registration_type public.registration_type not null,
  status          public.registration_status not null default 'draft',
  applicant_name  text not null,
  applicant_email text not null,
  applicant_phone text not null,
  institution     text not null,
  data            jsonb not null default '{}'::jsonb,
  submitted_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table public.recommendations (
  id              uuid primary key default gen_random_uuid(),
  registration_id uuid references public.registrations(id) on delete cascade,
  referee_name    text not null,
  referee_email   text not null,
  token           uuid not null default gen_random_uuid(),
  status          public.recommendation_status not null default 'pending',
  file_path       text,
  file_name       text,
  uploaded_at     timestamptz,
  data            jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── 5. Indexes ──

create unique index recommendations_token_key
  on public.recommendations(token);

create index recommendations_registration_id_idx
  on public.recommendations(registration_id);

-- ── 6. Triggers ──

create trigger set_registrations_updated_at
  before update on public.registrations
  for each row execute function public.set_updated_at();

create trigger set_recommendations_updated_at
  before update on public.recommendations
  for each row execute function public.set_updated_at();

-- ── 7. RLS ──
-- Disabled: this is a public registration form with no user auth.
-- All writes go through server actions — no browser-direct access to protect against.

alter table public.registrations disable row level security;
alter table public.recommendations disable row level security;

-- ── 8. Storage bucket ──

insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false)
on conflict (id) do nothing;

-- Storage policies: allow all operations on the uploads bucket
drop policy if exists "Allow public uploads" on storage.objects;
drop policy if exists "Allow service read" on storage.objects;
drop policy if exists "anon_upload" on storage.objects;
drop policy if exists "authenticated_read" on storage.objects;
drop policy if exists "allow_upload" on storage.objects;
drop policy if exists "allow_read" on storage.objects;
drop policy if exists "uploads_all" on storage.objects;

create policy "uploads_all"
  on storage.objects
  for all
  using (bucket_id = 'uploads')
  with check (bucket_id = 'uploads');

-- ── 10. Comments ──

comment on table public.registrations is 'Registration records for KIAA Summer School 2026.';
comment on table public.recommendations is 'Recommendation letter records and uploads.';

-- ═══════════════════════════════════════════════════════════
-- Done. Tables, RLS policies, and storage bucket are ready.
-- ═══════════════════════════════════════════════════════════
