"use client";

import { useState } from "react";

import ImagePicker from "./shared/image-picker";
import { useEntityForm } from "./shared/use-entity-form";
import { saveEvent } from "@/lib/actions/events";

import type { FormMode } from "./shared/use-entity-form";
import type { Event } from "@/lib/events";

interface EventFormProps {
  mode: FormMode;
  event?: Event;
}

export default function EventForm({ mode, event }: EventFormProps) {
  const {
    form,
    handleChange,
    handleSlugSourceChange,
    handleSlugChange,
    imageFile,
    setImageFile,
    loading,
    error,
    setError,
    submit,
    cancel,
  } = useEntityForm({
    initial: {
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
    },
    mode,
    listPath: "/admin/event",
    action: saveEvent,
  });

  const [terms, setTerms] = useState<string[]>(
    event?.terms?.length ? event.terms : [""],
  );

  const handleTermChange = (idx: number, value: string) => {
    setTerms((prev) => prev.map((t, i) => (i === idx ? value : t)));
  };

  const addTerm = () => setTerms((prev) => [...prev, ""]);
  const removeTerm = (idx: number) =>
    setTerms((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.end_date && form.end_date < form.start_date) {
      setError("Tanggal selesai tidak boleh sebelum tanggal mulai.");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("slug", form.slug);
    fd.append("description", form.description);
    fd.append("start_date", form.start_date);
    fd.append("end_date", form.end_date);
    fd.append("location", form.location);
    fd.append("price", form.price);
    fd.append("discount", form.discount);
    fd.append("quota", form.quota);
    fd.append("is_active", String(form.is_active));
    fd.append("content", form.content);
    terms.forEach((term) => fd.append("terms", term));

    if (mode === "edit" && event) {
      fd.append("id", event.id);
      fd.append("existingImageUrl", event.image_url ?? "");
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
            <h3 className="form-card-title">Gambar Event</h3>
            <ImagePicker
              currentUrl={event?.image_url}
              onSelect={setImageFile}
            />
            {(imageFile || event?.image_url) && (
              <p className="form-hint">✅ Gambar terpilih</p>
            )}
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
                name="title"
                value={form.title}
                onChange={handleSlugSourceChange("title")}
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
                  onChange={handleSlugChange}
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
              ? "Simpan Event"
              : "Update Event"}
        </button>
      </div>
    </form>
  );
}
