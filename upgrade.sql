-- Hospital Panel Upgrade Migration
-- Run this entire script in your Supabase SQL Editor

-- 1. Role-Based Access Control (RBAC)
-- Create Enum for Roles
do $$ begin
    create type public.app_role as enum ('admin', 'doctor', 'seo_editor');
exception
    when duplicate_object then null;
end $$;

-- Create Profiles Table (Links to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role app_role default 'doctor',
  email text,
  doctor_id uuid references public.doctors(id), -- Link to doctor record if applicable
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Profiles
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Users can view own profile" 
on public.profiles for select using (auth.uid() = id);

create policy "Admins can view all profiles" 
on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 2. Doctor Availability Management
-- Add OPD timings to doctors table
alter table public.doctors 
add column if not exists opd_start_time text, 
add column if not exists opd_end_time text;

-- Add availability check constraint
alter table public.doctors drop constraint if exists doctors_availability_check;
alter table public.doctors add constraint doctors_availability_check 
check (availability in ('Available', 'Busy', 'On Leave', 'In Surgery'));

-- 3. Blog Workflow Enhancement
-- Update status check constraint
alter table public.blogs drop constraint if exists blogs_status_check;
alter table public.blogs add constraint blogs_status_check check (status in ('draft', 'review', 'published'));

-- Add view count
alter table public.blogs 
add column if not exists view_count bigint default 0;

-- 4. Video Management
alter table public.videos 
add column if not exists department_id uuid references public.departments(id),
add column if not exists seo_title text,
add column if not exists seo_description text,
add column if not exists is_published boolean default true,
add column if not exists view_count bigint default 0;

-- 5. Doctor Profile Self-Management (Pending Changes)
create table if not exists public.doctor_profile_changes (
  id uuid default gen_random_uuid() primary key,
  doctor_id uuid references public.doctors(id) not null,
  changed_fields jsonb not null, -- Stores the delta
  status text default 'pending', -- pending, approved, rejected
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.doctor_profile_changes enable row level security;

-- 6. Activity Logs
create table if not exists public.activity_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  action text not null, -- e.g., 'BLOG_CREATE', 'DOCTOR_UPDATE'
  entity_type text, -- 'blog', 'doctor'
  entity_id uuid,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.activity_logs enable row level security;

-- Only admins can view logs
create policy "Admins can view logs" 
on public.activity_logs for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 7. Analytics Support
alter table public.doctors 
add column if not exists view_count bigint default 0;
