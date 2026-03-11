"use client";

import { useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import imageCompression from "browser-image-compression";

interface ImageUploaderProps {
  bucket: "product-images" | "event-images";
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  label?: string;
}

export default function ImageUploader({
  bucket,
  currentUrl,
  onUpload,
  label = "Gambar",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Hanya file gambar yang diizinkan (JPG, PNG, WebP, dll)");
        return;
      }

      setError(null);
      setUploading(true);

      try {
        // 1. Kompresi gambar
        setProgress("⚙️ Mengompresi gambar...");
        const compressed = await imageCompression(file, {
          maxSizeMB: 0.8, // Max 800KB
          maxWidthOrHeight: 1920, // Max 1920px (HD)
          useWebWorker: true,
          fileType: "image/webp", // Konversi ke WebP
          initialQuality: 0.85, // Quality 85%
          onProgress: (p) => {
            setProgress(`⚙️ Mengompresi... ${p}%`);
          },
        });

        const originalKB = Math.round(file.size / 1024);
        const compressedKB = Math.round(compressed.size / 1024);
        setProgress(`✅ Terkompresi: ${originalKB}KB → ${compressedKB}KB`);

        // Preview lokal
        const localPreview = URL.createObjectURL(compressed);
        setPreview(localPreview);

        // 2. Upload ke Supabase Storage
        setProgress("☁️ Mengupload ke storage...");
        const ext = "webp";
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, compressed, {
            contentType: "image/webp",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // 3. Dapatkan public URL
        const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
        onUpload(data.publicUrl);
        setProgress(
          `✅ Selesai! ${originalKB}KB → ${compressedKB}KB (${Math.round((1 - compressedKB / originalKB) * 100)}% lebih kecil)`,
        );
      } catch (err) {
        console.error("Upload error:", err);
        setError("Gagal mengupload gambar. Coba lagi.");
        setProgress(null);
      } finally {
        setUploading(false);
      }
    },
    [bucket, onUpload, supabase],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="image-uploader">
      <label className="form-label">{label}</label>

      {/* Drop Zone */}
      <div
        className={`drop-zone ${isDragging ? "drop-zone-active" : ""} ${uploading ? "drop-zone-uploading" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {preview ? (
          <div className="drop-zone-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="drop-zone-img" />
            <div className="drop-zone-overlay">
              {uploading ? "Mengupload..." : "Klik/drag untuk ganti gambar"}
            </div>
          </div>
        ) : (
          <div className="drop-zone-placeholder">
            <div className="drop-zone-icon">🖼️</div>
            <div className="drop-zone-text">
              {uploading
                ? "Mengupload..."
                : "Drag & drop gambar, atau klik untuk pilih"}
            </div>
            <div className="drop-zone-hint">
              JPG, PNG, WebP — akan otomatis dikompresi ke WebP HD (max 800KB)
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="drop-zone-input"
          disabled={uploading}
        />
      </div>

      {/* Progress */}
      {progress && (
        <div className={`upload-progress ${uploading ? "uploading" : "done"}`}>
          {progress}
        </div>
      )}

      {/* Error */}
      {error && <div className="upload-error">⚠️ {error}</div>}
    </div>
  );
}
