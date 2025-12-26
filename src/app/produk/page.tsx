'use client';

import { useState, useMemo, useCallback } from 'react';
import ProductSearch from '@/components/Product/ProductSearch';
import ProductList from '@/components/Product/ProductList';
import { getAllProducts, searchProducts, Product } from '@/lib/products';
import { useLanguage } from '@/lib/language';

export default function ProdukPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
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
        {/* Page Header with H1 */}
        <header className="text-center mb-12">
          <span className="text-rose-600 font-semibold uppercase tracking-wide text-sm">
            {t('products.subtitle')}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            {t('products.title')}
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            {t('products.description')}
          </p>
        </header>

        {/* Search */}
        <ProductSearch
          onSearch={handleSearch}
          placeholder={t('search.placeholder')}
        />

        {/* Results Info */}
        <div className="mb-6 text-sm text-gray-500" role="status" aria-live="polite">
          {searchQuery ? (
            <>
              {t('search.showing')} {filteredProducts.length} {t('search.products')} {t('search.for')} &quot;{searchQuery}&quot;
            </>
          ) : (
            <>{t('search.showing')} {filteredProducts.length} {t('search.products')}</>
          )}
        </div>

        {/* Product Grid */}
        <ProductList products={filteredProducts} />
        
        {/* SEO Content - Bottom */}
        <section className="mt-16 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('footer.description')}
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600">
            {t('language') === 'id' ? (
              <>
                <p>
                  Semua produk di <strong>Kumoart</strong> dibuat secara handmade dengan 
                  perhatian penuh pada detail dan kualitas. Kami menyediakan berbagai 
                  macam kerajinan rajut termasuk:
                </p>
                <ul className="mt-4 space-y-2">
                  <li><strong>Tas Rajut Macrame</strong> - Tas tangan dengan anyaman indah, cocok untuk gaya bohemian</li>
                  <li><strong>Boneka Amigurumi</strong> - Boneka rajut menggemaskan, aman untuk anak-anak</li>
                  <li><strong>Aksesoris Rajut</strong> - Syal, topi, headband, dan gantungan kunci</li>
                  <li><strong>Home Decor</strong> - Sarung bantal, tempat tissue, dan coaster set</li>
                </ul>
                <p className="mt-4">
                  Tertarik dengan produk kami? Klik produk untuk melihat detail dan 
                  langsung pesan via WhatsApp. Kami juga menerima <strong>custom order</strong> dengan 
                  pilihan warna dan ukuran sesuai keinginan Anda.
                </p>
              </>
            ) : (
              <>
                <p>
                  All products at <strong>Kumoart</strong> are handmade with 
                  full attention to detail and quality. We provide various 
                  kinds of crochet crafts including:
                </p>
                <ul className="mt-4 space-y-2">
                  <li><strong>Macrame Crochet Bags</strong> - Beautifully woven handbags, perfect for bohemian style</li>
                  <li><strong>Amigurumi Dolls</strong> - Adorable crochet dolls, safe for children</li>
                  <li><strong>Crochet Accessories</strong> - Scarves, hats, headbands, and keychains</li>
                  <li><strong>Home Decor</strong> - Pillowcases, tissue boxes, and coaster sets</li>
                </ul>
                <p className="mt-4">
                  Interested in our products? Click on a product to see details and 
                  order directly via WhatsApp. We also accept <strong>custom orders</strong> with 
                  a choice of colors and sizes as you wish.
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
