import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import FloatingWhatsApp from '@/components/CTA/FloatingWhatsApp';
import { config } from '@/lib/config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#e11d48', // rose-600
};

// Global metadata dengan template
export const metadata: Metadata = {
  // Title template - akan digunakan oleh semua halaman
  title: {
    default: `${config.brand.name} - Kerajinan Rajut Handmade Berkualitas`,
    template: `%s | ${config.brand.fullName}`,
  },
  
  // Description untuk homepage
  description: `${config.brand.name} adalah UMKM kerajinan rajut handmade berkualitas tinggi. Menyediakan tas rajut, boneka amigurumi, aksesoris, dan home decor. Pesan langsung via WhatsApp!`,
  
  // Keywords untuk SEO
  keywords: [
    'rajut',
    'crochet', 
    'handmade',
    'amigurumi',
    'tas rajut',
    'tas macrame',
    'boneka rajut',
    'kerajinan tangan',
    'umkm',
    'handcraft',
    config.brand.name.toLowerCase(),
  ],
  
  // Author
  authors: [{ name: config.brand.fullName, url: config.site.url }],
  creator: config.brand.fullName,
  publisher: config.brand.fullName,
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Base URL untuk resolving relative URLs
  metadataBase: new URL(config.site.url),
  
  // Canonical URL
  alternates: {
    canonical: '/',
  },
  
  // Open Graph - untuk social sharing (Facebook, LinkedIn, dll)
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: config.site.url,
    siteName: config.brand.fullName,
    title: `${config.brand.name} - Kerajinan Rajut Handmade Berkualitas`,
    description: `Kerajinan rajut handmade berkualitas tinggi. Tas, boneka amigurumi, aksesoris & home decor. Dibuat dengan cinta, dikirim ke seluruh Indonesia.`,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${config.brand.name} - Kerajinan Rajut Handmade`,
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: `${config.brand.name} - Kerajinan Rajut Handmade`,
    description: 'Kerajinan rajut handmade berkualitas. Tas, boneka amigurumi, aksesoris & home decor.',
    images: ['/images/og-image.jpg'],
    creator: '@kumoart',
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  
  // Manifest untuk PWA
  manifest: '/manifest.json',
  
  // Verification untuk webmaster tools (opsional)
  // verification: {
  //   google: 'google-site-verification-code',
  // },
  
  // Category
  category: 'shopping',
};

import { LanguageProvider } from '@/lib/language';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* JSON-LD Schema untuk Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: config.brand.fullName,
              description: 'Kerajinan rajut handmade berkualitas tinggi',
              url: config.site.url,
              telephone: `+${config.whatsapp.number}`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Indonesia',
              },
              priceRange: 'Rp 25.000 - Rp 500.000',
              image: `${config.site.url}/images/og-image.jpg`,
              sameAs: [
                config.social.instagram,
                config.social.tiktok,
              ].filter(Boolean),
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
