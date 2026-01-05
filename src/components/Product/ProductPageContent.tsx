"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import ProductSearch from "@/components/Product/ProductSearch";
import ProductList from "@/components/Product/ProductList";
import Pagination from "@/components/Common/Pagination";
import { Product, formatPrice } from "@/lib/products";
import { useLanguage } from "@/lib/language";

interface ProductPageContentProps {
  initialProducts: Product[];
}

const ITEMS_PER_PAGE = 12;

export default function ProductPageContent({
  initialProducts,
}: ProductPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const { t, language } = useLanguage();

  // Get unique categories from all products
  const categories = useMemo(() => {
    const cats = initialProducts.map((p) => p.category);
    return ["all", ...Array.from(new Set(cats))];
  }, [initialProducts]);

  // Combined Filter Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Search Query Filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      // 2. Category Filter
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      // 3. Price Filter
      const price = product.price;
      const minP = minPrice === "" ? 0 : parseInt(minPrice);
      const maxP = maxPrice === "" ? Infinity : parseInt(maxPrice);
      const matchesPrice = price >= minP && price <= maxP;

      // 4. Stock Filter (assuming stock field exists)
      const matchesStock = !onlyInStock || (product.stock && product.stock > 0);

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
  }, [
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    onlyInStock,
    initialProducts,
  ]);

  // Reset to first page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, onlyInStock]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll with offset for filters
    const listElement = document.getElementById("product-list-start");
    if (listElement) {
      const offset = 100;
      const elementPosition = listElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

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

        <div className="max-w-2xl mx-auto mb-8">
          <ProductSearch
            onSearch={handleSearch}
            placeholder={t("search.placeholder")}
          />
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                {language === "id" ? "Kategori" : "Category"}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none ring-2 ring-transparent focus:ring-rose-500/20 transition-all cursor-pointer"
              >
                <option value="all">
                  {language === "id" ? "Semua Kategori" : "All Categories"}
                </option>
                {categories
                  .filter((c) => c !== "all")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex-[2] flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                  {language === "id" ? "Harga Min (Rp)" : "Min Price (Rp)"}
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none ring-2 ring-transparent focus:ring-rose-500/20 transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                  {language === "id" ? "Harga Max (Rp)" : "Max Price (Rp)"}
                </label>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none ring-2 ring-transparent focus:ring-rose-500/20 transition-all"
                />
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="flex-none pb-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition-colors ${
                      onlyInStock ? "bg-rose-600" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      onlyInStock ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-600 group-hover:text-rose-600 transition-colors">
                  {language === "id" ? "Tersedia Saja" : "In Stock Only"}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div
          id="product-list-start"
          className="mb-8 flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400"
          role="status"
          aria-live="polite"
        >
          <div>
            {searchQuery ||
            selectedCategory !== "all" ||
            minPrice ||
            maxPrice ||
            onlyInStock ? (
              <>
                {t("search.showing")}{" "}
                <span className="text-rose-600">{filteredProducts.length}</span>{" "}
                {t("search.products")}
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

        <ProductList products={paginatedProducts} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

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
