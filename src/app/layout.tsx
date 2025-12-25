import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { config } from '@/lib/config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${config.brand.name} - Kerajinan Rajut Handmade`,
    template: `%s | ${config.brand.fullName}`,
  },
  description:
    `${config.brand.name} menyediakan kerajinan rajut handmade berkualitas tinggi. Tas, boneka amigurumi, aksesoris, dan home decor dibuat dengan cinta.`,
  keywords: ['rajut', 'crochet', 'handmade', 'amigurumi', 'tas rajut', 'kerajinan tangan', 'umkm'],
  authors: [{ name: config.brand.fullName }],
  metadataBase: new URL(config.site.url),
  openGraph: {
    title: `${config.brand.name} - Kerajinan Rajut Handmade`,
    description:
      'Kerajinan rajut handmade berkualitas tinggi. Setiap jahitan adalah cerita, setiap produk adalah karya seni.',
    type: 'website',
    locale: 'id_ID',
    siteName: config.brand.fullName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
