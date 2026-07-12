"use client";

import { useLanguage } from "@/lib/language";

interface EmptyStateProps {
  iconPath: string;
  titleKey: string;
  subtitleKey: string;
}

export default function EmptyState({
  iconPath,
  titleKey,
  subtitleKey,
}: EmptyStateProps) {
  const { t } = useLanguage();

  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg
          className="h-16 w-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d={iconPath}
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-600">{t(titleKey)}</h3>
      <p className="text-gray-400 mt-1">{t(subtitleKey)}</p>
    </div>
  );
}
