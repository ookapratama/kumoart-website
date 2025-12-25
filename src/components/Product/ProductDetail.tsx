import Image from 'next/image';
import { Product, formatPrice } from '@/lib/products';
import WhatsAppButton from '@/components/CTA/WhatsAppButton';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Product Image */}
        <div className="relative h-80 md:h-full min-h-[400px] bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.isFeatured && (
            <span className="absolute top-4 left-4 bg-rose-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
              ✨ Produk Favorit
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex-grow">
            {/* Category */}
            <span className="inline-block text-sm text-rose-600 font-medium uppercase tracking-wide mb-2">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900 mb-6">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none mb-6">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Handmade Badge */}
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
              <svg className="h-5 w-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Handmade with love</span>
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 10
                    ? 'bg-emerald-100 text-emerald-700'
                    : product.stock > 0
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {product.stock > 10
                  ? `✓ Ready Stock (${product.stock} pcs)`
                  : product.stock > 0
                  ? `⚡ Sisa ${product.stock} pcs`
                  : 'Sold Out'}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <WhatsAppButton
              productName={product.name}
              productPrice={formatPrice(product.price)}
              className="w-full"
            />
            <p className="text-center text-sm text-gray-500 mt-3">
              Klik tombol di atas untuk memesan via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
