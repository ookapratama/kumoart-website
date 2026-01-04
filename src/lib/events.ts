export interface Event {
  id: number;
  slug: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  isActive: boolean;
  discount?: number;
  price?: number;
  location?: string;
  quota?: number;
  terms: string[];
  content?: string;
}

/**
 * Format tanggal ke format Indonesia
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Format range tanggal
 */
export function formatDateRange(startDate: string, endDate: string): string {
  if (startDate === endDate) {
    return formatDate(startDate);
  }
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

/**
 * Cek apakah event masih berlangsung berdasarkan tanggal
 */
export function isEventOngoing(startDate: string, endDate: string): boolean {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999); // Set to end of day

  return now >= start && now <= end;
}

/**
 * Cek apakah event akan datang
 */
export function isEventUpcoming(startDate: string): boolean {
  const now = new Date();
  const start = new Date(startDate);
  return now < start;
}

/**
 * Format harga event ke Rupiah
 */
export function formatEventPrice(price: number | undefined): string {
  if (price === undefined || price === 0) {
    return "Gratis";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
