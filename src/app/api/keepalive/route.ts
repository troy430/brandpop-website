import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// Keep-alive endpoint. A Vercel Cron hits this once a day (see vercel.json).
// It runs one trivial Supabase query, which counts as database activity and
// resets the free-tier 7-day auto-pause timer — so the project never sleeps
// during a quiet stretch and a client's form submission can't hit a paused DB.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Optional lock-down: if CRON_SECRET is set, require Vercel's cron auth
  // header. If it's unset, the endpoint is open (the query below is harmless).
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("onboarding_submissions")
    .select("id", { head: true, count: "exact" })
    .limit(1);

  if (error) {
    console.error("keepalive query failed:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
