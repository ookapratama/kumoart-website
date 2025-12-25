import Link from 'next/link';
import Image from 'next/image';
import { Event, formatDateRange, formatEventPrice } from '@/lib/events';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/event/${event.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
        {/* Event Image */}
        <div className="relative h-48 bg-gray-50 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {event.discount && (
            <span className="absolute top-2 right-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              🎉 Diskon {event.discount}%
            </span>
          )}
          {event.isActive && (
            <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Aktif
            </span>
          )}
        </div>

        {/* Event Info */}
        <div className="p-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <svg
              className="h-4 w-4 text-rose-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-rose-600 transition-colors line-clamp-2 mb-2">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {event.description}
          </p>

          {/* Price or Location */}
          <div className="flex items-center justify-between text-sm">
            {event.price && (
              <span className="text-gray-900 font-semibold">
                {formatEventPrice(event.price)}
              </span>
            )}
            {event.location && (
              <span className="text-gray-400 flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                <span className="truncate max-w-[150px]">{event.location}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
