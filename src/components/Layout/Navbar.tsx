"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { config } from "@/lib/config";
import LanguageSwitch from "@/components/UI/LanguageSwitch";
import { useLanguage } from "@/lib/language";
import { Event } from "@/lib/events";

interface NavbarProps {
  activeEvents?: Event[];
}

export default function Navbar({ activeEvents = [] }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                src="/logo.png"
                alt={`${config.brand.name} Logo`}
                width={48}
                height={48}
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
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

          {/* Mobile menu and Language Switch button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitch className="scale-90" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-rose-600 focus:outline-none relative"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              {/* Mobile notification dot */}
              {hasActiveEvents && !isMobileMenuOpen && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between text-gray-700 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  {/* Mobile event badge */}
                  {item.hasNotification && hasActiveEvents && (
                    <span className="flex items-center gap-2">
                      <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                        {activeEvents.length} {t("events.ongoing")}
                      </span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
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
                  .map((e) => e.discount || 0)
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
