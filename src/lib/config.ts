/**
 * Konfigurasi aplikasi yang mengambil nilai dari environment variables
 * Gunakan file ini untuk mengakses env vars secara type-safe
 */

export const config = {
  // Kontak & WhatsApp
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890',
  },

  // Informasi Bisnis
  brand: {
    name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Kumoart',
    tagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE || 'Handmade',
    fullName: `${process.env.NEXT_PUBLIC_BRAND_NAME || 'Kumoart'} ${process.env.NEXT_PUBLIC_BRAND_TAGLINE || 'Handmade'}`,
  },

  contact: {
    address: process.env.NEXT_PUBLIC_ADDRESS || '',
    email: process.env.NEXT_PUBLIC_EMAIL || '',
  },

  // Social Media
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  },

  // Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  },

  // Site Settings
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kumoart.id',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
} as const;

// Type untuk config
export type Config = typeof config;
