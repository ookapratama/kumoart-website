"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/lib/products";

export function useProductFilters(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const categories = useMemo(() => {
    const unique = new Set(
      products
        .map((p) => p.category)
        .filter((c): c is string => c !== null && c !== ""),
    );
    return Array.from(unique);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const min = minPrice === "" ? 0 : parseInt(minPrice, 10) || 0;
    const max = maxPrice === "" ? Infinity : parseInt(maxPrice, 10) || Infinity;

    return products.filter((product) => {
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        (product.description ?? "").toLowerCase().includes(query) ||
        (product.category ?? "").toLowerCase().includes(query);
      if (!matchesSearch) return false;

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      if (!matchesCategory) return false;

      const matchesPrice = product.price >= min && product.price <= max;
      if (!matchesPrice) return false;

      return !onlyInStock || product.stock > 0;
    });
  }, [products, searchQuery, selectedCategory, minPrice, maxPrice, onlyInStock]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    onlyInStock,
    setOnlyInStock,
    categories,
    filteredProducts,
  };
}

export type ProductFiltersState = ReturnType<typeof useProductFilters>;
