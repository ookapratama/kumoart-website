import Link from 'next/link';
import Image from 'next/image';
import { Product, formatPrice } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produk/${product.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Product Image */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.isFeatured && (
            <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Unggulan
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Stok Terbatas
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <span className="text-xs text-amber-600 font-medium uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-amber-600">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-400">
              Stok: {product.stock}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
