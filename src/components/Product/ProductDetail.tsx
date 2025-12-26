'use client';

import Image from 'next/image';
import { Product, formatPrice } from '@/lib/products';
import WhatsAppButton from '@/components/CTA/WhatsAppButton';
import { useLanguage } from '@/lib/language';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { t } = useLanguage();
  
  const benefits = [
    t('features.handmade.title'),
    t('features.premium.title'),
    t('features.custom.title'),
    t('misc.handmade_with_love')
  ];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 mb-12">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Product Image Section */}
        <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-6 md:p-10">
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-12 left-12">
              <span className="bg-rose-600 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl transform -rotate-3">
                ✨ {t('products.featured')}
              </span>
            </div>
          )}
        </div>

        {/* Product Content Section - Optimized for Conversion */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <span className="text-xs text-rose-500 font-black uppercase tracking-[0.3em] mb-4 block">
              {product.category}
            </span>
            
            {/* 1. Nama produk (H1) */}
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            
            {/* 2. Harga (jelas & besar) */}
            <div className="text-3xl md:text-5xl font-black text-rose-600 mb-8 flex items-baseline gap-2">
              {formatPrice(product.price)}
              <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Harga Terbaik</span>
            </div>
            
            {/* 3. Deskripsi singkat */}
            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium border-l-4 border-rose-100 pl-6">
              {product.description}
            </p>

            {/* 4. Keunggulan produk (bullet list) */}
            <div className="mb-10">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">
                {t('misc.benefits')}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 font-bold">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 5. Tombol "Pesan via WhatsApp" */}
            <div className="space-y-4">
              <WhatsAppButton
                productName={product.name}
                productPrice={formatPrice(product.price)}
                fullWidth
                size="lg"
                className="!py-5 !text-xl font-black shadow-2xl shadow-emerald-200/50 hover:scale-[1.02] transition-transform"
              />
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t('cta.whatsapp_note')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA (If price/name scrolled past) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-40 md:hidden flex items-center justify-between gap-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Harga</span>
          <span className="text-xl font-black text-gray-900">{formatPrice(product.price)}</span>
        </div>
        <WhatsAppButton
          productName={product.name}
          productPrice={formatPrice(product.price)}
          className="!px-6 !py-3 !text-sm font-black whitespace-nowrap"
        />
      </div>
    </div>
  );
}
