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
  const { t, language } = useLanguage();

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
        {/* Page Header with H1 - Optimized for Conversion */}
        <header className="text-center mb-16">
          <span className="inline-block bg-rose-100 text-rose-600 font-black px-4 py-1.5 rounded-xl uppercase tracking-[0.2em] text-[10px] mb-4">
            {t('products.subtitle')}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">
            {t('products.title')}
          </h1>
          <p className="max-w-xl mx-auto text-gray-500 font-medium text-lg leading-relaxed">
            {t('products.description')}
          </p>
        </header>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <ProductSearch
            onSearch={handleSearch}
            placeholder={t('search.placeholder')}
          />
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400" role="status" aria-live="polite">
          <div>
            {searchQuery ? (
              <>
                {t('search.showing')} <span className="text-rose-600">{filteredProducts.length}</span> {t('search.products')} {t('search.for')} &quot;{searchQuery}&quot;
              </>
            ) : (
              <>{t('search.showing')} <span className="text-rose-600">{filteredProducts.length}</span> {t('search.products')}</>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <ProductList products={filteredProducts} />
        
        {/* SEO Content - Bottom */}
        <section className="mt-24 p-10 md:p-16 bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-50 rounded-br-full -z-0"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 border-l-8 border-rose-600 pl-6">
              {language === 'id' ? 'Kualitas Rajutan Kumoart' : 'Quality of Kumoart Crafts'}
            </h2>
            <div className="prose prose-rose prose-lg max-w-none text-gray-600 font-medium">
              {language === 'id' ? (
                <>
                  <p>
                    Semua produk di <strong>Kumoart</strong> dibuat secara handmade dengan 
                    perhatian penuh pada detail dan kualitas. Kami menyediakan berbagai 
                    macam kerajinan rajut termasuk:
                  </p>
                  <ul className="mt-6 grid md:grid-cols-2 gap-4 list-none pl-0">
                    {[
                      { icon: '👜', title: 'Tas Rajut Macrame', desc: 'Anyaman indah gaya Bohemian' },
                      { icon: '🧸', title: 'Boneka Amigurumi', desc: 'Boneka rajut aman untuk anak' },
                      { icon: '🧣', title: 'Aksesoris Rajut', desc: 'Syal, topi, dan gantungan kunci' },
                      { icon: '🏠', title: 'Home Decor', desc: 'Sarung bantal dan coaster set' }
                    ].map((item, id) => (
                      <li key={id} className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <strong className="block text-gray-900">{item.title}</strong>
                          <span className="text-sm text-gray-500">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 bg-rose-50 p-6 rounded-2xl border-2 border-dashed border-rose-200 text-rose-700 italic">
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
                  <ul className="mt-6 grid md:grid-cols-2 gap-4 list-none pl-0">
                    {[
                      { icon: '👜', title: 'Macrame Bags', desc: 'Beautiful Bohemian styles' },
                      { icon: '🧸', title: 'Amigurumi Dolls', desc: 'Safe for children' },
                      { icon: '🧣', title: 'Crochet Accessories', desc: 'Scarves, hats, and keychains' },
                      { icon: '🏠', title: 'Home Decor', desc: 'Pillowcases and coaster sets' }
                    ].map((item, id) => (
                      <li key={id} className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <strong className="block text-gray-900">{item.title}</strong>
                          <span className="text-sm text-gray-500">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 bg-rose-50 p-6 rounded-2xl border-2 border-dashed border-rose-200 text-rose-700 italic">
                    Interested in our products? Click on a product to see details and 
                    order directly via WhatsApp. We also accept <strong>custom orders</strong> with 
                    a choice of colors and sizes as you wish.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
