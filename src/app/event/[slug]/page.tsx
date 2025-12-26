import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import WhatsAppButton from '@/components/CTA/WhatsAppButton';
import {
  getEventBySlug,
  getAllEventSlugs,
  formatDateRange,
  formatEventPrice,
} from '@/lib/events';
import { config } from '@/lib/config';

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
    offers: event.price ? {
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
          {/* Breadcrumb dengan Schema */}
          <nav 
            className="flex items-center text-sm text-gray-500 mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" className="hover:text-rose-600 transition-colors" itemProp="item">
                  <span itemProp="name">Beranda</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <span className="mx-2">/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/event" className="hover:text-rose-600 transition-colors" itemProp="item">
                  <span itemProp="name">Event</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <span className="mx-2">/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-gray-900 font-medium line-clamp-1" itemProp="name">
                  {event.title}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* Event Card */}
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Event Image */}
            <div className="relative h-64 md:h-80 bg-gray-50">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                {event.isActive ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-900 text-white">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                    Sedang Berlangsung
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-500 text-white">
                    Selesai
                  </span>
                )}
              </div>
              {/* Discount Badge */}
              {event.discount && (
                <span className="absolute top-4 right-4 bg-rose-600 text-white text-lg font-bold px-4 py-2 rounded-full">
                  🎉 Diskon {event.discount}%
                </span>
              )}
            </div>

            {/* Event Content */}
            <div className="p-6 md:p-8">
              {/* Date */}
              <div className="flex items-center gap-2 text-rose-600 mb-4">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={event.startDate} className="font-medium">
                  {formatDateRange(event.startDate, event.endDate)}
                </time>
              </div>

              {/* H1 Title - SEO Important */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {event.location && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <svg
                      className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-500">Lokasi</span>
                      <p className="font-medium text-gray-900">{event.location}</p>
                    </div>
                  </div>
                )}

                {event.price && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <svg
                      className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-500">Harga</span>
                      <p className="font-medium text-gray-900">
                        {formatEventPrice(event.price)}
                      </p>
                    </div>
                  </div>
                )}

                {event.quota && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <svg
                      className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-500">Kuota</span>
                      <p className="font-medium text-gray-900">
                        {event.quota} Peserta
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              {event.terms && event.terms.length > 0 && (
                <section className="mb-8" aria-labelledby="terms-heading">
                  <h2 id="terms-heading" className="text-lg font-semibold text-gray-900 mb-3">
                    Syarat &amp; Ketentuan
                  </h2>
                  <ul className="space-y-2">
                    {event.terms.map((term, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <svg
                          className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {term}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* CTA */}
              {event.isActive && (
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-gray-500 mb-4 text-center">
                    Tertarik dengan event ini? Hubungi kami untuk informasi lebih lanjut
                  </p>
                  <div className="flex justify-center">
                    <WhatsAppButton
                      eventTitle={event.title}
                      fullWidth
                      className="max-w-md"
                    />
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/event"
              className="inline-flex items-center text-rose-600 hover:text-rose-700 font-medium transition-colors"
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
              Kembali ke Daftar Event
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
