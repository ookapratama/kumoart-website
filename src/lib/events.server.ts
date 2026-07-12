import { createEntityQueries } from "@/lib/data/queries";

const eventQueries = createEntityQueries({
  table: "events",
  publicOrder: { column: "start_date", ascending: false },
});

/** Semua event aktif (public site) */
export const getAllEvents = eventQueries.getPublished;

/** Semua event termasuk non-aktif (admin) */
export const getAllEventsAdmin = eventQueries.getAllForAdmin;

/** Event aktif berdasarkan slug (public detail) */
export const getEventBySlug = eventQueries.getPublishedBySlug;

/** Event berdasarkan ID (admin edit) */
export const getEventById = eventQueries.getById;

/** Semua slug event aktif (generateStaticParams) */
export const getAllEventSlugs = eventQueries.getPublishedSlugs;
