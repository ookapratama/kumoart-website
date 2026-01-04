"use client";

import { useState, useMemo, useCallback } from "react";
import ProductSearch from "@/components/Product/ProductSearch";
import ProductList from "@/components/Product/ProductList";
import { Product, formatPrice } from "@/lib/products";
import { useLanguage } from "@/lib/language";

interface ProductPageContentProps {
  initialProducts: Product[];
}

export default function ProductPageContent({
  initialProducts,
}: ProductPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { t, language } = useLanguage();

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return initialProducts;

    return initialProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [searchQuery, initialProducts]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="inline-block bg-rose-100 text-rose-600 font-black px-4 py-1.5 rounded-xl uppercase tracking-[0.2em] text-[10px] mb-4">
            {t("products.subtitle")}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">
            {t("products.title")}
          </h1>
          <p className="max-w-xl mx-auto text-gray-500 font-medium text-lg leading-relaxed">
            {t("products.description")}
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-12">
          <ProductSearch
            onSearch={handleSearch}
            placeholder={t("search.placeholder")}
          />
        </div>

        <div
          className="mb-8 flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400"
          role="status"
          aria-live="polite"
        >
          <div>
            {searchQuery ? (
              <>
                {t("search.showing")}{" "}
                <span className="text-rose-600">{filteredProducts.length}</span>{" "}
                {t("search.products")} {t("search.for")} &quot;{searchQuery}
                &quot;
              </>
            ) : (
              <>
                {t("search.showing")}{" "}
                <span className="text-rose-600">{filteredProducts.length}</span>{" "}
                {t("search.products")}
              </>
            )}
          </div>
        </div>

        <ProductList products={filteredProducts} />

        {/* SEO Content */}
        <section className="mt-24 p-10 md:p-16 bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-50 rounded-br-full -z-0"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 border-l-8 border-rose-600 pl-6">
              {language === "id"
                ? "Kualitas Rajutan Kumoart"
                : "Quality of Kumoart Crafts"}
            </h2>
            <div className="prose prose-rose prose-lg max-w-none text-gray-600 font-medium">
              {language === "id" ? (
                <>
                  <p>
                    Semua produk di <strong>Kumoart</strong> dibuat secara
                    handmade...
                  </p>
                  <ul className="mt-8 grid md:grid-cols-2 gap-6 list-none pl-0">
                    {[
                      {
                        icon: "👜",
                        title: "Tas Rajut Macrame",
                        desc: "Anyaman indah gaya Bohemian",
                      },
                      {
                        icon: "🧸",
                        title: "Boneka Amigurumi",
                        desc: "Boneka rajut aman untuk anak",
                      },
                      {
                        icon: "🧣",
                        title: "Aksesoris Rajut",
                        desc: "Syal, topi, dan gantungan kunci",
                      },
                      {
                        icon: "🏠",
                        title: "Home Decor",
                        desc: "Sarung bantal dan coaster set",
                      },
                    ].map((item, id) => (
                      <li
                        key={item.title}
                        className="bg-gray-50 p-6 rounded-2xl flex items-center gap-5 group hover:bg-rose-50 transition-colors"
                      >
                        <span className="text-4xl group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <div>
                          <strong className="block text-gray-900 text-lg">
                            {item.title}
                          </strong>
                          <span className="text-sm text-gray-500 font-medium">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <p>
                    All products at <strong>Kumoart</strong> are handmade...
                  </p>
                  <ul className="mt-8 grid md:grid-cols-2 gap-6 list-none pl-0">
                    {[
                      {
                        icon: "👜",
                        title: "Macrame Bags",
                        desc: "Beautiful Bohemian styles",
                      },
                      {
                        icon: "🧸",
                        title: "Amigurumi Dolls",
                        desc: "Safe for children",
                      },
                      {
                        icon: "🧣",
                        title: "Crochet Accessories",
                        desc: "Scarves, hats, and keychains",
                      },
                      {
                        icon: "🏠",
                        title: "Home Decor",
                        desc: "Pillowcases and coaster sets",
                      },
                    ].map((item, id) => (
                      <li
                        key={item.title}
                        className="bg-gray-50 p-6 rounded-2xl flex items-center gap-5 group hover:bg-rose-50 transition-colors"
                      >
                        <span className="text-4xl group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <div>
                          <strong className="block text-gray-900 text-lg">
                            {item.title}
                          </strong>
                          <span className="text-sm text-gray-500 font-medium">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
