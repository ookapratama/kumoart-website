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
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Katalog Produk
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Jelajahi berbagai pilihan kue dan roti berkualitas tinggi dari Kumoart
          </p>
        </div>

        {/* Search */}
        <ProductSearch
          onSearch={handleSearch}
          placeholder="Cari produk berdasarkan nama, deskripsi, atau kategori..."
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
