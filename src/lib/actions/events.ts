"use server";

import { revalidatePath } from "next/cache";

import { deleteEntity, saveEntity } from "./save-entity";
import { parseEventInput } from "@/lib/validation/event-input";

import type { ActionResult } from "./types";

// Event aktif tampil di Navbar (public layout), jadi revalidate
// seluruh layout publik, bukan hanya halaman event.
function revalidateEventPaths(): void {
  revalidatePath("/", "layout");
  revalidatePath("/event");
  revalidatePath("/event/[slug]", "page");
}

export async function saveEvent(
  formData: FormData,
): Promise<ActionResult<{ id: string }>> {
  const parsed = parseEventInput(formData);
  if (!parsed.ok) {
    return { ok: false, code: "validation", message: parsed.error };
  }

  return saveEntity({
    table: "events",
    bucket: "event-images",
    formData,
    payload: parsed.data,
    revalidate: revalidateEventPaths,
  });
}

export async function deleteEvent(id: string): Promise<ActionResult> {
  return deleteEntity({
    table: "events",
    bucket: "event-images",
    id,
    revalidate: revalidateEventPaths,
  });
}
