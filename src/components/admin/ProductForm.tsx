"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/products";
import ImageUploader from "./ImageUploader";

const CATEGORIES = [
  "Tas",
  "Aksesoris",
  "Boneka",
  "Home Decor",
  "Pakaian",
  "Lainnya",
];

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    category: product?.category ?? "",
    stock: product?.stock?.toString() ?? "0",
    is_featured: product?.is_featured ?? false,
    is_active: product?.is_active ?? true,
    content: product?.content ?? "",
  });

  const [imageUrl, setImageUrl] = useState<string>(product?.image_url ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugManual, setSlugManual] = useState(mode === "edit");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((prev) => ({
      ...prev,
      name,
      ...(slugManual ? {} : { slug: generateSlug(name) }),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.name || !form.slug || !form.price) {
      setError("Nama, slug, dan harga wajib diisi.");
      setLoading(false);
      return;
    }

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      price: parseInt(form.price) || 0,
      category: form.category || null,
      stock: parseInt(form.stock) || 0,
      is_featured: form.is_featured,
      is_active: form.is_active,
      content: form.content || null,
      image_url: imageUrl || null,
    };

    let error;
    if (mode === "create") {
      ({ error } = await supabase.from("products").insert(payload));
    } else {
      ({ error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", product!.id));
    }

    if (error) {
      if (error.code === "23505") {
        setError("Slug sudah digunakan. Gunakan slug yang berbeda.");
      } else {
        setError(`Gagal menyimpan: ${error.message}`);
      }
      setLoading(false);
      return;
    }

    router.push("/admin/produk");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && <div className="form-error">⚠️ {error}</div>}

      <div className="form-grid-2">
        {/* Kolom Kiri */}
        <div className="form-col">
          {/* Gambar */}
          <div className="form-card">
            <h3 className="form-card-title">Gambar Produk</h3>
            <ImageUploader
              bucket="product-images"
              currentUrl={product?.image_url}
              onUpload={setImageUrl}
              label=""
            />
            {imageUrl && <p className="form-hint">✅ Gambar terpilih</p>}
          </div>

          {/* Status */}
          <div className="form-card">
            <h3 className="form-card-title">Status & Visibilitas</h3>
            <div className="toggle-group">
              <label className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Produk Aktif</span>
                  <span className="toggle-desc">
                    Tampilkan di halaman produk
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  className="toggle-checkbox"
                />
              </label>
              <label className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Produk Featured ⭐</span>
                  <span className="toggle-desc">
                    Tampilkan di bagian unggulan beranda
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleChange}
                  className="toggle-checkbox"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="form-col">
          <div className="form-card">
            <h3 className="form-card-title">Informasi Produk</h3>

            {/* Nama */}
            <div className="form-group">
              <label className="form-label">Nama Produk *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleNameChange}
                placeholder="Contoh: Tas Rajut Macrame Premium"
                className="form-input"
                required
              />
            </div>

            {/* Slug */}
            <div className="form-group">
              <label className="form-label">Slug URL *</label>
              <div className="input-with-prefix">
                <span className="input-prefix">/produk/</span>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    handleChange(e);
                  }}
                  placeholder="tas-rajut-macrame-premium"
                  className="form-input prefix-input"
                  required
                />
              </div>
              <p className="form-hint">
                Auto-generate dari nama produk, atau edit manual
              </p>
            </div>

            {/* Deskripsi */}
            <div className="form-group">
              <label className="form-label">Deskripsi</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Deskripsi singkat produk..."
                className="form-textarea"
                rows={3}
              />
            </div>

            {/* Harga & Stok */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Harga (Rp) *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="185000"
                  className="form-input"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stok</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="form-input"
                  min="0"
                />
              </div>
            </div>

            {/* Kategori */}
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Pilih kategori...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Konten tambahan */}
            <div className="form-group">
              <label className="form-label">Deskripsi Lengkap (opsional)</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Deskripsi lengkap, spesifikasi, cara perawatan..."
                className="form-textarea"
                rows={5}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button
          type="button"
          onClick={() => router.push("/admin/produk")}
          className="btn-secondary"
          disabled={loading}
        >
          Batal
        </button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading
            ? "Menyimpan..."
            : mode === "create"
              ? "Simpan Produk"
              : "Update Produk"}
        </button>
      </div>
    </form>
  );
}
