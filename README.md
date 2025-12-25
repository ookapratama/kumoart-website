# Kumoart - Website UMKM Kerajinan Rajut

Website promosi UMKM kerajinan tangan rajut menggunakan Next.js dengan pendekatan Static Site Generation (SSG).

## 🚀 Teknologi

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Static Site Generation (SSG)**

## 📁 Struktur Project

```
src/
├── app/                          # App Router pages
│   ├── layout.tsx                # Root layout dengan Navbar & Footer
│   ├── page.tsx                  # Home page (sales page)
│   ├── produk/
│   │   ├── page.tsx              # Katalog produk + search
│   │   └── [slug]/page.tsx       # Detail produk
│   └── event/
│       ├── page.tsx              # Daftar event
│       └── [slug]/page.tsx       # Detail event
├── components/
│   ├── Product/
│   │   ├── ProductCard.tsx       # Kartu produk
│   │   ├── ProductList.tsx       # Grid daftar produk
│   │   ├── ProductSearch.tsx     # Input pencarian (client-side)
│   │   └── ProductDetail.tsx     # Detail produk lengkap
│   ├── Event/
│   │   ├── EventCard.tsx         # Kartu event
│   │   └── EventList.tsx         # Grid daftar event
│   ├── CTA/
│   │   └── WhatsAppButton.tsx    # Tombol WhatsApp dengan auto-text
│   └── Layout/
│       ├── Navbar.tsx            # Navigasi responsive
│       └── Footer.tsx            # Footer dengan links
├── data/
│   ├── products.json             # Data produk
│   └── events.json               # Data event
└── lib/
    ├── config.ts                 # Konfigurasi dari environment variables
    ├── products.ts               # Fungsi akses data produk
    └── events.ts                 # Fungsi akses data event
```

## 🔐 Environment Variables

### Setup

1. Copy file `.env.example` ke `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` dengan nilai sebenarnya

3. **JANGAN** commit `.env.local` ke repository (sudah ada di .gitignore)

### Variabel yang Tersedia

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Nomor WhatsApp untuk pemesanan | `6281234567890` |
| `NEXT_PUBLIC_BRAND_NAME` | Nama brand/usaha | `Kumoart` |
| `NEXT_PUBLIC_BRAND_TAGLINE` | Tagline brand | `Handmade` |
| `NEXT_PUBLIC_ADDRESS` | Alamat lengkap | `Jl. Kreatif No. 45` |
| `NEXT_PUBLIC_EMAIL` | Email bisnis | `hello@kumoart.id` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | URL Instagram | `https://instagram.com/kumoart` |
| `NEXT_PUBLIC_TIKTOK_URL` | URL TikTok | `https://tiktok.com/@kumoart` |
| `NEXT_PUBLIC_SITE_URL` | Base URL website | `https://kumoart.id` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID | `123456789` |

### Menggunakan Config

Akses environment variables melalui `lib/config.ts`:

```typescript
import { config } from '@/lib/config';

// Contoh penggunaan
console.log(config.whatsapp.number);     // Nomor WhatsApp
console.log(config.brand.name);          // Nama brand
console.log(config.social.instagram);    // URL Instagram
```

## 📋 Fitur

### Halaman Home (`/`)
- Hero section dengan CTA
- Produk unggulan (maks 6 produk dengan `isFeatured: true`)
- Event aktif (conditional rendering, hanya jika ada `isActive: true`)
- Section keunggulan UMKM

### Halaman Produk (`/produk`)
- Katalog semua produk
- Client-side search (nama, deskripsi, kategori)
- Info jumlah produk yang ditampilkan

### Detail Produk (`/produk/[slug]`)
- Informasi lengkap produk
- Badge unggulan & stok terbatas
- Tombol WhatsApp dengan auto-text pemesanan
- Produk serupa (kategori sama)
- Breadcrumb navigation

### Halaman Event (`/event`)
- Daftar event aktif dengan badge
- Daftar event selesai (opacity rendah)

### Detail Event (`/event/[slug]`)
- Informasi lengkap event
- Syarat & ketentuan
- Lokasi, harga, kuota (opsional)
- Tombol WhatsApp untuk event aktif
- Breadcrumb navigation

## 🛠️ Library Functions

### `lib/config.ts`
```typescript
config.whatsapp.number      // Nomor WhatsApp
config.brand.name           // Nama brand
config.brand.tagline        // Tagline
config.brand.fullName       // Nama lengkap
config.contact.address      // Alamat
config.contact.email        // Email
config.social.instagram     // URL Instagram
config.social.tiktok        // URL TikTok
config.analytics.gaId       // Google Analytics ID
config.site.url             // Base URL
config.site.isDevelopment   // Cek mode development
```

### `lib/products.ts`
```typescript
getAllProducts()        // Semua produk
getProductBySlug(slug)  // Produk by slug
searchProducts(query)   // Cari produk
getFeaturedProducts(n)  // Produk unggulan
getProductsByCategory() // Produk by kategori
getAllCategories()      // Daftar kategori
getAllProductSlugs()    // Slugs untuk SSG
formatPrice(price)      // Format ke Rupiah
```

### `lib/events.ts`
```typescript
getAllEvents()          // Semua event
getActiveEvents()       // Event aktif saja
getEventBySlug(slug)    // Event by slug
getAllEventSlugs()      // Slugs untuk SSG
formatDate(date)        // Format tanggal
formatDateRange()       // Format range tanggal
isEventOngoing()        // Cek event sedang berlangsung
isEventUpcoming()       // Cek event akan datang
formatEventPrice()      // Format harga event
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan nilai sebenarnya

# Run development server
npm run dev

# Build untuk production (static export)
npm run build

# Preview production build
npm run start
```

## 📦 Static Export

Project dikonfigurasi untuk static export. Hasil build tersedia di folder `out/` dan siap di-deploy ke hosting statis seperti:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Shared hosting biasa

## ⚙️ Konfigurasi

### `next.config.ts`
```typescript
{
  output: 'export',           // Static site generation
  images: {
    unoptimized: true         // Untuk static export
  },
  trailingSlash: true         // URL dengan trailing slash
}
```

## 📝 Data Format

### Product (`data/products.json`)
```json
{
  "id": 1,
  "slug": "nama-produk",
  "name": "Nama Produk",
  "description": "Deskripsi produk...",
  "price": 100000,
  "category": "Kategori",
  "image": "/images/products/gambar.jpg",
  "isFeatured": true,
  "stock": 10
}
```

### Event (`data/events.json`)
```json
{
  "id": 1,
  "slug": "nama-event",
  "title": "Judul Event",
  "description": "Deskripsi event...",
  "startDate": "2025-01-01",
  "endDate": "2025-01-31",
  "image": "/images/events/gambar.jpg",
  "isActive": true,
  "discount": 25,
  "price": 100000,
  "location": "Lokasi",
  "quota": 20,
  "terms": ["S&K 1", "S&K 2"]
}
```

## 📸 Gambar

Letakkan gambar produk dan event di:
- `public/images/products/` - Gambar produk
- `public/images/events/` - Gambar event

Format yang direkomendasikan: JPG atau WebP dengan rasio 4:3.

## 🎨 Customization

### Warna Brand
Tema menggunakan warna `rose-*` (merah) dan `gray-900` (hitam). Edit class Tailwind di komponen jika ingin mengubah.

### Logo & Brand
Semua informasi brand diambil dari environment variables. Edit `.env.local` untuk mengubah:
- Nama brand
- Tagline
- Nomor WhatsApp
- Social media links

### Metadata SEO
Metadata SEO otomatis menggunakan nilai dari `lib/config.ts` yang mengambil dari environment variables.

---

Dibuat dengan 🧶 dan ❤️ menggunakan Next.js

