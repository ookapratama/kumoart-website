export interface AdminNavItem {
  href: string;
  label: string;
  icon: string;
  exact: boolean;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/produk", label: "Produk", icon: "🛍️", exact: false },
  { href: "/admin/event", label: "Event", icon: "📅", exact: false },
];
