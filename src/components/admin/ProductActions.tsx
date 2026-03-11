"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface ProductActionsProps {
  productId: string;
  productName: string;
}

export default function ProductActions({
  productId,
  productName,
}: ProductActionsProps) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Hapus produk "${productName}"?\n\nAksi ini tidak dapat dibatalkan.`,
    );
    if (!confirmed) return;

    setDeleting(true);
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      alert("Gagal menghapus produk: " + error.message);
      setDeleting(false);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="action-btns">
      <Link href={`/admin/produk/${productId}/edit`} className="btn-edit">
        ✏️ Edit
      </Link>
      <button onClick={handleDelete} className="btn-delete" disabled={deleting}>
        {deleting ? "..." : "🗑️"}
      </button>
    </div>
  );
}
