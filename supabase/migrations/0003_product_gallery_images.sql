-- =======================================================
-- 0003: Tambah kolom gallery_images ke products
-- Menyimpan gambar variant TAMBAHAN (bukan cover).
-- image_url tetap menjadi cover/thumbnail utama.
-- Jalankan SETELAH 0002 di Supabase SQL Editor.
-- =======================================================

BEGIN;

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS gallery_images JSONB NOT NULL DEFAULT '[]';

COMMENT ON COLUMN products.gallery_images IS
  'Array URL gambar tambahan (variant) untuk galeri di halaman detail produk. Cover tetap di image_url.';

COMMIT;
