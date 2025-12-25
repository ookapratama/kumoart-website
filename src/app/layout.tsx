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
    default: 'Kumoart - Kue & Roti Berkualitas',
    template: '%s | Kumoart',
  },
  description:
    'Kumoart menyediakan berbagai kue dan roti berkualitas dengan cita rasa terbaik. Dibuat dengan bahan pilihan dan penuh cinta.',
  keywords: ['kue', 'roti', 'bakery', 'umkm', 'jajanan', 'kumoart'],
  authors: [{ name: 'Kumoart' }],
  openGraph: {
    title: 'Kumoart - Kue & Roti Berkualitas',
    description:
      'Kumoart menyediakan berbagai kue dan roti berkualitas dengan cita rasa terbaik.',
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
