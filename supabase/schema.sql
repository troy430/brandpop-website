-- Run this in your Supabase SQL Editor to create/update the onboarding submissions table

create table if not exists public.onboarding_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  client_slug text not null default 'new-client',
  services jsonb default '[]'::jsonb,
  business jsonb default '{}'::jsonb,
  contacts jsonb default '{}'::jsonb,
  a2p jsonb default '{}'::jsonb,
  calendar jsonb default '{}'::jsonb,
  notifications jsonb default '{}'::jsonb,
  leads jsonb default '{}'::jsonb,
  raw_payload jsonb default '{}'::jsonb,
  -- File references
  ein_document_path text,
  ein_document_url text,
  lead_csv_path text,
  lead_csv_url text
);

-- Drop the old optin column if it exists (no longer used)
alter table public.onboarding_submissions drop column if exists optin;

-- Enable RLS (you'll want to add appropriate policies for your setup)
alter table public.onboarding_submissions enable row level security;

-- Example policy: allow inserts from the service role (API route)
create policy "Allow service role insert"
  on public.onboarding_submissions
  for insert
  to service_role
  with check (true);

-- Example policy: allow service role select (admin dashboard)
create policy "Allow service role select"
  on public.onboarding_submissions
  for select
  to service_role
  using (true);

-- Create storage bucket for onboarding files (run separately if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('onboarding-files', 'onboarding-files', true);

-- Allow public upload (adjust as needed)
-- CREATE POLICY "Allow public upload"
--   ON storage.objects
--   FOR INSERT
--   TO public
--   WITH CHECK (bucket_id = 'onboarding-files');

-- CREATE POLICY "Allow public read"
--   ON storage.objects
--   FOR SELECT
--   TO public
--   USING (bucket_id = 'onboarding-files');
