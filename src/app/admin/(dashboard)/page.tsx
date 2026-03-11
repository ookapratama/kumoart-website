import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Admin — Kumoart",
};

async function getStats() {
  const supabase = await createClient();

  const [
    { count: totalProducts },
    { count: activeProducts },
    { count: featuredProducts },
    { count: totalEvents },
    { count: activeEvents },
    { data: recentProducts },
    { data: recentEvents },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("products")
      .select("id, name, category, price, is_active, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("events")
      .select("id, title, start_date, is_active, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    totalProducts: totalProducts ?? 0,
    activeProducts: activeProducts ?? 0,
    featuredProducts: featuredProducts ?? 0,
    totalEvents: totalEvents ?? 0,
    activeEvents: activeEvents ?? 0,
    recentProducts: recentProducts ?? [],
    recentEvents: recentEvents ?? [],
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      label: "Total Produk",
      value: stats.totalProducts,
      sub: `${stats.activeProducts} aktif`,
      icon: "🛍️",
      color: "stat-purple",
      href: "/admin/produk",
    },
    {
      label: "Produk Featured",
      value: stats.featuredProducts,
      sub: "ditampilkan di Beranda",
      icon: "⭐",
      color: "stat-amber",
      href: "/admin/produk",
    },
    {
      label: "Total Event",
      value: stats.totalEvents,
      sub: `${stats.activeEvents} aktif`,
      icon: "📅",
      color: "stat-rose",
      href: "/admin/event",
    },
    {
      label: "Event Aktif",
      value: stats.activeEvents,
      sub: "sedang berjalan",
      icon: "✅",
      color: "stat-green",
      href: "/admin/event",
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Selamat datang kembali di Kumoart Admin
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-grid">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`stat-card ${card.color}`}
          >
            <div className="stat-card-icon">{card.icon}</div>
            <div className="stat-card-body">
              <div className="stat-card-value">{card.value}</div>
              <div className="stat-card-label">{card.label}</div>
              <div className="stat-card-sub">{card.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Content */}
      <div className="recent-grid">
        {/* Recent Products */}
        <div className="recent-card">
          <div className="recent-card-header">
            <h2 className="recent-card-title">🛍️ Produk Terbaru</h2>
            <Link href="/admin/produk" className="recent-card-link">
              Lihat Semua →
            </Link>
          </div>
          <div className="recent-list">
            {stats.recentProducts.length === 0 ? (
              <p className="recent-empty">Belum ada produk</p>
            ) : (
              stats.recentProducts.map(
                (product: {
                  id: string;
                  name: string;
                  category: string | null;
                  price: number;
                  is_active: boolean;
                  created_at: string;
                }) => (
                  <Link
                    key={product.id}
                    href={`/admin/produk/${product.id}/edit`}
                    className="recent-item"
                  >
                    <div className="recent-item-info">
                      <span className="recent-item-name">{product.name}</span>
                      <span className="recent-item-meta">
                        {product.category ?? "—"}
                      </span>
                    </div>
                    <div className="recent-item-right">
                      <span className="recent-item-price">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(product.price)}
                      </span>
                      <span
                        className={`badge ${product.is_active ? "badge-green" : "badge-gray"}`}
                      >
                        {product.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </div>
                  </Link>
                ),
              )
            )}
          </div>
          <Link href="/admin/produk/baru" className="btn-add-new">
            + Tambah Produk Baru
          </Link>
        </div>

        {/* Recent Events */}
        <div className="recent-card">
          <div className="recent-card-header">
            <h2 className="recent-card-title">📅 Event Terbaru</h2>
            <Link href="/admin/event" className="recent-card-link">
              Lihat Semua →
            </Link>
          </div>
          <div className="recent-list">
            {stats.recentEvents.length === 0 ? (
              <p className="recent-empty">Belum ada event</p>
            ) : (
              stats.recentEvents.map(
                (event: {
                  id: string;
                  title: string;
                  start_date: string;
                  is_active: boolean;
                  created_at: string;
                }) => (
                  <Link
                    key={event.id}
                    href={`/admin/event/${event.id}/edit`}
                    className="recent-item"
                  >
                    <div className="recent-item-info">
                      <span className="recent-item-name">{event.title}</span>
                      <span className="recent-item-meta">
                        {new Date(
                          event.start_date + "T00:00:00",
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span
                      className={`badge ${event.is_active ? "badge-green" : "badge-gray"}`}
                    >
                      {event.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </Link>
                ),
              )
            )}
          </div>
          <Link href="/admin/event/baru" className="btn-add-new">
            + Tambah Event Baru
          </Link>
        </div>
      </div>
    </div>
  );
}
