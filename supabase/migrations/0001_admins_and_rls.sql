-- =======================================================
-- 0001: Admin allowlist + RLS tightening
--
-- URUTAN MANUAL (WAJIB — risiko lockout jika terbalik):
--   1. Masukkan admin ke allowlist DULU:
--        INSERT INTO public.admins (user_id)
--        SELECT id FROM auth.users WHERE email = '<admin email>';
--      (jalankan setelah CREATE TABLE admins di bawah, sebelum
--       policy write di-flip — script ini satu transaksi, jadi
--       cukup ganti '<admin email>' lalu jalankan seluruh file)
--   2. Jalankan file ini di Supabase SQL Editor.
--   3. Dashboard > Authentication > Sign In / Up:
--      matikan "Allow new users to sign up".
--   4. Rotasi database password (pernah ter-commit di repo).
-- =======================================================

BEGIN;

-- -------------------------------------------------------
-- ADMIN ALLOWLIST
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admins (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS aktif TANPA policy: tabel tidak terlihat lewat API,
-- hanya bisa dikelola lewat SQL editor / service role.
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

-- >>> GANTI EMAIL DI BAWAH sebelum menjalankan <<<
INSERT INTO public.admins (user_id)
SELECT id FROM auth.users WHERE email = 'ookapratama1@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- -------------------------------------------------------
-- TABLE POLICIES: products & events
-- -------------------------------------------------------
DROP POLICY IF EXISTS "Public read products"  ON products;
DROP POLICY IF EXISTS "Public read events"    ON events;
DROP POLICY IF EXISTS "Admin insert products" ON products;
DROP POLICY IF EXISTS "Admin update products" ON products;
DROP POLICY IF EXISTS "Admin delete products" ON products;
DROP POLICY IF EXISTS "Admin insert events"   ON events;
DROP POLICY IF EXISTS "Admin update events"   ON events;
DROP POLICY IF EXISTS "Admin delete events"   ON events;

-- Publik hanya melihat row aktif; admin melihat semua.
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
-- STORAGE POLICIES: product-images & event-images
-- -------------------------------------------------------
DROP POLICY IF EXISTS "Admin upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete product images" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload event images"   ON storage.objects;
DROP POLICY IF EXISTS "Admin update event images"   ON storage.objects;
DROP POLICY IF EXISTS "Admin delete event images"   ON storage.objects;

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

COMMIT;
