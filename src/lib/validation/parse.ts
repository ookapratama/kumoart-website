export type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function text(fd: FormData, key: string): string {
  const value = fd.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function optionalText(fd: FormData, key: string): string | null {
  return text(fd, key) || null;
}

/** Angka bulat >= 0; fallback jika kosong/tidak valid. */
export function nonNegativeInt(
  fd: FormData,
  key: string,
  fallback: number,
): number {
  const raw = text(fd, key);
  if (!raw) return fallback;
  const parsed = parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 0) return fallback;
  return parsed;
}

export function optionalInt(fd: FormData, key: string): number | null {
  const raw = text(fd, key);
  if (!raw) return null;
  const parsed = parseInt(raw, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export function boolean(fd: FormData, key: string): boolean {
  return fd.get(key) === "true";
}
