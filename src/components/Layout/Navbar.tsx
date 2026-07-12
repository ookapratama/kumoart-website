"use client";

import Link from "next/link";
import Image from "next/image";
import { config } from "@/lib/config";
import LanguageSwitch from "@/components/UI/LanguageSwitch";
import { useLanguage } from "@/lib/language";
import { Event } from "@/lib/events";

interface NavbarProps {
  activeEvents?: Event[];
}

export default function Navbar({ activeEvents = [] }: NavbarProps) {
  const { t } = useLanguage();

  // Check if there are active events
  const hasActiveEvents = activeEvents.length > 0;

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.products"), href: "/produk" },
    { name: t("nav.events"), href: "/event", hasNotification: true },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/logo.webp"
                alt={`${config.brand.name} Logo`}
                width={48}
                height={48}
                className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                  {config.brand.name}
                </span>
                <span className="text-xs text-rose-600 font-medium hidden sm:block">
                  {config.brand.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-rose-600 transition-colors duration-200 font-medium group"
              >
                <span className="flex items-center gap-1">
                  {item.name}
                  {/* Event notification badge */}
                  {item.hasNotification && hasActiveEvents && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                  )}
                </span>
                {/* Event count tooltip on hover */}
                {item.hasNotification && hasActiveEvents && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {activeEvents.length} {t("nav.active_events")}
                  </span>
                )}
              </Link>
            ))}

            {/* Language Switch Desktop */}
            <div className="pl-4 border-l border-gray-200">
              <LanguageSwitch />
            </div>
          </div>

          {/* Language Switch (mobile) */}
          <div className="md:hidden flex items-center">
            <LanguageSwitch className="scale-90" />
          </div>
        </div>
      </div>

      {/* Event announcement banner */}
      {hasActiveEvents && activeEvents.some((e) => e.discount) && (
        <div className="bg-gradient-to-r from-rose-600 to-rose-500 text-white py-2 px-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
            <span className="animate-bounce">🎉</span>
            <span className="font-medium">
              {t("promo.special")} {t("promo.discount_up_to")}{" "}
              {Math.max(
                ...activeEvents
                  .filter((e) => e.discount)
                  .map((e) => e.discount || 0),
              )}
              %
            </span>
            <Link
              href="/event"
              className="underline hover:no-underline font-semibold ml-2"
            >
              {t("promo.view")} →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
