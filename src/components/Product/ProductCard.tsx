"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { useLanguage } from "@/lib/language";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/shared/whatsapp-icon";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();

  const whatsappUrl = generateWhatsAppLink({
    productName: product.name,
    price: formatPrice(product.price),
  });

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1">
      {/* Product Image Link */}
      <Link
        href={`/produk/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-gray-50"
      >
        <Image
          src={product.image_url ?? "/images/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_featured && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              ✨ {t("products.featured")}
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider animate-pulse shadow-lg">
              🔥 {t("products.limited_stock")}
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
            {t("cta.details")}
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-3 ${
              product.stock > 0
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-emerald-200"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            } font-bold rounded-xl transition-all text-sm`}
            onClick={(e) => product.stock === 0 && e.preventDefault()}
          >
            <WhatsAppIcon className="w-4 h-4" />
            {product.stock > 0 ? t("cta.whatsapp") : t("products.sold_out")}
          </a>
        </div>
      </div>
    </div>
  );
}
