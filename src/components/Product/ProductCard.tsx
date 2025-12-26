'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product, formatPrice } from '@/lib/products';
import { useLanguage } from '@/lib/language';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  
  return (
    <Link 
      href={`/produk/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider transform -rotate-2">
              ✨ {t('products.featured')}
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
              🔥 {t('products.limited_stock')}
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              🚫 {t('products.sold_out')}
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-rose-500 font-semibold uppercase tracking-wider mb-1">
          {product.category}
        </span>
        <h3 className="text-gray-900 font-bold mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-lg font-black text-gray-900">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
            <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
            {product.stock > 0 ? `${t('products.stock')}: ${product.stock}` : t('products.sold_out')}
          </div>
        </div>
      </div>
    </Link>
  );
}
