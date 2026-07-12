"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { ActionResult } from "@/lib/actions/types";

export type FormMode = "create" | "edit";

export function generateSlug(source: string): string {
  return source
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type FieldChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

interface UseEntityFormOptions<F extends { slug: string }> {
  initial: F;
  mode: FormMode;
  listPath: string;
  action: (formData: FormData) => Promise<ActionResult<{ id: string }>>;
}

export function useEntityForm<F extends { slug: string }>({
  initial,
  mode,
  listPath,
  action,
}: UseEntityFormOptions<F>) {
  const router = useRouter();
  const [form, setForm] = useState<F>(initial);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugManual, setSlugManual] = useState(mode === "edit");

  const handleChange = (e: FieldChangeEvent) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(
      (prev) =>
        ({ ...prev, [name]: type === "checkbox" ? checked : value }) as F,
    );
  };

  /** Untuk field sumber slug (name/title): auto-isi slug selama belum diedit manual */
  const handleSlugSourceChange =
    (field: keyof F & string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm(
        (prev) =>
          ({
            ...prev,
            [field]: value,
            ...(slugManual ? {} : { slug: generateSlug(value) }),
          }) as F,
      );
    };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugManual(true);
    handleChange(e);
  };

  const submit = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    if (imageFile) formData.append("image", imageFile);

    const result = await action(formData);
    if (!result.ok) {
      setError(result.message);
      setLoading(false);
      return;
    }

    router.push(listPath);
    router.refresh();
  };

  const cancel = () => router.push(listPath);

  return {
    form,
    handleChange,
    handleSlugSourceChange,
    handleSlugChange,
    imageFile,
    setImageFile,
    loading,
    error,
    setError,
    submit,
    cancel,
  };
}
