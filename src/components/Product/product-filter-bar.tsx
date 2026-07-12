"use client";

import { useLanguage } from "@/lib/language";

import type { ProductFiltersState } from "./use-product-filters";

interface ProductFilterBarProps {
  filters: ProductFiltersState;
}

const inputClass =
  "w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none ring-2 ring-transparent focus:ring-rose-500/20 transition-all";

const labelClass =
  "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1";

export default function ProductFilterBar({ filters }: ProductFilterBarProps) {
  const { language } = useLanguage();
  const {
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    onlyInStock,
    setOnlyInStock,
    categories,
  } = filters;

  return (
    <div className="bg-rose-50 p-6 rounded-3xl shadow-sm border border-rose-100 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-end gap-6">
        {/* Category Filter */}
        <div className="flex-1">
          <label className={labelClass}>
            {language === "id" ? "Kategori" : "Category"}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="all">
              {language === "id" ? "Semua Kategori" : "All Categories"}
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="flex-[2] flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className={labelClass}>
              {language === "id" ? "Harga Min (Rp)" : "Min Price (Rp)"}
            </label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex-1">
            <label className={labelClass}>
              {language === "id" ? "Harga Max (Rp)" : "Max Price (Rp)"}
            </label>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className={inputClass}
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
  );
}
