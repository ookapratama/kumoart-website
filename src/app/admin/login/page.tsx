import "../admin.css";
import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import ThemeToggle from "@/components/admin/ThemeToggle";
import ThemeScript from "@/components/shared/theme-script";

export const metadata: Metadata = {
  title: "Login Admin — Kumoart",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="login-page">
      <ThemeScript />
      <div className="login-bg-pattern" />
      <div
        style={{ position: "absolute", top: "24px", right: "24px", zIndex: 10 }}
      >
        <ThemeToggle />
      </div>
      <div className="login-container">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand-icon">🧶</div>
          <h1 className="login-brand-name">Kumoart</h1>
          <p className="login-brand-sub">Admin Panel</p>
        </div>

        {/* Form Card */}
        <div className="login-card">
          <div className="login-card-header">
            <h2>Selamat Datang</h2>
            <p>Masuk ke panel admin Kumoart</p>
          </div>
          <LoginForm />
        </div>

        <p className="login-footer">
          &copy; {new Date().getFullYear()} Kumoart. All rights reserved.
        </p>
      </div>
    </div>
  );
}
