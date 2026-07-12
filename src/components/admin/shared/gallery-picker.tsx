"use client";

import { useEffect, useRef, useState } from "react";
import { compressImageToWebp } from "@/lib/images/compress-image";

interface GalleryPickerProps {
  keepUrls: string[];
  onRemoveExisting: (url: string) => void;
  newFiles: File[];
  onAddFiles: (files: File[]) => void;
  onRemoveNewFile: (index: number) => void;
  max: number;
  label?: string;
}

export default function GalleryPicker({
  keepUrls,
  onRemoveExisting,
  newFiles,
  onAddFiles,
  onRemoveNewFile,
  max,
  label = "",
}: GalleryPickerProps) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewMapRef = useRef<Map<File, string>>(new Map());

  useEffect(() => {
    const previousMap = previewMapRef.current;
    const nextMap = new Map<File, string>();

    const nextPreviews = newFiles.map((file) => {
      const existingUrl = previousMap.get(file);
      const url = existingUrl ?? URL.createObjectURL(file);
      nextMap.set(file, url);
      return url;
    });

    previousMap.forEach((url, file) => {
      if (!nextMap.has(file)) URL.revokeObjectURL(url);
    });

    previewMapRef.current = nextMap;
    setPreviews(nextPreviews);
  }, [newFiles]);

  useEffect(() => {
    return () => {
      previewMapRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const totalCount = keepUrls.length + newFiles.length;
  const room = Math.max(max - totalCount, 0);

  const handleFiles = async (files: FileList) => {
    if (processing || room === 0) return;
    setError(null);
    setProcessing(true);

    try {
      const picked = Array.from(files).slice(0, room);
      const compressed: File[] = [];
      for (const file of picked) {
        if (!file.type.startsWith("image/")) continue;
        compressed.push(await compressImageToWebp(file));
      }
      onAddFiles(compressed);
    } catch (err) {
      console.error("Gallery compress error:", err);
      setError("Gagal memproses salah satu gambar. Coba lagi.");
    } finally {
      setProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <div className="image-uploader">
      {label && <label className="form-label">{label}</label>}

      <div className="flex flex-wrap gap-2">
        {keepUrls.map((url) => (
          <div
            key={url}
            className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveExisting(url)}
              className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 text-xs leading-none flex items-center justify-center"
              aria-label="Hapus gambar"
            >
              ✕
            </button>
          </div>
        ))}

        {newFiles.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previews[index]}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemoveNewFile(index)}
              className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 text-xs leading-none flex items-center justify-center"
              aria-label="Hapus gambar"
            >
              ✕
            </button>
          </div>
        ))}

        {room > 0 && (
          <button
            type="button"
            onClick={() => !processing && inputRef.current?.click()}
            disabled={processing}
            className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-rose-300 hover:text-rose-500 transition-colors"
          >
            <span className="text-xl leading-none">+</span>
            <span className="text-[10px]">
              {processing ? "..." : "Tambah"}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleInputChange}
        className="hidden"
      />

      <p className="form-hint mt-2">
        {totalCount}/{max} gambar galeri
      </p>

      {error && <div className="upload-error">⚠️ {error}</div>}
    </div>
  );
}
