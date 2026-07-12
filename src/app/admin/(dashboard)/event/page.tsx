import Link from "next/link";
import DeleteAction from "@/components/admin/shared/delete-action";
import { deleteEvent } from "@/lib/actions/events";
import { getAllEventsAdmin } from "@/lib/events.server";
import { formatEventPrice } from "@/lib/events";

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manajemen Event — Admin Kumoart" };

export default async function AdminEventPage() {
  const events = await getAllEventsAdmin();

  return (
    <div className="list-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Event</h1>
          <p className="page-subtitle">{events.length} event terdaftar</p>
        </div>
        <Link href="/admin/event/baru" className="btn-primary">
          + Tambah Event
        </Link>
      </div>

      <div className="table-card">
        {events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <p>Belum ada event. Tambahkan event pertama!</p>
            <Link href="/admin/event/baru" className="btn-primary">
              + Tambah Event
            </Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Judul Event</th>
                  <th>Tanggal</th>
                  <th>Lokasi</th>
                  <th>Harga</th>
                  <th>Kuota</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td data-label="Gambar">
                      <div className="table-img">
                        {event.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="table-img-img"
                          />
                        ) : (
                          <div className="table-img-placeholder">📅</div>
                        )}
                      </div>
                    </td>
                    <td data-label="Judul Event">
                      <div className="table-name">{event.title}</div>
                      <div className="table-slug">/{event.slug}</div>
                    </td>
                    <td data-label="Tanggal" className="table-meta">
                      <div>
                        {new Date(
                          event.start_date + "T00:00:00",
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      {event.start_date !== event.end_date && (
                        <div className="table-meta-small">
                          s/d{" "}
                          {new Date(
                            event.end_date + "T00:00:00",
                          ).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      )}
                    </td>
                    <td data-label="Lokasi">{event.location ?? "—"}</td>
                    <td data-label="Harga" className="table-price">
                      {formatEventPrice(event.price)}
                    </td>
                    <td data-label="Kuota" className="table-center">
                      {event.quota ?? "∞"}
                    </td>
                    <td data-label="Status">
                      <span
                        className={`badge ${event.is_active ? "badge-green" : "badge-gray"}`}
                      >
                        {event.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td data-label="Aksi">
                      <DeleteAction
                        id={event.id}
                        name={event.title}
                        editHref={`/admin/event/${event.id}/edit`}
                        action={deleteEvent}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
