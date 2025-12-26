'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Event, formatDateRange, formatEventPrice } from '@/lib/events';
import { useLanguage } from '@/lib/language';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { t } = useLanguage();
  
  return (
    <Link
      href={`/event/${event.slug}`}
      className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full ${
        !event.isActive ? 'opacity-75 grayscale-[0.5]' : ''
      }`}
    >
      {/* Event Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-50 flex-shrink-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {event.isActive ? (
            <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              {t('events.ongoing')}
            </span>
          ) : (
            <span className="bg-gray-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
              {t('events.ended')}
            </span>
          )}
        </div>

        {/* Price Badge on Image for prominence */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-gray-900 shadow-lg border border-white/20">
            {formatEventPrice(event.price)}
          </span>
        </div>
      </div>

      {/* Event Info */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-3 mb-3">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-rose-600">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time className="text-[10px] font-black uppercase tracking-widest leading-none">
              {formatDateRange(event.startDate, event.endDate)}
            </time>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-1.5 text-gray-500">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none truncate max-w-[150px]">
                {event.location}
              </span>
            </div>
          )}
        </div>

        <h3 className="text-gray-900 font-black text-lg mb-2 group-hover:text-rose-600 transition-colors leading-tight line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-500 text-xs mb-6 line-clamp-2 leading-relaxed font-medium">
          {event.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
           {/* Details link style button at the bottom */}
          <div className="w-full text-center py-2.5 bg-rose-50 text-rose-600 font-black rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all text-[10px] uppercase tracking-[0.2em] border border-rose-100/50">
            {t('cta.details')}
          </div>
        </div>
      </div>
    </Link>
  );
}
