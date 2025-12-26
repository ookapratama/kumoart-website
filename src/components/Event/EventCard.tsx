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
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full ${
        !event.isActive ? 'opacity-75 grayscale-[0.5]' : ''
      }`}
    >
      {/* Event Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {event.isActive ? (
            <span className="bg-gray-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-white/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              {t('events.ongoing')}
            </span>
          ) : (
            <span className="bg-gray-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {t('events.ended')}
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {event.discount && event.isActive && (
          <div className="absolute top-3 right-3">
            <span className="bg-rose-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg transform rotate-3">
              -{event.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Event Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Date */}
        <div className="flex items-center gap-2 text-rose-600 mb-3">
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <time className="text-xs font-bold uppercase tracking-wider">
            {formatDateRange(event.startDate, event.endDate)}
          </time>
        </div>

        <h3 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-rose-600 transition-colors line-clamp-2 leading-tight">
          {event.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">
              {t('events.price')}
            </span>
            <span className="text-gray-900 font-black">
              {formatEventPrice(event.price)}
            </span>
          </div>
          
          <button className={`p-2 rounded-full transition-colors ${
            event.isActive 
              ? 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white' 
              : 'bg-gray-100 text-gray-400'
          }`}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
