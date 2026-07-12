"use client";

import { useState } from "react";

import ImagePicker from "./shared/image-picker";
import GalleryPicker from "./shared/gallery-picker";
import { useEntityForm } from "./shared/use-entity-form";
import { saveProduct } from "@/lib/actions/products";
import { MAX_GALLERY_IMAGES } from "@/lib/products";

import type { FormMode } from "./shared/use-entity-form";
import type { Product } from "@/lib/products";

const CATEGORIES = [
  "Tas",
  "Aksesoris",
  "Boneka",
  "Home Decor",
  "Pakaian",
  "Lainnya",
];

interface ProductFormProps {
  mode: FormMode;
  product?: Product;
}

export default function ProductForm({ mode, product }: ProductFormProps) {
  const {
    form,
    handleChange,
    handleSlugSourceChange,
    handleSlugChange,
    imageFile,
    setImageFile,
    loading,
    error,
    submit,
    cancel,
  } = useEntityForm({
    initial: {
      name: product?.name ?? "",
      slug: product?.slug ?? "",
      description: product?.description ?? "",
      price: product?.price?.toString() ?? "",
      category: product?.category ?? "",
      stock: product?.stock?.toString() ?? "0",
      is_featured: product?.is_featured ?? false,
      is_active: product?.is_active ?? true,
      content: product?.content ?? "",
    },
    mode,
    listPath: "/admin/produk",
    action: saveProduct,
  });

  const [galleryKeepUrls, setGalleryKeepUrls] = useState<string[]>(
    product?.gallery_images ?? [],
  );
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("slug", form.slug);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("stock", form.stock);
    fd.append("is_featured", String(form.is_featured));
    fd.append("is_active", String(form.is_active));
    fd.append("content", form.content);
    galleryKeepUrls.forEach((url) => fd.append("galleryKeep", url));
    galleryFiles.forEach((file) => fd.append("galleryFiles", file));

    if (mode === "edit" && product) {
      fd.append("id", product.id);
      fd.append("existingImageUrl", product.image_url ?? "");
    }

    submit(fd);
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
            <ImagePicker
              currentUrl={product?.image_url}
              onSelect={setImageFile}
            />
            {(imageFile || product?.image_url) && (
              <p className="form-hint">✅ Gambar terpilih</p>
            )}
          </div>

          {/* Galeri */}
          <div className="form-card">
            <h3 className="form-card-title">Galeri Tambahan (Opsional)</h3>
            <GalleryPicker
              keepUrls={galleryKeepUrls}
              onRemoveExisting={(url) =>
                setGalleryKeepUrls((prev) => prev.filter((u) => u !== url))
              }
              newFiles={galleryFiles}
              onAddFiles={(files) =>
                setGalleryFiles((prev) => [...prev, ...files])
              }
              onRemoveNewFile={(index) =>
                setGalleryFiles((prev) => prev.filter((_, i) => i !== index))
              }
              max={MAX_GALLERY_IMAGES}
            />
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
                onChange={handleSlugSourceChange("name")}
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
                  onChange={handleSlugChange}
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
          onClick={cancel}
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
