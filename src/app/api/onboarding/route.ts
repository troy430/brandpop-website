import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("onboarding_submissions")
      .insert({
        client_slug: body.clientSlug || "new-client",
        services: body.services,
        business: body.business,
        contacts: body.contacts,
        a2p: body.a2p,
        calendar: body.calendar,
        notifications: body.notifications,
        leads: body.leads,
        raw_payload: body,
        ein_document_path: body.einDocumentPath,
        ein_document_url: body.einDocumentUrl,
        lead_csv_path: body.leadCsvPath,
        lead_csv_url: body.leadCsvUrl,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to store submission" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Onboarding received",
        id: data.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Onboarding submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process submission" },
      { status: 500 }
    );
  }
}