-- =======================================================
-- KUMOART SUPABASE SCHEMA (canonical, full)
-- Untuk project BARU: jalankan file ini sekali di SQL Editor.
-- Untuk project yang SUDAH ADA: jalankan migrations/000x secara berurutan.
--
-- Setup admin (WAJIB, urutan penting — lihat migrations/0001):
--   1. Buat user admin via Dashboard > Authentication.
--   2. INSERT INTO public.admins (user_id)
--      SELECT id FROM auth.users WHERE email = '<admin email>';
--   3. Dashboard > Authentication > Sign In / Up:
--      matikan "Allow new users to sign up".
-- =======================================================

-- -------------------------------------------------------
-- TABEL PRODUCTS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  price       INTEGER NOT NULL DEFAULT 0,
  category    TEXT,
  image_url   TEXT,
  gallery_images JSONB NOT NULL DEFAULT '[]',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  stock       INTEGER NOT NULL DEFAULT 0,
  content     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- TABEL EVENTS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  start_date  DATE NOT NULL,
  end_date    DATE NOT NULL,
  image_url   TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  discount    INTEGER,
  price       INTEGER NOT NULL DEFAULT 0,
  location    TEXT,
  quota       INTEGER,
  terms       JSONB NOT NULL DEFAULT '[]',
  content     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- ADMIN ALLOWLIST
-- RLS aktif tanpa policy: tabel tidak terlihat lewat API,
-- hanya dikelola lewat SQL editor / service role.
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admins (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid());
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

-- -------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- Publik hanya melihat row aktif; write hanya untuk admin.
-- -------------------------------------------------------
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE events   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (is_active = true OR public.is_admin());

CREATE POLICY "Public read events"
  ON events FOR SELECT
  USING (is_active = true OR public.is_admin());

CREATE POLICY "Admin insert products"
  ON products FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update products"
  ON products FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin delete products"
  ON products FOR DELETE
  USING (public.is_admin());

CREATE POLICY "Admin insert events"
  ON events FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update events"
  ON events FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin delete events"
  ON events FOR DELETE
  USING (public.is_admin());

-- -------------------------------------------------------
-- AUTO UPDATE `updated_at`
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -------------------------------------------------------
-- SUPABASE STORAGE BUCKETS
-- Pastikan 'Public' aktif di setting bucket di dashboard.
-- -------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy untuk product-images
CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Admin update product images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Admin delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND public.is_admin());

-- Policy untuk event-images
CREATE POLICY "Public read event images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-images');

CREATE POLICY "Admin upload event images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'event-images' AND public.is_admin());

CREATE POLICY "Admin update event images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'event-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'event-images' AND public.is_admin());

CREATE POLICY "Admin delete event images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'event-images' AND public.is_admin());
