import { removeImageByUrl, uploadImage } from "./images";

import type { TypedServerClient } from "@/lib/supabase/server";
import type { ImageBucket } from "./images";

type GalleryUploadResult =
  | { ok: true; urls: string[] }
  | { ok: false; message: string; uploadedUrls: string[] };

/**
 * Upload beberapa file galeri secara berurutan. Berhenti di file pertama
 * yang gagal; mengembalikan URL yang sudah terupload agar caller bisa rollback.
 */
export async function uploadGalleryImages(
  supabase: TypedServerClient,
  bucket: ImageBucket,
  files: File[],
): Promise<GalleryUploadResult> {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const result = await uploadImage(supabase, bucket, file);
    if (!result.ok) {
      return { ok: false, message: result.message, uploadedUrls };
    }
    uploadedUrls.push(result.publicUrl);
  }

  return { ok: true, urls: uploadedUrls };
}

/** Hapus banyak file galeri sekaligus. Best-effort (lihat removeImageByUrl). */
export async function removeGalleryImages(
  supabase: TypedServerClient,
  bucket: ImageBucket,
  urls: string[],
): Promise<void> {
  for (const url of urls) {
    await removeImageByUrl(supabase, bucket, url);
  }
}
