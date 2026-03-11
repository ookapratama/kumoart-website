import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import EventActions from "@/components/admin/EventActions";

export const metadata: Metadata = { title: "Manajemen Event — Admin Kumoart" };

export default async function AdminEventPage() {
  const supabase = await createClient();
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    return <div className="error-state">Gagal memuat data event.</div>;
  }

  return (
    <div className="list-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Event</h1>
          <p className="page-subtitle">{events?.length ?? 0} event terdaftar</p>
        </div>
        <Link href="/admin/event/baru" className="btn-primary">
          + Tambah Event
        </Link>
      </div>

      <div className="table-card">
        {!events || events.length === 0 ? (
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
                    <td>
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
                    <td>
                      <div className="table-name">{event.title}</div>
                      <div className="table-slug">/{event.slug}</div>
                    </td>
                    <td className="table-meta">
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
                    <td>{event.location ?? "—"}</td>
                    <td className="table-price">
                      {event.price === 0
                        ? "Gratis"
                        : new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(event.price)}
                    </td>
                    <td className="table-center">{event.quota ?? "∞"}</td>
                    <td>
                      <span
                        className={`badge ${event.is_active ? "badge-green" : "badge-gray"}`}
                      >
                        {event.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td>
                      <EventActions
                        eventId={event.id}
                        eventTitle={event.title}
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
