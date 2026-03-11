"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Event } from "@/lib/events";
import ImageUploader from "./ImageUploader";

interface EventFormProps {
  mode: "create" | "edit";
  event?: Event;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function EventForm({ mode, event }: EventFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    title: event?.title ?? "",
    slug: event?.slug ?? "",
    description: event?.description ?? "",
    start_date: event?.start_date ?? "",
    end_date: event?.end_date ?? "",
    location: event?.location ?? "",
    price: event?.price?.toString() ?? "0",
    discount: event?.discount?.toString() ?? "",
    quota: event?.quota?.toString() ?? "",
    is_active: event?.is_active ?? true,
    content: event?.content ?? "",
  });

  const [terms, setTerms] = useState<string[]>(event?.terms ?? [""]);
  const [imageUrl, setImageUrl] = useState<string>(event?.image_url ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugManual, setSlugManual] = useState(mode === "edit");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      ...(slugManual ? {} : { slug: generateSlug(title) }),
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

  const handleTermChange = (idx: number, value: string) => {
    setTerms((prev) => prev.map((t, i) => (i === idx ? value : t)));
  };

  const addTerm = () => setTerms((prev) => [...prev, ""]);
  const removeTerm = (idx: number) =>
    setTerms((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.title || !form.slug || !form.start_date || !form.end_date) {
      setError("Judul, slug, dan tanggal wajib diisi.");
      setLoading(false);
      return;
    }

    const filteredTerms = terms.filter((t) => t.trim() !== "");

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description || null,
      start_date: form.start_date,
      end_date: form.end_date,
      location: form.location || null,
      price: parseInt(form.price) || 0,
      discount: form.discount ? parseInt(form.discount) : null,
      quota: form.quota ? parseInt(form.quota) : null,
      is_active: form.is_active,
      terms: filteredTerms,
      content: form.content || null,
      image_url: imageUrl || null,
    };

    let error;
    if (mode === "create") {
      ({ error } = await supabase.from("events").insert(payload));
    } else {
      ({ error } = await supabase
        .from("events")
        .update(payload)
        .eq("id", event!.id));
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

    router.push("/admin/event");
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
            <h3 className="form-card-title">Gambar Event</h3>
            <ImageUploader
              bucket="event-images"
              currentUrl={event?.image_url}
              onUpload={setImageUrl}
              label=""
            />
            {imageUrl && <p className="form-hint">✅ Gambar terpilih</p>}
          </div>

          {/* Status */}
          <div className="form-card">
            <h3 className="form-card-title">Status</h3>
            <label className="toggle-item">
              <div className="toggle-info">
                <span className="toggle-label">Event Aktif</span>
                <span className="toggle-desc">Tampilkan di halaman event</span>
              </div>
              <input
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
                className="toggle-checkbox"
              />
            </label>
          </div>

          {/* Terms & Conditions */}
          <div className="form-card">
            <h3 className="form-card-title">Syarat & Ketentuan</h3>
            <div className="terms-list">
              {terms.map((term, idx) => (
                <div key={idx} className="terms-item">
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => handleTermChange(idx, e.target.value)}
                    placeholder={`Syarat ${idx + 1}...`}
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => removeTerm(idx)}
                    className="btn-icon-danger"
                    disabled={terms.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" onClick={addTerm} className="btn-add-term">
                + Tambah Syarat
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="form-col">
          <div className="form-card">
            <h3 className="form-card-title">Informasi Event</h3>

            {/* Judul */}
            <div className="form-group">
              <label className="form-label">Judul Event *</label>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="Contoh: Workshop Amigurumi Pemula"
                className="form-input"
                required
              />
            </div>

            {/* Slug */}
            <div className="form-group">
              <label className="form-label">Slug URL *</label>
              <div className="input-with-prefix">
                <span className="input-prefix">/event/</span>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    handleChange(e);
                  }}
                  placeholder="workshop-amigurumi-pemula"
                  className="form-input prefix-input"
                  required
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="form-group">
              <label className="form-label">Deskripsi</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Deskripsi singkat event..."
                className="form-textarea"
                rows={3}
              />
            </div>

            {/* Tanggal */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Tanggal Mulai *</label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal Selesai *</label>
                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  min={form.start_date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Lokasi */}
            <div className="form-group">
              <label className="form-label">Lokasi</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Contoh: Online via Zoom, atau nama tempat"
                className="form-input"
              />
            </div>

            {/* Harga, Diskon, Kuota */}
            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label">Harga (Rp)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0 = Gratis"
                  className="form-input"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Diskon (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  placeholder="—"
                  className="form-input"
                  min="0"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Kuota</label>
                <input
                  type="number"
                  name="quota"
                  value={form.quota}
                  onChange={handleChange}
                  placeholder="∞"
                  className="form-input"
                  min="0"
                />
              </div>
            </div>

            {/* Konten */}
            <div className="form-group">
              <label className="form-label">Deskripsi Lengkap (opsional)</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Detail event, jadwal, rundown..."
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
          onClick={() => router.push("/admin/event")}
          className="btn-secondary"
          disabled={loading}
        >
          Batal
        </button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading
            ? "Menyimpan..."
            : mode === "create"
              ? "Simpan Event"
              : "Update Event"}
        </button>
      </div>
    </form>
  );
}
