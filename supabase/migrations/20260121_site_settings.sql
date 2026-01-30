-- Create site_settings table to store global configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for site_settings
-- Everyone can read settings (like the logo)
CREATE POLICY "Allow public read"
ON public.site_settings FOR SELECT
USING (true);

-- Only authenticated users (admins/doctors) can update settings
CREATE POLICY "Allow authenticated update"
ON public.site_settings FOR UPDATE
USING (auth.role() = 'authenticated');

-- Only authenticated users can insert settings
CREATE POLICY "Allow authenticated insert"
ON public.site_settings FOR INSERT
WITH CHECK (auth.role() = 'authenticated');


-- STORAGE BUCKET SETUP
-- Note: You might need to run these in the SQL editor if this script is not running via a migration tool that supports storage creation.

-- Create 'avatars' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create 'assets' bucket for system assets (like logo)
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;


-- STORAGE POLICIES
-- Allow public access to avatars
CREATE POLICY "Public Access Avatars"
ON storage.objects FOR SELECT
USING ( bucket_id = 'avatars' );

-- Allow authenticated users to upload avatars
CREATE POLICY "Authenticated Upload Avatars"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

-- Allow authenticated users to update/delete their uploaded avatars (simplified for admin context)
CREATE POLICY "Authenticated Update Avatars"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );


-- Allow public access to assets
CREATE POLICY "Public Access Assets"
ON storage.objects FOR SELECT
USING ( bucket_id = 'assets' );

-- Allow authenticated users to upload assets
CREATE POLICY "Authenticated Upload Assets"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'assets' AND auth.role() = 'authenticated' );

-- Allow authenticated users to update assets
CREATE POLICY "Authenticated Update Assets"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'assets' AND auth.role() = 'authenticated' );
