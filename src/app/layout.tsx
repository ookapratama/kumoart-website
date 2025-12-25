import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Kumoart - Kerajinan Rajut Handmade',
    template: '%s | Kumoart Handmade',
  },
  description:
    'Kumoart menyediakan kerajinan rajut handmade berkualitas tinggi. Tas, boneka amigurumi, aksesoris, dan home decor dibuat dengan cinta.',
  keywords: ['rajut', 'crochet', 'handmade', 'amigurumi', 'tas rajut', 'kerajinan tangan', 'umkm'],
  authors: [{ name: 'Kumoart Handmade' }],
  openGraph: {
    title: 'Kumoart - Kerajinan Rajut Handmade',
    description:
      'Kerajinan rajut handmade berkualitas tinggi. Setiap jahitan adalah cerita, setiap produk adalah karya seni.',
    type: 'website',
    locale: 'id_ID',
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
