-- =======================================================
-- KUMOART SUPABASE SCHEMA
-- Jalankan script ini di Supabase SQL Editor
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
  is_featured BOOLEAN DEFAULT false,
  is_active   BOOLEAN DEFAULT true,
  stock       INTEGER DEFAULT 0,
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
  is_active   BOOLEAN DEFAULT true,
  discount    INTEGER,
  price       INTEGER DEFAULT 0,
  location    TEXT,
  quota       INTEGER,
  terms       JSONB DEFAULT '[]',
  content     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- -------------------------------------------------------
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE events   ENABLE ROW LEVEL SECURITY;

-- Public dapat membaca semua produk & event
CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Public read events"
  ON events FOR SELECT
  USING (true);

-- Hanya authenticated user (admin) yang bisa write
CREATE POLICY "Admin insert products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update products"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete products"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert events"
  ON events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update events"
  ON events FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete events"
  ON events FOR DELETE
  USING (auth.role() = 'authenticated');

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
-- Buat manual di Storage > New Bucket, atau jalankan ini:
-- -------------------------------------------------------
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('product-images', 'product-images', true);

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('event-images', 'event-images', true);

-- Storage policies (public read, authenticated write)
-- CREATE POLICY "Public read product images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'product-images');

-- CREATE POLICY "Admin upload product images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- CREATE POLICY "Admin delete product images"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- CREATE POLICY "Public read event images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'event-images');

-- CREATE POLICY "Admin upload event images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'event-images' AND auth.role() = 'authenticated');

-- CREATE POLICY "Admin delete event images"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'event-images' AND auth.role() = 'authenticated');
