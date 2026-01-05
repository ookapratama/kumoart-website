"use client";

import { useLanguage } from "@/lib/language";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { language } = useLanguage();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        {language === "id" ? "Sebelumnnya" : "Previous"}
      </button>

      <div className="flex items-center space-x-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl font-bold transition-all shadow-sm ${
              currentPage === page
                ? "bg-rose-600 text-white shadow-rose-200"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        {language === "id" ? "Selanjutnya" : "Next"}
      </button>
    </div>
  );
}
