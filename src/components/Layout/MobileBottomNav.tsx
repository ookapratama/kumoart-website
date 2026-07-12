"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/shared/whatsapp-icon";

import type { Event } from "@/lib/events";

interface MobileBottomNavProps {
  activeEvents?: Event[];
}

export default function MobileBottomNav({
  activeEvents = [],
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const isProductDetailPage =
    pathname.startsWith("/produk/") && pathname !== "/produk/";

  if (isProductDetailPage) return null;

  const hasActiveEvents = activeEvents.length > 0;
  const whatsappUrl = generateWhatsAppLink({
    customMessage: t("cta.floating_msg"),
  });

  const items = [
    {
      href: "/",
      label: t("nav.home"),
      active: pathname === "/",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M3 12l2-2m0 0l7-7 7 7m-9-2v10m6 0V10m2 2l-2-2" />
        </svg>
      ),
    },
    {
      href: "/produk",
      label: t("nav.products"),
      active: pathname.startsWith("/produk"),
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
    },
    {
      href: "/event",
      label: t("nav.events"),
      active: pathname.startsWith("/event"),
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      showBadge: hasActiveEvents,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Navigasi utama"
    >
      <div className="flex h-16 items-stretch justify-around">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 text-[11px] font-semibold transition-colors ${
              item.active ? "text-rose-600" : "text-gray-500"
            }`}
          >
            {item.icon}
            {item.label}
            {item.showBadge && (
              <span className="absolute top-1 right-1/3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </Link>
        ))}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 flex-1 text-[11px] font-semibold text-gray-500"
        >
          <span className="bg-emerald-500 text-white rounded-full p-1.5">
            <WhatsAppIcon className="w-4 h-4" />
          </span>
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
