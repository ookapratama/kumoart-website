import "../admin.css";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import ThemeScript from "@/components/shared/theme-script";

export const metadata: Metadata = {
  title: "Admin — Kumoart",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <>
      <ThemeScript />
      <AdminLayoutWrapper user={user}>{children}</AdminLayoutWrapper>
    </>
  );
}
