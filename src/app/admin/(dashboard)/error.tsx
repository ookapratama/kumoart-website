"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Admin page error:", error);
  }, [error]);

  return (
    <div className="error-state">
      <p>Gagal memuat data. Periksa koneksi atau coba lagi.</p>
      <button type="button" onClick={reset} className="btn-primary">
        Coba Lagi
      </button>
    </div>
  );
}
