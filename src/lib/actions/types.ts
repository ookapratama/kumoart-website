export type ActionErrorCode =
  | "unauthorized"
  | "validation"
  | "duplicate-slug"
  | "storage"
  | "db";

export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; code: ActionErrorCode; message: string };
