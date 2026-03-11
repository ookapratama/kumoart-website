import { Metadata } from 'next';
import { config } from '@/lib/config';

// Static metadata untuk halaman katalog produk
export const metadata: Metadata = {
  title: 'Katalog Produk Rajut Handmade',
  description: `Jelajahi koleksi lengkap produk rajut handmade dari ${config.brand.name}. Tas rajut macrame, boneka amigurumi, aksesoris, dan home decor berkualitas tinggi. Pesan langsung via WhatsApp!`,
  keywords: [
    'produk rajut',
    'tas rajut',
    'boneka amigurumi',
    'aksesoris rajut',
    'kerajinan tangan',
    'handmade',
    'beli rajut',
    config.brand.name.toLowerCase(),
  ],
  alternates: {
    canonical: '/produk',
  },
  openGraph: {
    title: `Katalog Produk | ${config.brand.name}`,
    description: 'Koleksi lengkap produk rajut handmade berkualitas. Tas, boneka, aksesoris & home decor.',
    url: `${config.site.url}/produk`,
    type: 'website',
  },
};
