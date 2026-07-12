import type { TypedServerClient } from "@/lib/supabase/server";

export type ImageBucket = "product-images" | "event-images";

type UploadResult =
  | { ok: true; path: string; publicUrl: string }
  | { ok: false; message: string };

/**
 * Ekstrak path object storage dari public URL Supabase.
 * Contoh: https://xxx.supabase.co/storage/v1/object/public/product-images/abc.webp
 */
export function storagePathFromPublicUrl(
  url: string,
  bucket: ImageBucket,
): string | null {
  const marker = `/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

export async function uploadImage(
  supabase: TypedServerClient,
  bucket: ImageBucket,
  file: File,
): Promise<UploadResult> {
  const path = `${Date.now()}-${crypto.randomUUID()}.webp`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type || "image/webp",
    upsert: false,
  });

  if (error) {
    return { ok: false, message: `Gagal upload gambar: ${error.message}` };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { ok: true, path, publicUrl: data.publicUrl };
}

/** Hapus file storage berdasarkan public URL. Best-effort: gagal hanya di-log. */
export async function removeImageByUrl(
  supabase: TypedServerClient,
  bucket: ImageBucket,
  url: string | null,
): Promise<void> {
  if (!url) return;

  const path = storagePathFromPublicUrl(url, bucket);
  if (!path) return;

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    console.error(`Gagal hapus file ${bucket}/${path}: ${error.message}`);
  }
}

/** Hapus file storage berdasarkan path langsung. Best-effort. */
export async function removeImageByPath(
  supabase: TypedServerClient,
  bucket: ImageBucket,
  path: string,
): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    console.error(`Gagal hapus file ${bucket}/${path}: ${error.message}`);
  }
}
