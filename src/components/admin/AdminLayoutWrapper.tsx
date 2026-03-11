"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import type { User } from "@supabase/supabase-js";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  user: User;
}

export default function AdminLayoutWrapper({
  children,
  user,
}: AdminLayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={`admin-layout ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="admin-main">
        <AdminHeader user={user} onMenuToggle={toggleSidebar} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
