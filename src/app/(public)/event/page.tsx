import EventPageContent from "@/components/Event/EventPageContent";
import { getAllEvents } from "@/lib/events.server";

export const revalidate = 3600;

export default async function EventPage() {
  const allEvents = await getAllEvents();

  // Event "selesai" ditentukan dari tanggal, bukan is_active —
  // row non-aktif memang disembunyikan dari publik oleh RLS.
  const today = new Date().toISOString().slice(0, 10);
  const currentEvents = allEvents.filter((event) => event.end_date >= today);
  const pastEvents = allEvents.filter((event) => event.end_date < today);

  return (
    <EventPageContent currentEvents={currentEvents} pastEvents={pastEvents} />
  );
}
