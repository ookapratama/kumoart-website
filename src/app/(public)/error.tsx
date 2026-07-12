"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PublicError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Public page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold">Terjadi Kesalahan</h1>
      <p className="max-w-md text-gray-600">
        Maaf, halaman ini gagal dimuat. Silakan coba lagi beberapa saat lagi.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-gray-900 px-6 py-2 text-white transition hover:bg-gray-700"
      >
        Coba Lagi
      </button>
    </div>
  );
}
