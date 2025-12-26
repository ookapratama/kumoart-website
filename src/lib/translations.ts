// Supported languages
export type Language = 'id' | 'en';

// Translations
export const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navbar
    'nav.home': 'Beranda',
    'nav.products': 'Produk',
    'nav.events': 'Event',
    'nav.active_events': 'event aktif',
    
    // Hero (Optimized for Conversion)
    'hero.subtitle': 'Koleksi Rajut Handmade Premium',
    'hero.title': 'Kado Unik & Berkualitas untuk Orang Tersayang',
    'hero.description': 'Dibuat dengan tangan dengan detail sempurna. Pesan sekarang atau request custom desain sesuai keinginan Anda via WhatsApp.',
    'hero.cta_primary': 'Pesan via WhatsApp',
    'hero.cta_secondary': 'Lihat Produk',
    
    // Features
    'features.handmade.title': '100% Buatan Tangan',
    'features.handmade.desc': 'Setiap produk dibuat dengan teliti untuk kualitas terbaik',
    'features.premium.title': 'Bahan Premium',
    'features.premium.desc': 'Benang pilihan yang lembut, kuat, dan tahan lama',
    'features.custom.title': 'Bisa Custom',
    'features.custom.desc': 'Bebas pilih warna dan model lewat chat WhatsApp',
    
    // Products
    'products.subtitle': 'Katalog Koleksi',
    'products.title': 'Produk Terlaris',
    'products.description': 'Pilih produk rajut favorit Anda dan pesan langsung sekarang juga',
    'products.view_all': 'Lihat Semua Produk',
    'products.featured': 'Unggulan',
    'products.limited_stock': 'Stok Terbatas',
    'products.stock': 'Stok',
    'products.ready_stock': 'Ready Stock',
    'products.remaining': 'Sisa',
    'products.pcs': 'pcs',
    'products.sold_out': 'Habis',
    'products.related': 'Produk Serupa',
    'products.back_catalog': 'Kembali ke Katalog',
    
    // Events (Trust Signals)
    'events.subtitle': 'Brand Terpercaya',
    'events.title': 'Event & Aktivitas Kami',
    'events.description': 'Kumoart aktif mengikuti berbagai bazaar dan workshop kerajinan tangan',
    'events.view_all': 'Lihat Semua Event',
    'events.active': 'Event Sedang Berlangsung',
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
    'events.interested': 'Tertarik bergabung? Hubungi kami sekarang!',
    
    // CTA
    'cta.title': 'Punya Ide Desain Sendiri?',
    'cta.description': 'Kami melayani Pesanan Custom! Beritahu kami warna dan model yang Anda inginkan.',
    'cta.whatsapp': 'Pesan via WhatsApp',
    'cta.details': 'Lihat Detail',
    'cta.whatsapp_note': 'Konsultasi gratis via WhatsApp',
    'cta.floating_msg': 'Halo, saya ingin bertanya tentang produk Kumoart',
    
    // Promo Banner
    'promo.special': 'Promo Spesial!',
    'promo.discount_up_to': 'Diskon hingga',
    'promo.view': 'Lihat Promo',
    
    // Footer
    'footer.description': 'UMKM Kerajinan Rajut Handmade. Menghadirkan karya seni dalam setiap jahitan sejak tahun 2023.',
    'footer.menu': 'Navigasi',
    'footer.categories': 'Kategori',
    'footer.copyright': 'Handmade with love',
    
    // Search
    'search.placeholder': 'Cari produk favorit Anda...',
    'search.showing': 'Menampilkan',
    'search.products': 'produk',
    'search.for': 'untuk',
    
    // Breadcrumb
    'breadcrumb.home': 'Beranda',
    'breadcrumb.products': 'Produk',
    'breadcrumb.events': 'Event',
    
    // Empty states
    'empty.no_events': 'Belum ada event aktif. Ikuti terus untuk update terbaru!',
    'empty.no_products': 'Produk tidak ditemukan.',
    
    // Misc
    'misc.handmade_with_love': 'Handmade with love',
    'misc.benefits': 'Keunggulan Produk',
  },
  
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.events': 'Events',
    'nav.active_events': 'active events',
    
    // Hero
    'hero.subtitle': 'Premium Handmade Collection',
    'hero.title': 'Unique & Quality Gifts for Your Loved Ones',
    'hero.description': 'Handcrafted with perfect detail. Order now or request custom designs as you wish via WhatsApp.',
    'hero.cta_primary': 'Order via WhatsApp',
    'hero.cta_secondary': 'View Products',
    
    // Features
    'features.handmade.title': '100% Handmade',
    'features.handmade.desc': 'Every product is carefully crafted for the best quality',
    'features.premium.title': 'Premium Materials',
    'features.premium.desc': 'Selected yarns that are soft, strong, and durable',
    'features.custom.title': 'Custom Order',
    'features.custom.desc': 'Choose your own color and design via WhatsApp chat',
    
    // Products
    'products.subtitle': 'Collection Catalog',
    'products.title': 'Bestsellers',
    'products.description': 'Pick your favorite crochet product and order directly now',
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
    'events.subtitle': 'Trusted Brand',
    'events.title': 'Our Events & Activities',
    'events.description': 'Kumoart actively participates in various craft bazaars and workshops',
    'events.view_all': 'View All Events',
    'events.active': 'Ongoing Events',
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
    'events.interested': 'Interested in joining? Contact us now!',
    
    // CTA
    'cta.title': 'Have Your Own Design?',
    'cta.description': "We accept Custom Orders! Tell us the colors and models you want.",
    'cta.whatsapp': 'Order via WhatsApp',
    'cta.details': 'View Details',
    'cta.whatsapp_note': 'Free consultation via WhatsApp',
    'cta.floating_msg': 'Hi, I would like to ask about Kumoart products',
    
    // Promo Banner
    'promo.special': 'Special Promo!',
    'promo.discount_up_to': 'Discount up to',
    'promo.view': 'View Promo',
    
    // Footer
    'footer.description': 'Handmade Crochet Craft. Bringing art to every stitch since 2023.',
    'footer.menu': 'Navigation',
    'footer.categories': 'Categories',
    'footer.copyright': 'Handmade with love',
    
    // Search
    'search.placeholder': 'Search for your favorite products...',
    'search.showing': 'Showing',
    'search.products': 'products',
    'search.for': 'for',
    
    // Breadcrumb
    'breadcrumb.home': 'Home',
    'breadcrumb.products': 'Products',
    'breadcrumb.events': 'Events',
    
    // Empty states
    'empty.no_events': 'No active events at the moment. Stay tuned for updates!',
    'empty.no_products': 'No products found.',
    
    // Misc
    'misc.handmade_with_love': 'Handmade with love',
    'misc.benefits': 'Product Benefits',
  },
};
