import { createClient } from "@/lib/supabase/server";

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  image_url: string | null;
  is_active: boolean;
  discount: number | null;
  price: number;
  location: string | null;
  quota: number | null;
  terms: string[];
  content: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Format tanggal ke format Indonesia
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
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
  if (startDate === endDate) return formatDate(startDate);
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

/**
 * Cek apakah event masih berlangsung
 */
export function isEventOngoing(startDate: string, endDate: string): boolean {
  const now = new Date();
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T23:59:59");
  return now >= start && now <= end;
}

/**
 * Cek apakah event akan datang
 */
export function isEventUpcoming(startDate: string): boolean {
  const now = new Date();
  const start = new Date(startDate + "T00:00:00");
  return now < start;
}

/**
 * Format harga event ke Rupiah
 */
export function formatEventPrice(price: number | undefined | null): string {
  if (price === undefined || price === null || price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Ambil semua event aktif (untuk public site)
 */
export async function getAllEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching events:", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Ambil semua event (untuk admin, termasuk non-aktif)
 */
export async function getAllEventsAdmin(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching events (admin):", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Ambil event berdasarkan slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching event by slug:", error.message);
    return null;
  }
  return data;
}

/**
 * Ambil event berdasarkan ID (untuk admin edit)
 */
export async function getEventById(id: string): Promise<Event | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching event by id:", error.message);
    return null;
  }
  return data;
}

/**
 * Ambil event aktif saja
 */
export async function getActiveEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("start_date", { ascending: false });

  if (error) return [];
  return data ?? [];
}

/**
 * Ambil semua slug event (untuk generateStaticParams)
 */
export async function getAllEventSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("events").select("slug");
  if (error) return [];
  return (data ?? []).map((e) => e.slug);
}
