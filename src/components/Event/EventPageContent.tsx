"use client";

import EventList from "@/components/Event/EventList";
import { Event } from "@/lib/events";
import { config } from "@/lib/config";
import { useLanguage } from "@/lib/language";
import Link from "next/link";

interface EventPageContentProps {
  activeEvents: Event[];
  inactiveEvents: Event[];
}

export default function EventPageContent({
  activeEvents,
  inactiveEvents,
}: EventPageContentProps) {
  const { t, language } = useLanguage();

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <span className="text-rose-600 font-semibold uppercase tracking-wide text-sm">
            {t("events.subtitle")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            {t("events.title")}
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            {t("events.description")}
          </p>
        </header>

        <section className="mb-16" aria-labelledby="active-events-heading">
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-8">
            <h2
              id="active-events-heading"
              className="text-xl md:text-2xl font-black text-gray-900 tracking-tight"
            >
              {t("events.active")}
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-widest shadow-sm">
              <span
                className="w-2 h-2 bg-rose-500 rounded-full mr-2 animate-pulse"
                aria-hidden="true"
              ></span>
              {activeEvents.length} {t("nav.events")}
            </span>
          </div>

          {activeEvents.length > 0 ? (
            <EventList events={activeEvents} />
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <span className="text-4xl mb-4 block" aria-hidden="true">
                📅
              </span>
              <p className="text-gray-500">{t("empty.no_events")}</p>
            </div>
          )}
        </section>

        {inactiveEvents.length > 0 && (
          <section aria-labelledby="past-events-heading">
            <h2
              id="past-events-heading"
              className="text-xl md:text-2xl font-black text-gray-900 mb-6 tracking-tight"
            >
              {t("events.finished")}
            </h2>
            <div className="opacity-60">
              <EventList events={inactiveEvents} />
            </div>
          </section>
        )}

        <section className="mt-16 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {language === "id"
              ? `Tentang Event ${config.brand.name}`
              : `About ${config.brand.name} Events`}
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600">
            {language === "id" ? (
              <>
                <p>Kami secara rutin mengadakan berbagai event menarik...</p>
                {/* ... sisa konten SEO ... */}
              </>
            ) : (
              <>
                <p>We regularly organize various interesting events...</p>
                {/* ... sisa konten SEO ... */}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
