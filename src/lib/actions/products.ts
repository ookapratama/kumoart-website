"use server";

import { revalidatePath } from "next/cache";

import { authenticate, deleteEntity, saveEntity, UNAUTHORIZED } from "./save-entity";
import { removeGalleryImages, uploadGalleryImages } from "@/lib/storage/gallery";
import { MAX_GALLERY_IMAGES } from "@/lib/products";
import { parseProductInput } from "@/lib/validation/product-input";

import type { ActionResult } from "./types";
import type { TypedServerClient } from "@/lib/supabase/server";

const BUCKET = "product-images" as const;

function revalidateProductPaths(): void {
  revalidatePath("/");
  revalidatePath("/produk");
  revalidatePath("/produk/[slug]", "page");
}

function readGalleryFormData(formData: FormData) {
  const keepUrls = formData
    .getAll("galleryKeep")
    .filter((v): v is string => typeof v === "string" && v !== "");
  const newFiles = formData
    .getAll("galleryFiles")
    .filter((v): v is File => v instanceof File && v.size > 0);
  return { keepUrls, newFiles };
}

/**
 * Sinkronkan gallery_images: upload file baru, gabung dengan yang dipertahankan,
 * fetch state lama dari DB (server-authoritative), lalu hapus file yatim.
 */
async function syncProductGallery(
  supabase: TypedServerClient,
  productId: string,
  formData: FormData,
): Promise<ActionResult> {
  const { keepUrls, newFiles } = readGalleryFormData(formData);
  const keptCapped = keepUrls.slice(0, MAX_GALLERY_IMAGES);
  const room = Math.max(MAX_GALLERY_IMAGES - keptCapped.length, 0);

  const uploaded = await uploadGalleryImages(supabase, BUCKET, newFiles.slice(0, room));
  if (!uploaded.ok) {
    await removeGalleryImages(supabase, BUCKET, uploaded.uploadedUrls);
    return { ok: false, code: "storage", message: uploaded.message };
  }

  const finalUrls = [...keptCapped, ...uploaded.urls];

  const { data: current } = await supabase
    .from("products")
    .select("gallery_images")
    .eq("id", productId)
    .single();
  const oldUrls = current?.gallery_images ?? [];

  const { error } = await supabase
    .from("products")
    .update({ gallery_images: finalUrls })
    .eq("id", productId);

  if (error) {
    await removeGalleryImages(supabase, BUCKET, uploaded.urls);
    return { ok: false, code: "db", message: `Gagal menyimpan galeri: ${error.message}` };
  }

  const orphaned = oldUrls.filter((url) => !finalUrls.includes(url));
  await removeGalleryImages(supabase, BUCKET, orphaned);
  return { ok: true, data: null };
}

export async function saveProduct(
  formData: FormData,
): Promise<ActionResult<{ id: string }>> {
  const parsed = parseProductInput(formData);
  if (!parsed.ok) {
    return { ok: false, code: "validation", message: parsed.error };
  }

  const saved = await saveEntity({
    table: "products",
    bucket: BUCKET,
    formData,
    payload: parsed.data,
    revalidate: revalidateProductPaths,
  });
  if (!saved.ok) return saved;

  const supabase = await authenticate();
  if (!supabase) return UNAUTHORIZED;

  const galleryResult = await syncProductGallery(supabase, saved.data.id, formData);
  if (!galleryResult.ok) return galleryResult;

  revalidateProductPaths();
  return saved;
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = await authenticate();
  if (!supabase) return UNAUTHORIZED;

  const { data: existing } = await supabase
    .from("products")
    .select("gallery_images")
    .eq("id", id)
    .single();
  const galleryUrls = existing?.gallery_images ?? [];

  const result = await deleteEntity({
    table: "products",
    bucket: BUCKET,
    id,
    revalidate: revalidateProductPaths,
  });
  if (!result.ok) return result;

  await removeGalleryImages(supabase, BUCKET, galleryUrls);
  return result;
}
