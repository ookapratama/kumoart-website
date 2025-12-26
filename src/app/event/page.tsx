import { Metadata } from 'next';
import EventList from '@/components/Event/EventList';
import { getActiveEvents, getAllEvents } from '@/lib/events';
import { config } from '@/lib/config';

// Static metadata untuk halaman event
export const metadata: Metadata = {
  title: 'Event & Promo',
  description: `Workshop rajut, bazaar kerajinan tangan, dan promo spesial dari ${config.brand.name}. Ikuti event menarik dan dapatkan produk rajut handmade berkualitas dengan harga spesial!`,
  keywords: [
    'event',
    'promo',
    'workshop rajut',
    'bazaar kerajinan',
    'diskon',
    config.brand.name.toLowerCase(),
  ],
  alternates: {
    canonical: '/event',
  },
  openGraph: {
    title: `Event & Promo | ${config.brand.name}`,
    description: 'Workshop, bazaar, dan promo spesial untuk penggemar kerajinan tangan.',
    url: `${config.site.url}/event`,
    type: 'website',
  },
};

export default function EventPage() {
  const activeEvents = getActiveEvents();
  const allEvents = getAllEvents();
  const inactiveEvents = allEvents.filter((event) => !event.isActive);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header with H1 */}
        <header className="text-center mb-12">
          <span className="text-rose-600 font-semibold uppercase tracking-wide text-sm">
            Jangan Lewatkan
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Event &amp; Promo Kerajinan Rajut
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            <strong>Workshop merajut</strong>, <strong>bazaar kerajinan</strong>, dan 
            <strong> promo spesial</strong> untuk Anda pecinta produk handmade
          </p>
        </header>

        {/* Active Events */}
        <section className="mb-16" aria-labelledby="active-events-heading">
          <div className="flex items-center gap-3 mb-6">
            <h2 id="active-events-heading" className="text-2xl font-bold text-gray-900">
              Event Aktif
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-700">
              <span className="w-2 h-2 bg-rose-500 rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
              {activeEvents.length} Event
            </span>
          </div>
          
          {activeEvents.length > 0 ? (
            <EventList events={activeEvents} />
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <span className="text-4xl mb-4 block" aria-hidden="true">📅</span>
              <p className="text-gray-500">
                Belum ada event aktif saat ini. Pantau terus untuk event dan promo menarik!
              </p>
            </div>
          )}
        </section>

        {/* Past/Inactive Events */}
        {inactiveEvents.length > 0 && (
          <section aria-labelledby="past-events-heading">
            <h2 id="past-events-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Event Selesai
            </h2>
            <div className="opacity-60">
              <EventList events={inactiveEvents} />
            </div>
          </section>
        )}
        
        {/* SEO Content */}
        <section className="mt-16 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tentang Event {config.brand.name}
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600">
            <p>
              Kami secara rutin mengadakan berbagai event menarik untuk komunitas 
              pecinta kerajinan tangan dan produk handmade:
            </p>
            <ul className="mt-4 space-y-2">
              <li><strong>Workshop Rajut</strong> - Belajar teknik merajut dari dasar hingga mahir</li>
              <li><strong>Kelas Amigurumi</strong> - Cara membuat boneka rajut yang menggemaskan</li>
              <li><strong>Bazaar Kerajinan</strong> - Temui kami langsung dan dapatkan produk eksklusif</li>
              <li><strong>Promo Spesial</strong> - Diskon dan penawaran menarik di momen tertentu</li>
            </ul>
            <p className="mt-4">
              Ingin mendapatkan info event terbaru? Follow social media kami atau 
              hubungi via WhatsApp untuk stay updated!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
