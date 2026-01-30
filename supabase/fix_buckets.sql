-- 1. FIX DATABASE TABLE (site_settings)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Reset policies for site_settings to avoid conflicts
DROP POLICY IF EXISTS "Allow public read" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.site_settings;

-- Re-create policies
CREATE POLICY "Allow public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated update" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- 2. FIX STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('assets', 'assets', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp']),
  ('avatars', 'avatars', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;


-- 3. FIX STORAGE POLICIES (Assets)
DROP POLICY IF EXISTS "Public Access Assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Assets" ON storage.objects;

CREATE POLICY "Public Access Assets" ON storage.objects FOR SELECT USING ( bucket_id = 'assets' );
CREATE POLICY "Authenticated Upload Assets" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'assets' AND auth.role() = 'authenticated' );
CREATE POLICY "Authenticated Update Assets" ON storage.objects FOR UPDATE USING ( bucket_id = 'assets' AND auth.role() = 'authenticated' );


-- 4. FIX STORAGE POLICIES (Avatars)
DROP POLICY IF EXISTS "Public Access Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Avatars" ON storage.objects;

CREATE POLICY "Public Access Avatars" ON storage.objects FOR SELECT USING ( bucket_id = 'avatars' );
CREATE POLICY "Authenticated Upload Avatars" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );
CREATE POLICY "Authenticated Update Avatars" ON storage.objects FOR UPDATE USING ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );
