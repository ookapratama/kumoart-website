# Kumoart - Website UMKM

Website promosi UMKM untuk katalog produk dan event menggunakan Next.js dengan pendekatan Static Site Generation (SSG).

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
    ├── products.ts               # Fungsi akses data produk
    └── events.ts                 # Fungsi akses data event
```

## 🔄 Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   JSON Files    │────▶│   Lib Functions │────▶│   Components    │
│  (data/*.json)  │     │  (lib/*.ts)     │     │  (components/*) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                                ┌─────────────────┐
                                                │   App Pages     │
                                                │   (app/*.tsx)   │
                                                └─────────────────┘
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

### WhatsApp Number
Ubah nomor WhatsApp di `components/CTA/WhatsAppButton.tsx`:
```typescript
const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor Anda
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
  "discount": 25,           // opsional
  "price": 100000,          // opsional
  "location": "Lokasi",     // opsional
  "quota": 20,              // opsional
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
Edit Tailwind config atau ganti class `amber-*` di komponen dengan warna brand Anda.

### Logo
Ganti teks "Kumoart" di `Navbar.tsx` dan `Footer.tsx` dengan logo atau nama UMKM Anda.

### Metadata SEO
Edit metadata di `app/layout.tsx` sesuai informasi UMKM Anda.

---

Dibuat dengan ❤️ menggunakan Next.js
