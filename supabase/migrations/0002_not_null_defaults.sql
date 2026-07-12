-- =======================================================
-- 0002: Backfill NULL lalu kunci kolom dengan NOT NULL
-- Jalankan SETELAH 0001 di Supabase SQL Editor.
-- Menyelaraskan schema dengan tipe TypeScript aplikasi.
-- =======================================================

BEGIN;

-- products
UPDATE products SET is_featured = false WHERE is_featured IS NULL;
UPDATE products SET is_active   = true  WHERE is_active   IS NULL;
UPDATE products SET stock       = 0     WHERE stock       IS NULL;

ALTER TABLE products
  ALTER COLUMN is_featured SET DEFAULT false,
  ALTER COLUMN is_featured SET NOT NULL,
  ALTER COLUMN is_active   SET DEFAULT true,
  ALTER COLUMN is_active   SET NOT NULL,
  ALTER COLUMN stock       SET DEFAULT 0,
  ALTER COLUMN stock       SET NOT NULL;

-- events
UPDATE events SET is_active = true  WHERE is_active IS NULL;
UPDATE events SET price     = 0     WHERE price     IS NULL;
UPDATE events SET terms     = '[]'  WHERE terms     IS NULL;

ALTER TABLE events
  ALTER COLUMN is_active SET DEFAULT true,
  ALTER COLUMN is_active SET NOT NULL,
  ALTER COLUMN price     SET DEFAULT 0,
  ALTER COLUMN price     SET NOT NULL,
  ALTER COLUMN terms     SET DEFAULT '[]',
  ALTER COLUMN terms     SET NOT NULL;

COMMIT;
