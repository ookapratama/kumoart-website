import { getEventById } from "@/lib/events.server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import EventForm from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "Edit Event — Admin Kumoart" };

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link href="/admin/event">Event</Link>
            <span>/</span>
            <span>Edit</span>
          </div>
          <h1 className="page-title">Edit Event</h1>
          <p className="page-subtitle">{event.title}</p>
        </div>
      </div>
      <EventForm mode="edit" event={event} />
    </div>
  );
}
