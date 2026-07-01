import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient<any, any, any> | null = null;

export function getSupabase(): SupabaseClient<any, any, any> {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn(
      "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
    // Return a no-op stub during build so page data collection doesn't crash
    return {
      from: () => ({
        select: async () => ({ data: [], error: null }),
        insert: async () => ({ error: null }),
        delete: async () => ({ error: null }),
      }),
    } as unknown as SupabaseClient<any, any, any>;
  }

  cachedClient = createClient<any, any, any>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return cachedClient;
}