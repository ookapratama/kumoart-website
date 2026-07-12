import { requireAdmin } from "@/lib/auth/require-admin";
import {
  removeImageByPath,
  removeImageByUrl,
  uploadImage,
} from "@/lib/storage/images";

import type { ActionResult } from "./types";
import type { ContentTable } from "@/lib/data/queries";
import type { ImageBucket } from "@/lib/storage/images";
import type { TypedServerClient } from "@/lib/supabase/server";
import type { TablesInsert } from "@/lib/supabase/database.types";
import type { EventInput } from "@/lib/validation/event-input";
import type { ProductInput } from "@/lib/validation/product-input";

const DUPLICATE_KEY_CODE = "23505";

export const UNAUTHORIZED: ActionResult<never> = {
  ok: false,
  code: "unauthorized",
  message: "Sesi admin tidak valid. Silakan login ulang.",
};

interface SaveEntityOptions {
  table: ContentTable;
  bucket: ImageBucket;
  formData: FormData;
  payload: ProductInput | EventInput;
  revalidate: () => void;
}

interface DeleteEntityOptions {
  table: ContentTable;
  bucket: ImageBucket;
  id: string;
  revalidate: () => void;
}

export async function authenticate(): Promise<TypedServerClient | null> {
  try {
    const { supabase } = await requireAdmin();
    return supabase;
  } catch {
    return null;
  }
}

// Builder Supabase tidak me-resolve nama tabel dinamis — internal
// di-bind ke "products" (lihat catatan serupa di lib/data/queries.ts).
const bind = (supabase: TypedServerClient, table: ContentTable) =>
  supabase.from(table as "products");

export async function saveEntity({
  table,
  bucket,
  formData,
  payload,
  revalidate,
}: SaveEntityOptions): Promise<ActionResult<{ id: string }>> {
  const supabase = await authenticate();
  if (!supabase) return UNAUTHORIZED;

  const id = formData.get("id");
  const existingRaw = formData.get("existingImageUrl");
  const existingImageUrl = typeof existingRaw === "string" ? existingRaw : "";
  const image = formData.get("image");

  let imageUrl = existingImageUrl || null;
  let uploadedPath: string | null = null;

  if (image instanceof File && image.size > 0) {
    const uploaded = await uploadImage(supabase, bucket, image);
    if (!uploaded.ok) {
      return { ok: false, code: "storage", message: uploaded.message };
    }
    imageUrl = uploaded.publicUrl;
    uploadedPath = uploaded.path;
  }

  const row = { ...payload, image_url: imageUrl } as TablesInsert<"products">;
  const target = bind(supabase, table);
  const result =
    typeof id === "string" && id !== ""
      ? await target.update(row).eq("id", id).select("id").single()
      : await target.insert(row).select("id").single();

  if (result.error) {
    // Row gagal tersimpan — bersihkan file yang terlanjur terupload.
    if (uploadedPath) await removeImageByPath(supabase, bucket, uploadedPath);

    if (result.error.code === DUPLICATE_KEY_CODE) {
      return {
        ok: false,
        code: "duplicate-slug",
        message: "Slug sudah digunakan. Gunakan slug yang berbeda.",
      };
    }
    return {
      ok: false,
      code: "db",
      message: `Gagal menyimpan: ${result.error.message}`,
    };
  }

  // Gambar lama tergantikan — hapus setelah row berhasil tersimpan.
  if (existingImageUrl && imageUrl !== existingImageUrl) {
    await removeImageByUrl(supabase, bucket, existingImageUrl);
  }

  revalidate();
  return { ok: true, data: { id: result.data.id } };
}

export async function deleteEntity({
  table,
  bucket,
  id,
  revalidate,
}: DeleteEntityOptions): Promise<ActionResult> {
  const supabase = await authenticate();
  if (!supabase) return UNAUTHORIZED;

  const target = bind(supabase, table);
  const { data: existing } = await target
    .select("image_url")
    .eq("id", id)
    .single();

  const { error } = await target.delete().eq("id", id);
  if (error) {
    return {
      ok: false,
      code: "db",
      message: `Gagal menghapus: ${error.message}`,
    };
  }

  await removeImageByUrl(supabase, bucket, existing?.image_url ?? null);

  revalidate();
  return { ok: true, data: null };
}
