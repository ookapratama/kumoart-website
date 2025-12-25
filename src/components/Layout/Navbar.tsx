'use client';

import Link from 'next/link';
import { useState } from 'react';
import { config } from '@/lib/config';
import { getActiveEvents } from '@/lib/events';

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Produk', href: '/produk' },
  { name: 'Event', href: '/event', hasNotification: true },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check if there are active events
  const activeEvents = getActiveEvents();
  const hasActiveEvents = activeEvents.length > 0;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{config.brand.name}</span>
              <span className="text-xs text-rose-600 font-medium">{config.brand.tagline}</span>
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
                    {activeEvents.length} event aktif
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
                        {activeEvents.length} aktif
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
      
      {/* Event announcement banner (optional - shows when there's a special event) */}
      {hasActiveEvents && activeEvents.some(e => e.discount) && (
        <div className="bg-gradient-to-r from-rose-600 to-rose-500 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
            <span className="animate-bounce">🎉</span>
            <span className="font-medium">
              Promo Spesial! Diskon hingga {Math.max(...activeEvents.filter(e => e.discount).map(e => e.discount || 0))}%
            </span>
            <Link 
              href="/event" 
              className="underline hover:no-underline font-semibold ml-2"
            >
              Lihat Promo →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
