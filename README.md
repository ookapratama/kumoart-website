# Kumoart - Website UMKM Kerajinan Rajut 🧶

Website promosi UMKM kerajinan tangan rajut menggunakan **Next.js (App Router)** dengan **Supabase** sebagai database, storage gambar, dan autentikasi admin.

---

## 🚀 Fitur Utama

- **⚡ Next.js App Router**: ISR (Incremental Static Regeneration) — halaman publik statis, ter-refresh otomatis saat admin mengubah data.
- **🗄️ Supabase**: PostgreSQL + Storage + Auth. Panel admin custom di `/admin`.
- **🔐 Keamanan berlapis**: Semua mutasi lewat Server Actions dengan verifikasi admin, plus RLS allowlist di database.
- **🌐 Dual Language**: Bahasa Indonesia & Inggris (i18n).
- **📱 Responsive Design**: Optimal di HP maupun Desktop.
- **💬 Auto-WhatsApp**: Pesan produk/event langsung terhubung ke WhatsApp.

---

## 🛠️ Cara Menjalankan Project

### 1. Persiapan Awal

Pastikan **Node.js** dan **pnpm** sudah terinstal:

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
```

Edit `.env.local` dan isi:

- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (dari dashboard Supabase)
- Nomor WhatsApp serta informasi brand

### 2. Setup Supabase (sekali saja)

1. Buat project di [supabase.com](https://supabase.com).
2. Jalankan `supabase/schema.sql` di **SQL Editor** (project baru), atau `supabase/migrations/000x_*.sql` berurutan (project lama).
3. Buat user admin: **Dashboard → Authentication → Add user**.
4. Masukkan user tersebut ke allowlist admin:
   ```sql
   INSERT INTO public.admins (user_id)
   SELECT id FROM auth.users WHERE email = '<email admin>';
   ```
   ⚠️ **Wajib sebelum policy write aktif** — tanpa ini admin tidak bisa menulis data.
5. Matikan pendaftaran publik: **Authentication → Sign In / Up → Allow new users to sign up = OFF**.

### 3. Menjalankan Website (Mode Development)

```bash
pnpm dev
```

- Website: `http://localhost:3000`
- Panel Admin: `http://localhost:3000/admin` (login dengan user admin di atas)

---

## 🔐 Model Keamanan

- **Baca publik**: hanya row `is_active = true` (dipaksa oleh RLS, bukan hanya filter aplikasi).
- **Tulis**: hanya user yang terdaftar di tabel `public.admins` (fungsi `is_admin()`), diverifikasi dua lapis:
  1. Server Action (`src/lib/actions/`) memanggil `requireAdmin()` sebelum mutasi.
  2. RLS policy di database sebagai lapisan terakhir.
- Upload gambar terjadi saat **Simpan** (bukan saat drag-drop), dan file lama otomatis dihapus saat diganti/di-delete — tidak ada file yatim di storage.

---

## 📁 Struktur Penting

- `/src/app/(public)` — halaman publik (ISR, revalidate 1 jam + on-demand saat admin menyimpan).
- `/src/app/admin` — panel admin (dinamis, dilindungi proxy + layout + RLS).
- `/src/lib/actions` — Server Actions (satu-satunya jalur tulis data).
- `/src/lib/data/queries.ts` — factory query generik products/events.
- `/src/lib/supabase` — client Supabase (typed) untuk browser/server/static.
- `/supabase` — schema kanonik + migrasi SQL.

---

## 🚢 Deployment (Vercel)

1. Push project ke GitHub.
2. Sambungkan ke Vercel (build command default `next build` — **bukan** static export; proxy/auth butuh server).
3. Tambahkan environment variables di dashboard Vercel.

---

## 🎨 Branding & Warna

Tema utama menggunakan palet **Rose & Gray**. Konfigurasi brand di `src/lib/config.ts` atau via `.env.local`.

---

Dibuat dengan ❤️ untuk **Kumo Art Craft**.
