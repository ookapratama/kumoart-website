import Image from 'next/image';
import { Product, formatPrice } from '@/lib/products';
import WhatsAppButton from '@/components/CTA/WhatsAppButton';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Product Image */}
        <div className="relative h-80 md:h-full min-h-[400px] bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.isFeatured && (
            <span className="absolute top-4 left-4 bg-amber-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              Produk Unggulan
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex-grow">
            {/* Category */}
            <span className="inline-block text-sm text-amber-600 font-medium uppercase tracking-wide mb-2">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold text-amber-600 mb-6">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none mb-6">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 10
                    ? 'bg-green-100 text-green-700'
                    : product.stock > 0
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {product.stock > 10
                  ? `Tersedia (${product.stock} unit)`
                  : product.stock > 0
                  ? `Stok Terbatas (${product.stock} unit)`
                  : 'Habis'}
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
