'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product, formatPrice } from '@/lib/products';
import { useLanguage } from '@/lib/language';
import { generateWhatsAppLink } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  
  const whatsappUrl = generateWhatsAppLink({
    productName: product.name,
    price: formatPrice(product.price)
  });

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1"
    >
      {/* Product Image Link */}
      <Link href={`/produk/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              ✨ {t('products.featured')}
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider animate-pulse shadow-lg">
              🔥 {t('products.limited_stock')}
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/produk/${product.slug}`} className="block group/title">
          <span className="text-[10px] text-rose-500 font-black uppercase tracking-[0.2em] mb-1 block">
            {product.category}
          </span>
          <h3 className="text-gray-900 font-bold mb-2 line-clamp-2 group-hover/title:text-rose-600 transition-colors leading-tight min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-black text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>
        </Link>

        {/* Action Buttons - Optimized for Mobile */}
        <div className="mt-auto space-y-2">
          <Link
            href={`/produk/${product.slug}`}
            className="flex items-center justify-center w-full py-2.5 bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors text-sm"
          >
            {t('cta.details')}
          </Link>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-3 ${
              product.stock > 0 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-emerald-200' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } font-bold rounded-xl transition-all text-sm`}
            onClick={(e) => product.stock === 0 && e.preventDefault()}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {product.stock > 0 ? t('cta.whatsapp') : t('products.sold_out')}
          </a>
        </div>
      </div>
    </div>
  );
}
