"use client";

import { useState, useMemo, useCallback } from "react";
import ProductSearch from "@/components/Product/ProductSearch";
import ProductList from "@/components/Product/ProductList";
import ProductFilterBar from "@/components/Product/product-filter-bar";
import ProductCatalogSeo from "@/components/Product/product-catalog-seo";
import Pagination from "@/components/Common/Pagination";
import { useProductFilters } from "@/components/Product/use-product-filters";
import { useLanguage } from "@/lib/language";

import type { Product } from "@/lib/products";

interface ProductPageContentProps {
  initialProducts: Product[];
}

const ITEMS_PER_PAGE = 12;

export default function ProductPageContent({
  initialProducts,
}: ProductPageContentProps) {
  const { t } = useLanguage();

  const filters = useProductFilters(initialProducts);
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    onlyInStock,
    filteredProducts,
  } = filters;

  // Halaman di-derive dari kombinasi filter: filter berubah → otomatis
  // kembali ke halaman 1 (tanpa setState di effect).
  const filterKey = [
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    onlyInStock,
  ].join("|");
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 });
  const currentPage = pageState.key === filterKey ? pageState.page : 1;

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSearch = useCallback(
    (query: string) => setSearchQuery(query),
    [setSearchQuery],
  );

  const handlePageChange = (page: number) => {
    setPageState({ key: filterKey, page });
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

        <ProductFilterBar filters={filters} />

        <div
          id="product-list-start"
          className="mb-8 flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400"
          role="status"
          aria-live="polite"
        >
          <div>
            {t("search.showing")}{" "}
            <span className="text-rose-600">{filteredProducts.length}</span>{" "}
            {t("search.products")}
          </div>
        </div>

        <ProductList products={paginatedProducts} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <ProductCatalogSeo />
      </div>
    </div>
  );
}
