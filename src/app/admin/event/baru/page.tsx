import type { Metadata } from "next";
import Link from "next/link";
import EventForm from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "Tambah Event — Admin Kumoart" };

export default function TambahEventPage() {
  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link href="/admin/event">Event</Link>
            <span>/</span>
            <span>Tambah Baru</span>
          </div>
          <h1 className="page-title">Tambah Event Baru</h1>
        </div>
      </div>
      <EventForm mode="create" />
    </div>
  );
}
