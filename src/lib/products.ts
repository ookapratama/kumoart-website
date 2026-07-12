import type { Tables } from "@/lib/supabase/database.types";

export type Product = Tables<"products">;

/** Maksimum gambar galeri tambahan per produk (di luar cover). */
export const MAX_GALLERY_IMAGES = 5;

/**
 * Format harga ke Rupiah
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
