import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import EventDetail from '@/components/Event/EventDetail';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import {
  getEventBySlug,
  getAllEventSlugs,
  formatDateRange,
} from '@/lib/events';
import { config } from '@/lib/config';
import { translations } from '@/lib/language';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for SSG
export async function generateStaticParams() {
  const slugs = getAllEventSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Tidak Ditemukan',
      description: 'Event yang Anda cari tidak tersedia.',
    };
  }

  const dateRange = formatDateRange(event.startDate, event.endDate);
  const title = event.title;
  const description = `${event.description} Tanggal: ${dateRange}.${event.discount ? ` Diskon ${event.discount}%!` : ''} Info lebih lanjut via WhatsApp.`;
  const eventUrl = `${config.site.url}/event/${event.slug}`;

  return {
    title,
    description,
    
    // Keywords spesifik event
    keywords: [
      event.title.toLowerCase(),
      'event',
      'promo',
      event.discount ? 'diskon' : '',
      'workshop',
      'bazaar',
      config.brand.name.toLowerCase(),
    ].filter(Boolean),
    
    // Canonical URL
    alternates: {
      canonical: `/event/${event.slug}`,
    },
    
    // Open Graph
    openGraph: {
      type: 'website',
      title: `${event.title} | ${config.brand.name}`,
      description,
      url: eventUrl,
      siteName: config.brand.fullName,
      images: [
        {
          url: event.image,
          width: 800,
          height: 600,
          alt: event.title,
        },
      ],
      locale: 'id_ID',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description,
      images: [event.image],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // JSON-LD Schema untuk Event
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    image: `${config.site.url}${event.image}`,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: event.isActive 
      ? 'https://schema.org/EventScheduled' 
      : 'https://schema.org/EventCancelled',
    eventAttendanceMode: event.location 
      ? 'https://schema.org/OfflineEventAttendanceMode'
      : 'https://schema.org/OnlineEventAttendanceMode',
    location: event.location ? {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Indonesia',
      },
    } : undefined,
    organizer: {
      '@type': 'Organization',
      name: config.brand.fullName,
      url: config.site.url,
    },
    offers: event.price !== undefined ? {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'IDR',
      availability: event.isActive 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/SoldOut',
    } : undefined,
  };

  return (
    <>
      {/* JSON-LD Schema untuk Event */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs with Translation Support */}
          <Breadcrumbs 
            items={[
              { label: translations.id['breadcrumb.events'], href: '/event' },
              { label: event.title }
            ]} 
          />

          {/* Event Detail Client Component */}
          <EventDetail event={event} />

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/event"
              className="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold transition-colors uppercase tracking-wider text-sm"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              KEMBALI KE DAFTAR EVENT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
