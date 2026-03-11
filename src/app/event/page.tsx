import EventPageContent from "@/components/Event/EventPageContent";
import { getAllEvents } from "@/lib/events.server";

export default async function EventPage() {
  const allEvents = await getAllEvents();

  const activeEvents = allEvents.filter((event) => event.is_active);
  const inactiveEvents = allEvents.filter((event) => !event.is_active);

  return (
    <EventPageContent
      activeEvents={activeEvents}
      inactiveEvents={inactiveEvents}
    />
  );
}
