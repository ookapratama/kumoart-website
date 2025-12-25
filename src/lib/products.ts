import productsData from '@/data/products.json';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isFeatured: boolean;
  stock: number;
}

/**
 * Mendapatkan semua produk
 */
export function getAllProducts(): Product[] {
  return productsData as Product[];
}

/**
 * Mendapatkan produk berdasarkan slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return (productsData as Product[]).find((product) => product.slug === slug);
}

/**
 * Mencari produk berdasarkan keyword (nama atau deskripsi)
 */
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase().trim();
  
  if (!lowercaseQuery) {
    return getAllProducts();
  }
  
  return (productsData as Product[]).filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Mendapatkan produk unggulan (featured products)
 */
export function getFeaturedProducts(limit: number = 6): Product[] {
  return (productsData as Product[])
    .filter((product) => product.isFeatured)
    .slice(0, limit);
}

/**
 * Mendapatkan produk berdasarkan kategori
 */
export function getProductsByCategory(category: string): Product[] {
  return (productsData as Product[]).filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Mendapatkan semua kategori unik
 */
export function getAllCategories(): string[] {
  const categories = (productsData as Product[]).map((product) => product.category);
  return [...new Set(categories)];
}

/**
 * Mendapatkan semua slugs untuk static generation
 */
export function getAllProductSlugs(): string[] {
  return (productsData as Product[]).map((product) => product.slug);
}

/**
 * Format harga ke Rupiah
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
