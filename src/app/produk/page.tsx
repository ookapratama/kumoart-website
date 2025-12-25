'use client';

import { useState, useMemo, useCallback } from 'react';
import ProductSearch from '@/components/Product/ProductSearch';
import ProductList from '@/components/Product/ProductList';
import { getAllProducts, searchProducts, Product } from '@/lib/products';

export default function ProdukPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setFilteredProducts(allProducts);
      } else {
        const results = searchProducts(query);
        setFilteredProducts(results);
      }
    },
    [allProducts]
  );

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-rose-600 font-semibold uppercase tracking-wide text-sm">
            Koleksi Kami
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Produk Rajut Handmade
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Temukan berbagai kerajinan rajut berkualitas tinggi, dari tas hingga boneka amigurumi
          </p>
        </div>

        {/* Search */}
        <ProductSearch
          onSearch={handleSearch}
          placeholder="Cari tas, boneka, aksesoris..."
        />

        {/* Results Info */}
        <div className="mb-6 text-sm text-gray-500">
          Menampilkan {filteredProducts.length} produk
        </div>

        {/* Product Grid */}
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
