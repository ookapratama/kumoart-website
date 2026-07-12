"use client";

import { useState, useMemo } from "react";
import EventList from "@/components/Event/EventList";
import Pagination from "@/components/Common/Pagination";
import { useLanguage } from "@/lib/language";

import type { Event } from "@/lib/events";

interface EventPageContentProps {
  currentEvents: Event[];
  pastEvents: Event[];
}

const ITEMS_PER_PAGE = 6;

export default function EventPageContent({
  currentEvents,
  pastEvents,
}: EventPageContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLanguage();

  const totalPages = Math.ceil(pastEvents.length / ITEMS_PER_PAGE);

  const paginatedPastEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return pastEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [pastEvents, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const pastEventsSection = document.getElementById("past-events-heading");
    if (pastEventsSection) {
      pastEventsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              {currentEvents.length} {t("nav.events")}
            </span>
          </div>

          {currentEvents.length > 0 ? (
            <EventList events={currentEvents} />
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <span className="text-4xl mb-4 block" aria-hidden="true">
                📅
              </span>
              <p className="text-gray-500">{t("empty.no_events")}</p>
            </div>
          )}
        </section>

        {pastEvents.length > 0 && (
          <section aria-labelledby="past-events-heading" className="mt-16">
            <h2
              id="past-events-heading"
              className="text-xl md:text-2xl font-black text-gray-900 mb-6 tracking-tight"
            >
              {t("events.finished")}
            </h2>
            <div className="opacity-60">
              <EventList events={paginatedPastEvents} />
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </section>
        )}
      </div>
    </div>
  );
}
