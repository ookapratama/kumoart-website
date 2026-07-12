import { createClient } from "@/lib/supabase/server";

import type { TypedServerClient } from "@/lib/supabase/server";

export class UnauthorizedError extends Error {
  constructor() {
    super("Tidak memiliki akses admin.");
    this.name = "UnauthorizedError";
  }
}

/**
 * Verifikasi session + allowlist admin (RPC is_admin).
 * Dipanggil di awal setiap Server Action yang menulis data.
 */
export async function requireAdmin(): Promise<{
  supabase: TypedServerClient;
  userId: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();

  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error || !isAdmin) throw new UnauthorizedError();

  return { supabase, userId: user.id };
}
