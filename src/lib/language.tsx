'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Supported languages
export type Language = 'id' | 'en';

// Context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navbar
    'nav.home': 'Beranda',
    'nav.products': 'Produk',
    'nav.events': 'Event',
    'nav.active_events': 'event aktif',
    
    // Hero
    'hero.subtitle': 'Kerajinan Tangan Berkualitas',
    'hero.title1': 'Handmade dengan',
    'hero.title2': 'Cinta & Kreativitas',
    'hero.description': 'Setiap jahitan adalah cerita, setiap produk adalah karya seni. Temukan keindahan kerajinan rajut handmade yang dibuat khusus untuk Anda.',
    'hero.cta': 'Lihat Koleksi',
    
    // Features
    'features.handmade.title': '100% Handmade',
    'features.handmade.desc': 'Setiap produk rajut dibuat tangan dengan penuh cinta dan perhatian pada detail',
    'features.premium.title': 'Material Premium',
    'features.premium.desc': 'Menggunakan benang dan bahan berkualitas tinggi yang aman dan tahan lama',
    'features.custom.title': 'Custom Order',
    'features.custom.desc': 'Bisa request warna dan desain sesuai keinginan Anda via WhatsApp',
    
    // Products
    'products.subtitle': 'Pilihan Terbaik',
    'products.title': 'Produk Rajut Favorit',
    'products.description': 'Koleksi produk rajut handmade terlaris yang disukai pelanggan kami',
    'products.view_all': 'Lihat Semua Produk',
    'products.featured': 'Favorit',
    'products.limited_stock': 'Stok Terbatas',
    'products.stock': 'Stok',
    'products.ready_stock': 'Ready Stock',
    'products.remaining': 'Sisa',
    'products.pcs': 'pcs',
    'products.sold_out': 'Habis',
    'products.related': 'Produk Serupa',
    'products.back_catalog': 'Kembali ke Katalog',
    
    // Events
    'events.subtitle': 'Jangan Lewatkan',
    'events.title': 'Event & Promo',
    'events.description': 'Workshop rajut, bazaar kerajinan, dan promo spesial untuk penggemar handmade',
    'events.view_all': 'Lihat Semua Event',
    'events.active': 'Event Aktif',
    'events.finished': 'Event Selesai',
    'events.ongoing': 'Sedang Berlangsung',
    'events.ended': 'Selesai',
    'events.discount': 'Diskon',
    'events.location': 'Lokasi',
    'events.price': 'Harga',
    'events.quota': 'Kuota',
    'events.participants': 'Peserta',
    'events.terms': 'Syarat & Ketentuan',
    'events.back_list': 'Kembali ke Daftar Event',
    'events.interested': 'Tertarik dengan event ini? Hubungi kami untuk informasi lebih lanjut',
    
    // CTA
    'cta.title': 'Ingin Custom Order Produk Rajut?',
    'cta.description': 'Kami menerima pesanan custom dengan pilihan warna dan ukuran sesuai keinginan. Chat kami sekarang!',
    'cta.whatsapp': 'Pesan via WhatsApp',
    'cta.whatsapp_note': 'Klik tombol di atas untuk memesan via WhatsApp',
    
    // Promo Banner
    'promo.special': 'Promo Spesial!',
    'promo.discount_up_to': 'Diskon hingga',
    'promo.view': 'Lihat Promo',
    
    // Footer
    'footer.description': 'Kerajinan rajut handmade berkualitas tinggi. Setiap produk dibuat dengan penuh cinta dan perhatian pada detail.',
    'footer.menu': 'Menu',
    'footer.categories': 'Kategori',
    'footer.copyright': 'Dibuat dengan 🧶 dan ❤️',
    
    // Search
    'search.placeholder': 'Cari produk rajut...',
    'search.showing': 'Menampilkan',
    'search.products': 'produk',
    'search.for': 'untuk',
    
    // Breadcrumb
    'breadcrumb.home': 'Beranda',
    'breadcrumb.products': 'Produk',
    'breadcrumb.events': 'Event',
    
    // Empty states
    'empty.no_events': 'Belum ada event aktif saat ini. Pantau terus untuk event dan promo menarik!',
    'empty.no_products': 'Tidak ada produk yang ditemukan.',
    
    // Misc
    'misc.handmade_with_love': 'Handmade with love',
  },
  
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.events': 'Events',
    'nav.active_events': 'active events',
    
    // Hero
    'hero.subtitle': 'Quality Handcraft',
    'hero.title1': 'Handmade with',
    'hero.title2': 'Love & Creativity',
    'hero.description': 'Every stitch tells a story, every product is a work of art. Discover the beauty of handmade crochet crafted especially for you.',
    'hero.cta': 'View Collection',
    
    // Features
    'features.handmade.title': '100% Handmade',
    'features.handmade.desc': 'Each crochet product is handcrafted with love and attention to detail',
    'features.premium.title': 'Premium Materials',
    'features.premium.desc': 'Using high-quality yarn and materials that are safe and durable',
    'features.custom.title': 'Custom Order',
    'features.custom.desc': 'Request colors and designs according to your preferences via WhatsApp',
    
    // Products
    'products.subtitle': 'Best Picks',
    'products.title': 'Favorite Crochet Products',
    'products.description': 'Best-selling handmade crochet collection loved by our customers',
    'products.view_all': 'View All Products',
    'products.featured': 'Featured',
    'products.limited_stock': 'Limited Stock',
    'products.stock': 'Stock',
    'products.ready_stock': 'Ready Stock',
    'products.remaining': 'Only',
    'products.pcs': 'left',
    'products.sold_out': 'Sold Out',
    'products.related': 'Related Products',
    'products.back_catalog': 'Back to Catalog',
    
    // Events
    'events.subtitle': "Don't Miss Out",
    'events.title': 'Events & Promos',
    'events.description': 'Crochet workshops, craft bazaars, and special promos for handmade lovers',
    'events.view_all': 'View All Events',
    'events.active': 'Active Events',
    'events.finished': 'Past Events',
    'events.ongoing': 'Ongoing',
    'events.ended': 'Ended',
    'events.discount': 'Discount',
    'events.location': 'Location',
    'events.price': 'Price',
    'events.quota': 'Quota',
    'events.participants': 'Participants',
    'events.terms': 'Terms & Conditions',
    'events.back_list': 'Back to Event List',
    'events.interested': 'Interested in this event? Contact us for more information',
    
    // CTA
    'cta.title': 'Want Custom Crochet Products?',
    'cta.description': 'We accept custom orders with your preferred colors and sizes. Chat us now!',
    'cta.whatsapp': 'Order via WhatsApp',
    'cta.whatsapp_note': 'Click the button above to order via WhatsApp',
    
    // Promo Banner
    'promo.special': 'Special Promo!',
    'promo.discount_up_to': 'Discount up to',
    'promo.view': 'View Promo',
    
    // Footer
    'footer.description': 'High-quality handmade crochet crafts. Every product is made with love and attention to detail.',
    'footer.menu': 'Menu',
    'footer.categories': 'Categories',
    'footer.copyright': 'Made with 🧶 and ❤️',
    
    // Search
    'search.placeholder': 'Search crochet products...',
    'search.showing': 'Showing',
    'search.products': 'products',
    'search.for': 'for',
    
    // Breadcrumb
    'breadcrumb.home': 'Home',
    'breadcrumb.products': 'Products',
    'breadcrumb.events': 'Events',
    
    // Empty states
    'empty.no_events': 'No active events at the moment. Stay tuned for exciting events and promos!',
    'empty.no_products': 'No products found.',
    
    // Misc
    'misc.handmade_with_love': 'Handmade with love',
  },
};

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [mounted, setMounted] = useState(false);

  // Load saved language from localStorage safely
  useEffect(() => {
    setMounted(true);
    try {
      const savedLang = localStorage.getItem('kumoart-language') as Language;
      if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
        setLanguageState(savedLang);
      }
    } catch (e) {
      console.error('Failed to load language from localStorage', e);
    }
  }, []);

  // Save language to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kumoart-language', lang);
    } catch (e) {
      console.error('Failed to save language to localStorage', e);
    }
  };

  // Translation function
  const t = (key: string): string => {
    // Falls back to key if translation not found
    return translations[language][key] || key;
  };

  // Provide context even during SSR/Hydration to avoid "outside provider" error
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={mounted ? '' : 'invisible'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

// Custom hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Export translations for static pages
export { translations };
