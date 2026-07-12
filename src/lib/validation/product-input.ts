import {
  SLUG_PATTERN,
  boolean,
  nonNegativeInt,
  optionalText,
  text,
} from "./parse";

import type { ParseResult } from "./parse";
import type { TablesInsert } from "@/lib/supabase/database.types";

export type ProductInput = Omit<
  TablesInsert<"products">,
  "id" | "image_url" | "gallery_images" | "created_at" | "updated_at"
>;

export function parseProductInput(fd: FormData): ParseResult<ProductInput> {
  const name = text(fd, "name");
  const slug = text(fd, "slug");

  if (!name || !slug) {
    return { ok: false, error: "Nama dan slug wajib diisi." };
  }
  if (!SLUG_PATTERN.test(slug)) {
    return {
      ok: false,
      error: "Slug hanya boleh huruf kecil, angka, dan tanda hubung.",
    };
  }

  const priceRaw = text(fd, "price");
  const price = nonNegativeInt(fd, "price", -1);
  if (!priceRaw || price < 0) {
    return { ok: false, error: "Harga wajib diisi dengan angka >= 0." };
  }

  return {
    ok: true,
    data: {
      name,
      slug,
      description: optionalText(fd, "description"),
      price,
      category: optionalText(fd, "category"),
      stock: nonNegativeInt(fd, "stock", 0),
      is_featured: boolean(fd, "is_featured"),
      is_active: boolean(fd, "is_active"),
      content: optionalText(fd, "content"),
    },
  };
}
