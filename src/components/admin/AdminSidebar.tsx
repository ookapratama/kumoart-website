"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/produk", label: "Produk", icon: "🛍️", exact: false },
  { href: "/admin/event", label: "Event", icon: "📅", exact: false },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="flex items-center gap-2">
          <span className="sidebar-brand-icon">🧶</span>
          <div>
            <div className="sidebar-brand-name">Kumoart</div>
            <div className="sidebar-brand-label">Admin Panel</div>
          </div>
        </div>
        <button className="sidebar-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-group">
          <div className="sidebar-nav-group-label">MENU</div>
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="sidebar-nav-group">
          <div className="sidebar-nav-group-label">LAINNYA</div>
          <Link href="/" target="_blank" className="sidebar-nav-item">
            <span className="sidebar-nav-icon">🌐</span>
            <span>Lihat Website</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-text">
          &copy; {new Date().getFullYear()} Kumoart
        </div>
      </div>
    </aside>
  );
}
