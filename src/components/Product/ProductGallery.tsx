"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isFeatured: boolean;
}

export default function ProductGallery({
  images,
  productName,
  isFeatured,
}: ProductGalleryProps) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (images.length <= 1) return;
    if (e.key === "ArrowRight") {
      setActiveIndex((i) => (i + 1) % images.length);
    } else if (e.key === "ArrowLeft") {
      setActiveIndex((i) => (i - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="relative bg-gray-50 p-6 md:p-10 flex flex-col gap-4">
      <div
        className="relative aspect-square w-full outline-none"
        tabIndex={images.length > 1 ? 0 : -1}
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src={activeImage}
            alt={productName}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {isFeatured && (
          <div className="absolute top-12 left-12 z-10">
            <span className="bg-rose-600 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl transform -rotate-3">
              ✨ {t("products.featured")}
            </span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                index === activeIndex
                  ? "border-rose-500 ring-2 ring-rose-200"
                  : "border-white/60 opacity-70 hover:opacity-100"
              }`}
              aria-label={`Lihat gambar ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
