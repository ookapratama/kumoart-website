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
  
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Product Image Section */}
        <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
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
            <div className="absolute top-8 left-8">
              <span className="bg-rose-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg transform -rotate-2">
                ✨ {t('products.featured')}
              </span>
            </div>
          )}
        </div>

        {/* Product Content Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <span className="text-sm text-rose-500 font-bold uppercase tracking-[0.2em] mb-3 block">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="text-2xl md:text-4xl font-black text-gray-900 mb-6">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="prose prose-gray mb-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            {/* Status & Info */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-100">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {t('misc.handmade_with_love')}
              </div>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
                product.stock > 0 
                  ? 'bg-rose-50 text-rose-700 border-rose-100' 
                  : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}>
                {product.stock > 0 ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {t('products.ready_stock')} ({product.stock} {t('products.pcs')})
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t('products.sold_out')}
                  </>
                )}
              </div>
            </div>

            {/* CTA Section */}
            <div className="pt-6 border-t border-gray-100">
              <WhatsAppButton
                productName={product.name}
                productPrice={formatPrice(product.price)}
                fullWidth
                size="lg"
                className="shadow-xl shadow-emerald-200/50"
              />
              <p className="text-center text-gray-400 text-sm mt-4">
                {t('cta.whatsapp_note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
