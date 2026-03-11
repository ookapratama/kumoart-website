import { createClient, createStaticClient } from "@/lib/supabase/server";
import { Event } from "./events";

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
  const supabase = createStaticClient();
  const { data, error } = await supabase.from("events").select("slug");
  if (error) return [];
  return (data ?? []).map((e) => e.slug);
}
