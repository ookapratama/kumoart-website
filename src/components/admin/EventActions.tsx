"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface EventActionsProps {
  eventId: string;
  eventTitle: string;
}

export default function EventActions({
  eventId,
  eventTitle,
}: EventActionsProps) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Hapus event "${eventTitle}"?\n\nAksi ini tidak dapat dibatalkan.`,
    );
    if (!confirmed) return;

    setDeleting(true);
    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) {
      alert("Gagal menghapus event: " + error.message);
      setDeleting(false);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="action-btns">
      <Link href={`/admin/event/${eventId}/edit`} className="btn-edit">
        ✏️ Edit
      </Link>
      <button onClick={handleDelete} className="btn-delete" disabled={deleting}>
        {deleting ? "..." : "🗑️"}
      </button>
    </div>
  );
}
