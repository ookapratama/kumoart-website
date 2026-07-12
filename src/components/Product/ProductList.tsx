import Link from "next/link";
import ProductCard from "./ProductCard";
import EmptyState from "@/components/shared/empty-state";

import type { Product } from "@/lib/products";

const EMPTY_ICON =
  "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4";

interface ProductListProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

export default function ProductList({
  products,
  title,
  showViewAll = false,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        iconPath={EMPTY_ICON}
        titleKey="empty.no_products"
        subtitleKey="empty.products_hint"
      />
    );
  }

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {showViewAll && (
            <Link
              href="/produk"
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 transition-colors"
            >
              Lihat Semua
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
