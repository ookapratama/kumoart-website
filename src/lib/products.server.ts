import { createClient } from "@/lib/supabase/server";
import { Product } from "./products";

/**
 * Ambil semua produk aktif (untuk public site)
 */
export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Ambil semua produk (untuk admin, termasuk non-aktif)
 */
export async function getAllProductsAdmin(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products (admin):", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Ambil produk berdasarkan slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product by slug:", error.message);
    return null;
  }
  return data;
}

/**
 * Ambil produk berdasarkan ID (untuk admin edit)
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product by id:", error.message);
    return null;
  }
  return data;
}

/**
 * Ambil produk featured
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured products:", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Ambil semua slug produk (untuk generateStaticParams)
 */
export async function getAllProductSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true);

  if (error) return [];
  return (data ?? []).map((p) => p.slug);
}
