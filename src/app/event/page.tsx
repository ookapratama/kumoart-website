import { Metadata } from 'next';
import EventList from '@/components/Event/EventList';
import { getActiveEvents, getAllEvents } from '@/lib/events';

export const metadata: Metadata = {
  title: 'Event & Promo',
  description:
    'Ikuti berbagai event menarik dan dapatkan promo spesial dari Kumoart',
};

export default function EventPage() {
  const activeEvents = getActiveEvents();
  const allEvents = getAllEvents();
  const inactiveEvents = allEvents.filter((event) => !event.isActive);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Event &amp; Promo
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Jangan lewatkan berbagai event menarik dan promo spesial dari Kumoart
          </p>
        </div>

        {/* Active Events */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Event Aktif</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              {activeEvents.length} Event
            </span>
          </div>
          <EventList events={activeEvents} />
        </section>

        {/* Past/Inactive Events */}
        {inactiveEvents.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Event Selesai
            </h2>
            <div className="opacity-60">
              <EventList events={inactiveEvents} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
