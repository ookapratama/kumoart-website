"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau password salah. Coba lagi.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && (
        <div className="login-error">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@kumoart.id"
          className="form-input"
          required
          autoComplete="email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-with-action">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="form-input"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            className="input-action-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <button type="submit" className="btn-login" disabled={loading}>
        {loading ? (
          <span className="btn-loading">
            <span className="spinner" />
            Masuk...
          </span>
        ) : (
          "Masuk ke Admin Panel"
        )}
      </button>
    </form>
  );
}
