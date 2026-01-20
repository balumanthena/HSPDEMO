-- Create Doctors Table
create table public.doctors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  specialization text not null,
  experience integer default 0,
  image text,
  availability text default 'Available',
  is_featured boolean default false,
  rating numeric(2,1) default 5.0,
  next_available text,
  about text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Departments Table
create table public.departments (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  icon_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Blogs Table
create table public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text,
  description text,
  image text,
  seo_title text,
  seo_description text,
  status text default 'draft', -- 'draft' or 'published'
  doctor_id uuid references public.doctors(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Videos Table
create table public.videos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  youtube_url text not null,
  category text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.doctors enable row level security;
alter table public.departments enable row level security;
alter table public.blogs enable row level security;
alter table public.videos enable row level security;

-- Create Policies (Public Read, Authenticated Write)

-- Doctors
create policy "Public Doctors are viewable by everyone" 
on public.doctors for select using (true);

create policy "Doctors are editable by authenticated users" 
on public.doctors for all using (auth.role() = 'authenticated');

-- Departments
create policy "Public Departments are viewable by everyone" 
on public.departments for select using (true);

create policy "Departments are editable by authenticated users" 
on public.departments for all using (auth.role() = 'authenticated');

-- Blogs
create policy "Published Blogs are viewable by everyone" 
on public.blogs for select using (status = 'published');

create policy "Blogs are editable by authenticated users" 
on public.blogs for all using (auth.role() = 'authenticated');

-- Videos
create policy "Public Videos are viewable by everyone" 
on public.videos for select using (true);

create policy "Videos are editable by authenticated users" 
on public.videos for all using (auth.role() = 'authenticated');

-- Insert Initial Categories/Departments (Optional Seed)
insert into public.departments (title, description, icon_name) values
('Obstetrics & Gynecology', 'Comprehensive women’s health and maternity care services.', 'Baby'),
('Pediatrics', 'Expert care for newborns, children, and adolescents.', 'Stethoscope'),
('Cardiology', 'Advanced heart care, diagnostics, and cardiac surgeries.', 'Heart'),
('Orthopedics', 'Bone, joint, and spine care solutions including replacements.', 'Bone'),
('Neurology', 'Treatment for disorders of the nervous system and brain.', 'Brain');
