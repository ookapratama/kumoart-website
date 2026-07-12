import { createClient, createStaticClient } from "@/lib/supabase/server";

import type { Database } from "@/lib/supabase/database.types";
import type { PostgrestError } from "@supabase/supabase-js";
import type { TypedServerClient } from "@/lib/supabase/server";

export type ContentTable = "products" | "events";
export type ContentRow<T extends ContentTable> =
  Database["public"]["Tables"][T]["Row"];

const NOT_FOUND_CODE = "PGRST116";

export class DataError extends Error {
  constructor(
    readonly table: ContentTable,
    readonly op: string,
    readonly cause: PostgrestError,
  ) {
    super(`Query gagal [${table}.${op}]: ${cause.message}`);
    this.name = "DataError";
  }
}

export function throwIfError(
  table: ContentTable,
  op: string,
  error: PostgrestError | null,
): void {
  if (!error) return;
  throw new DataError(table, op, error);
}

interface EntityQueriesConfig<T extends ContentTable> {
  table: T;
  publicOrder: { column: keyof ContentRow<T> & string; ascending: boolean };
}

export interface EntityQueries<T extends ContentTable> {
  /** Semua row aktif — static client, aman untuk SSG/ISR */
  getPublished(): Promise<ContentRow<T>[]>;
  /** Row aktif by slug — static client; null hanya jika tidak ditemukan */
  getPublishedBySlug(slug: string): Promise<ContentRow<T> | null>;
  /** Semua slug aktif — untuk generateStaticParams */
  getPublishedSlugs(): Promise<string[]>;
  /** Semua row termasuk non-aktif — cookie client (butuh session admin) */
  getAllForAdmin(): Promise<ContentRow<T>[]>;
  /** Row by id — cookie client (untuk halaman edit admin) */
  getById(id: string): Promise<ContentRow<T> | null>;
}

// Query builder Supabase tidak me-resolve generic table name, jadi
// internal factory di-bind ke satu tipe tabel konkret ("products").
// Ini murni trik compile-time: nama tabel & kolom runtime dijamin
// valid oleh EntityQueriesConfig, dan hasil query dikembalikan lagi
// sebagai ContentRow<T> di API publik.
type BuilderTable = "products";
type BuilderColumn = keyof ContentRow<BuilderTable> & string;

export function createEntityQueries<T extends ContentTable>({
  table,
  publicOrder,
}: EntityQueriesConfig<T>): EntityQueries<T> {
  const fromTable = (client: TypedServerClient) =>
    client.from(table as ContentTable as BuilderTable);
  const orderColumn = publicOrder.column as string as BuilderColumn;

  const asRows = (data: unknown): ContentRow<T>[] =>
    (data ?? []) as ContentRow<T>[];
  const asRow = (data: unknown): ContentRow<T> => data as ContentRow<T>;

  return {
    async getPublished() {
      const { data, error } = await fromTable(createStaticClient())
        .select("*")
        .eq("is_active", true)
        .order(orderColumn, { ascending: publicOrder.ascending });

      throwIfError(table, "getPublished", error);
      return asRows(data);
    },

    async getPublishedBySlug(slug) {
      const { data, error } = await fromTable(createStaticClient())
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error?.code === NOT_FOUND_CODE) return null;
      throwIfError(table, "getPublishedBySlug", error);
      return asRow(data);
    },

    async getPublishedSlugs() {
      const { data, error } = await fromTable(createStaticClient())
        .select("slug")
        .eq("is_active", true);

      throwIfError(table, "getPublishedSlugs", error);
      return (data ?? []).map((row) => row.slug);
    },

    async getAllForAdmin() {
      const { data, error } = await fromTable(await createClient())
        .select("*")
        .order(orderColumn, { ascending: publicOrder.ascending });

      throwIfError(table, "getAllForAdmin", error);
      return asRows(data);
    },

    async getById(id) {
      const { data, error } = await fromTable(await createClient())
        .select("*")
        .eq("id", id)
        .single();

      if (error?.code === NOT_FOUND_CODE) return null;
      throwIfError(table, "getById", error);
      return asRow(data);
    },
  };
}
