'use client';

import Image from 'next/image';
import WhatsAppButton from '@/components/CTA/WhatsAppButton';
import { Event, formatDateRange, formatEventPrice } from '@/lib/events';
import { useLanguage } from '@/lib/language';

interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  const { t } = useLanguage();

  return (
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
              {t('events.ongoing')}
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-500 text-white">
              {t('events.ended')}
            </span>
          )}
        </div>
        {/* Discount Badge */}
        {event.discount && (
          <span className="absolute top-4 right-4 bg-rose-600 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
            🎉 {t('events.discount')} {event.discount}%
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
          <time className="font-medium">
            {formatDateRange(event.startDate, event.endDate)}
          </time>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
          {event.title}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Event Details Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {event.location && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
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
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-0.5">
                  {t('events.location')}
                </span>
                <p className="font-semibold text-gray-900">{event.location}</p>
              </div>
            </div>
          )}

          {event.price !== undefined && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
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
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-0.5">
                  {t('events.price')}
                </span>
                <p className="font-semibold text-gray-900">
                  {formatEventPrice(event.price)}
                </p>
              </div>
            </div>
          )}

          {event.quota && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
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
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-0.5">
                  {t('events.quota')}
                </span>
                <p className="font-semibold text-gray-900">
                  {event.quota} {t('events.participants')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Terms & Conditions */}
        {event.terms && event.terms.length > 0 && (
          <section className="mb-8" aria-labelledby="terms-heading">
            <h2 id="terms-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('events.terms')}
            </h2>
            <ul className="space-y-3">
              {event.terms.map((term, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-600 leading-relaxed"
                >
                  <span className="text-rose-500 font-bold mt-0.5">•</span>
                  {term}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        {event.isActive && (
          <div className="border-t border-gray-100 pt-8 mt-4 text-center">
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {t('events.interested')}
            </p>
            <div className="flex justify-center">
              <WhatsAppButton
                eventTitle={event.title}
                fullWidth
                size="lg"
                className="max-w-md shadow-xl shadow-emerald-200/50"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
