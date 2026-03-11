"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import ThemeToggle from "./ThemeToggle";

export default function AdminHeader({ user }: { user: User }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        {/* Mobile: Kumoart Title */}
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
        <button onClick={handleLogout} className="btn-logout">
          Keluar
        </button>
      </div>
    </header>
  );
}
