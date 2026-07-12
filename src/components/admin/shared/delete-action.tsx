"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import type { ActionResult } from "@/lib/actions/types";

interface DeleteActionProps {
  id: string;
  name: string;
  editHref: string;
  action: (id: string) => Promise<ActionResult>;
}

/** Tombol Edit + Hapus dengan konfirmasi inline dua langkah (tanpa window.confirm). */
export default function DeleteAction({
  id,
  name,
  editHref,
  action,
}: DeleteActionProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await action(id);
      if (!result.ok) {
        setError(result.message);
        setConfirming(false);
        return;
      }
      router.refresh();
    });
  };

  if (confirming) {
    return (
      <div className="action-btns">
        <span className="table-meta-small" title={`Hapus "${name}"?`}>
          Hapus?
        </span>
        <button
          onClick={handleDelete}
          className="btn-delete"
          disabled={pending}
        >
          {pending ? "..." : "Ya"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="btn-secondary"
          disabled={pending}
        >
          Batal
        </button>
      </div>
    );
  }

  return (
    <div className="action-btns">
      <Link href={editHref} className="btn-edit">
        ✏️ Edit
      </Link>
      <button onClick={() => setConfirming(true)} className="btn-delete">
        🗑️
      </button>
      {error && <span className="upload-error">⚠️ {error}</span>}
    </div>
  );
}
