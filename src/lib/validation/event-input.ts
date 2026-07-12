import {
  SLUG_PATTERN,
  boolean,
  nonNegativeInt,
  optionalInt,
  optionalText,
  text,
} from "./parse";

import type { ParseResult } from "./parse";
import type { TablesInsert } from "@/lib/supabase/database.types";

export type EventInput = Omit<
  TablesInsert<"events">,
  "id" | "image_url" | "created_at" | "updated_at"
>;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseEventInput(fd: FormData): ParseResult<EventInput> {
  const title = text(fd, "title");
  const slug = text(fd, "slug");
  const startDate = text(fd, "start_date");
  const endDate = text(fd, "end_date");

  if (!title || !slug || !startDate || !endDate) {
    return { ok: false, error: "Judul, slug, dan tanggal wajib diisi." };
  }
  if (!SLUG_PATTERN.test(slug)) {
    return {
      ok: false,
      error: "Slug hanya boleh huruf kecil, angka, dan tanda hubung.",
    };
  }
  if (!DATE_PATTERN.test(startDate) || !DATE_PATTERN.test(endDate)) {
    return { ok: false, error: "Format tanggal tidak valid (YYYY-MM-DD)." };
  }
  if (endDate < startDate) {
    return {
      ok: false,
      error: "Tanggal selesai tidak boleh sebelum tanggal mulai.",
    };
  }

  const terms = fd
    .getAll("terms")
    .filter((t): t is string => typeof t === "string")
    .map((t) => t.trim())
    .filter((t) => t !== "");

  return {
    ok: true,
    data: {
      title,
      slug,
      description: optionalText(fd, "description"),
      start_date: startDate,
      end_date: endDate,
      location: optionalText(fd, "location"),
      price: nonNegativeInt(fd, "price", 0),
      discount: optionalInt(fd, "discount"),
      quota: optionalInt(fd, "quota"),
      is_active: boolean(fd, "is_active"),
      terms,
      content: optionalText(fd, "content"),
    },
  };
}
