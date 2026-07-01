-- Add file upload columns to onboarding_submissions table
-- Run this in your Supabase SQL Editor if the columns don't exist yet

alter table public.onboarding_submissions
  add column if not exists ein_document_path text,
  add column if not exists ein_document_url text,
  add column if not exists lead_csv_path text,
  add column if not exists lead_csv_url text;
