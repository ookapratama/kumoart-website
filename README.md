# Kumoart - Website UMKM Kerajinan Rajut (CMS Edition) 🧶

Website promosi UMKM kerajinan tangan rajut menggunakan **Next.js** dengan integrasi **Decap CMS** untuk manajemen konten berbasis file Markdown.

---

## 🚀 Fitur Utama

- **⚡ Next.js App Router**: Cepat, modern, dan mendukung SSG (Static Site Generation).
- **📦 Decap CMS**: Kelola produk dan event tanpa perlu database, cukup file Markdown.
- **🌐 Dual Language**: Mendukung Bahasa Indonesia & Inggris (i18n).
- **📱 Responsive Design**: Tampilan premium yang optimal di HP maupun Desktop.
- **💬 Auto-WhatsApp**: Pesan produk atau tanya event langsung terhubung ke WhatsApp dengan teks otomatis.

---

## 🛠️ Cara Menjalankan Project

### 1. Persiapan Awal

Pastikan Anda sudah menginstal **Node.js** dan mengikuti langkah berikut:

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

_Edit `.env.local` dan isi nomor WhatsApp serta informasi brand Anda._

### 2. Menjalankan Website (Mode Development)

```bash
npm run dev
```

Website dapat diakses di `http://localhost:3000`.

### 3. Menggunakan Admin CMS (Lokal)

Untuk menambah atau mengubah produk/event di komputer Anda sendiri:

1. **Jalankan Proxy Server** (di terminal baru):
   ```bash
   npx decap-server
   ```
2. **Buka Admin**: Akses `http://localhost:3000/admin/`.
3. Klik tombol **Login** untuk masuk ke dashboard pengelolaan konten.

---

## 📝 Struktur Data (Markdown)

Kini data tidak lagi disimpan di JSON, melainkan di folder `content/`:

- `content/products/` - File `.md` untuk setiap produk.
- `content/events/` - File `.md` untuk setiap event.
- `public/images/uploads/` - Lokasi penyimpanan gambar yang diupload via CMS.

---

## 📁 Folder Penting

- `/src/app` - Halaman dan routing website.
- `/src/components` - Komponen UI (Navbar, Footer, Card, dll).
- `/src/lib` - Logika bisnis (pembacaan file server-side, i18n, dll).
- `/public/admin` - Konfigurasi Decap CMS.

---

## 🚢 Deployment (Vercel/Netlify)

Project ini menggunakan **Static Export**. Setiap kali ada perubahan di CMS (saat sudah online), website perlu di-build ulang (otomatis oleh Vercel/Netlify saat ada push ke GitHub).

### Langkah Deployment:

1. Push project ke repository GitHub Anda.
2. Sambungkan ke Vercel atau Netlify.
3. Gunakan command Build: `npm run build` dan folder Output: `out`.
4. Tambahkan Environment Variables yang diperlukan di dashboard hosting.

---

## 🎨 Branding & Warna

Tema utama menggunakan palet **Rose & Gray** untuk kesan premium dan feminin. Anda bisa mengubah konfigurasi brand di `src/lib/config.ts` atau langsung melalui `.env.local`.

---

Dibuat dengan ❤️ untuk **Kumo Art Craft**.
