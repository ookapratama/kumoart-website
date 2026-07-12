"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminBottomNav from "@/components/admin/AdminBottomNav";

import type { User } from "@supabase/supabase-js";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  user: User;
}

export default function AdminLayoutWrapper({
  children,
  user,
}: AdminLayoutWrapperProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader user={user} onLogout={handleLogout} />
        <main className="admin-content">{children}</main>
      </div>

      <AdminBottomNav user={user} onLogout={handleLogout} />
    </div>
  );
}
