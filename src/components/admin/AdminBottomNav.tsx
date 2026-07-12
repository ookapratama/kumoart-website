"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "./admin-nav-items";
import ThemeToggle from "./ThemeToggle";

import type { User } from "@supabase/supabase-js";

interface AdminBottomNavProps {
  user: User;
  onLogout: () => void;
}

export default function AdminBottomNav({ user, onLogout }: AdminBottomNavProps) {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <>
      {isMoreOpen && (
        <div
          className="admin-sheet-overlay"
          onClick={() => setIsMoreOpen(false)}
        />
      )}

      {isMoreOpen && (
        <div className="admin-more-sheet">
          <div className="admin-more-sheet-user">
            <div className="admin-header-avatar">
              {user.email?.charAt(0).toUpperCase() ?? "A"}
            </div>
            <span className="admin-header-email">{user.email}</span>
          </div>

          <div className="admin-more-sheet-row">
            <span>Tema</span>
            <ThemeToggle />
          </div>

          <Link
            href="/"
            target="_blank"
            className="admin-more-sheet-link"
            onClick={() => setIsMoreOpen(false)}
          >
            🌐 Lihat Website
          </Link>

          <button
            onClick={() => {
              setIsMoreOpen(false);
              onLogout();
            }}
            className="admin-more-sheet-logout"
          >
            Keluar
          </button>
        </div>
      )}

      <nav className="admin-bottom-nav">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-bottom-nav-item ${isActive ? "active" : ""}`}
              onClick={() => setIsMoreOpen(false)}
            >
              <span className="admin-bottom-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setIsMoreOpen((prev) => !prev)}
          className={`admin-bottom-nav-item ${isMoreOpen ? "active" : ""}`}
        >
          <span className="admin-bottom-nav-icon">☰</span>
          <span>More</span>
        </button>
      </nav>
    </>
  );
}
