import EventPageContent from "@/components/Event/EventPageContent";
import { getAllEventsServer, getActiveEventsServer } from "@/lib/events.server";

export default function EventPage() {
  const activeEvents = getActiveEventsServer();
  const allEvents = getAllEventsServer();
  const inactiveEvents = allEvents.filter((event) => !event.isActive);

  return (
    <EventPageContent
      activeEvents={activeEvents}
      inactiveEvents={inactiveEvents}
    />
  );
}
