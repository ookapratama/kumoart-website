import EventCard from "./EventCard";
import EmptyState from "@/components/shared/empty-state";

import type { Event } from "@/lib/events";

const EMPTY_ICON =
  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z";

interface EventListProps {
  events: Event[];
  title?: string;
}

export default function EventList({ events, title }: EventListProps) {
  if (events.length === 0) {
    return (
      <EmptyState
        iconPath={EMPTY_ICON}
        titleKey="empty.no_events"
        subtitleKey="empty.events_hint"
      />
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
