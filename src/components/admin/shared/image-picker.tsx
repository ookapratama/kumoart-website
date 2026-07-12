"use client";

import { useEffect, useRef, useState } from "react";
import { compressImageToWebp } from "@/lib/images/compress-image";

interface ImagePickerProps {
  currentUrl?: string | null;
  onSelect: (file: File) => void;
  label?: string;
}

/**
 * Pilih + kompres gambar di browser. TIDAK mengupload apapun —
 * file hasil kompresi diserahkan lewat onSelect dan baru diupload
 * oleh Server Action saat form disimpan.
 */
export default function ImagePicker({
  currentUrl,
  onSelect,
  label = "",
}: ImagePickerProps) {
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  const handleFile = async (file: File) => {
    if (processing) return;
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang diizinkan (JPG, PNG, WebP, dll)");
      return;
    }

    setError(null);
    setProcessing(true);

    try {
      setProgress("⚙️ Mengompresi gambar...");
      const compressed = await compressImageToWebp(file, (p) =>
        setProgress(`⚙️ Mengompresi... ${p}%`),
      );

      const originalKB = Math.round(file.size / 1024);
      const compressedKB = Math.round(compressed.size / 1024);

      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = URL.createObjectURL(compressed);
      setPreview(blobUrlRef.current);

      onSelect(compressed);
      setProgress(
        `✅ Siap diupload saat disimpan (${originalKB}KB → ${compressedKB}KB)`,
      );
    } catch (err) {
      console.error("Compress error:", err);
      setError("Gagal memproses gambar. Coba lagi.");
      setProgress(null);
    } finally {
      setProcessing(false);
    }
  };

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
      {label && <label className="form-label">{label}</label>}

      <div
        className={`drop-zone ${isDragging ? "drop-zone-active" : ""} ${processing ? "drop-zone-uploading" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !processing && inputRef.current?.click()}
      >
        {preview ? (
          <div className="drop-zone-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="drop-zone-img" />
            <div className="drop-zone-overlay">
              {processing ? "Memproses..." : "Klik/drag untuk ganti gambar"}
            </div>
          </div>
        ) : (
          <div className="drop-zone-placeholder">
            <div className="drop-zone-icon">🖼️</div>
            <div className="drop-zone-text">
              {processing
                ? "Memproses..."
                : "Drag & drop gambar, atau klik untuk pilih"}
            </div>
            <div className="drop-zone-hint">
              JPG, PNG, WebP — otomatis dikompresi ke WebP HD (max 800KB)
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="drop-zone-input"
          disabled={processing}
        />
      </div>

      {progress && (
        <div className={`upload-progress ${processing ? "uploading" : "done"}`}>
          {progress}
        </div>
      )}

      {error && <div className="upload-error">⚠️ {error}</div>}
    </div>
  );
}
