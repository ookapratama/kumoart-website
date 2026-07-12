"use client";

import type { User } from "@supabase/supabase-js";
import ThemeToggle from "./ThemeToggle";

interface AdminHeaderProps {
  user: User;
  onLogout: () => void;
}

export default function AdminHeader({ user, onLogout }: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <span className="admin-header-title">Admin Panel</span>
      </div>
      <div className="admin-header-right">
        {/* Switcher Mode */}
        <ThemeToggle />

        <div className="header-divider"></div>

        <div className="admin-header-user">
          <div className="admin-header-avatar">
            {user.email?.charAt(0).toUpperCase() ?? "A"}
          </div>
          <span className="admin-header-email">{user.email}</span>
        </div>
        <button onClick={onLogout} className="btn-logout">
          Keluar
        </button>
      </div>
    </header>
  );
}
