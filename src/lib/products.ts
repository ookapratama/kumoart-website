export interface Product {
  id: number; // Tetap ada untuk backward compatibility jika perlu, tapi CMS lebih prefer slug atau filename
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isFeatured: boolean;
  isActive: boolean;
  stock: number;
  content?: string;
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
