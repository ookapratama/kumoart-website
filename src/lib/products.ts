export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  stock: number;
  content: string | null;
  created_at: string;
  updated_at: string;
}

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
