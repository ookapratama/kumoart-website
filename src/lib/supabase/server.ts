import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export type TypedServerClient = SupabaseClient<Database>;

/**
 * Client untuk request yang punya context cookies (Server Actions, Pages, Middleware)
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll di Server Component tidak berefek — aman diabaikan
          }
        },
      },
    },
  );
}

/**
 * Client khusus untuk build-time (generateStaticParams)
 * atau background tasks yang TIDAK punya request context (no cookies)
 */
export function createStaticClient(): TypedServerClient {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
