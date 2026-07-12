import { createEntityQueries, throwIfError } from "@/lib/data/queries";
import { createStaticClient } from "@/lib/supabase/server";

import type { Product } from "./products";

const productQueries = createEntityQueries({
  table: "products",
  publicOrder: { column: "created_at", ascending: false },
});

/** Semua produk aktif (public site) */
export const getAllProducts = productQueries.getPublished;

/** Semua produk termasuk non-aktif (admin) */
export const getAllProductsAdmin = productQueries.getAllForAdmin;

/** Produk aktif berdasarkan slug (public detail) */
export const getProductBySlug = productQueries.getPublishedBySlug;

/** Produk berdasarkan ID (admin edit) */
export const getProductById = productQueries.getById;

/** Semua slug produk aktif (generateStaticParams) */
export const getAllProductSlugs = productQueries.getPublishedSlugs;

/** Produk featured untuk homepage */
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  throwIfError("products", "getFeaturedProducts", error);
  return data ?? [];
}
