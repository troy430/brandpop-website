import { SITE } from "@/lib/site";

// Human-readable labels for the raw enum values stored on a submission.
const SERVICE_LABELS: Record<string, string> = {
  dbr: "Database Reactivation",
  ai_voice: "AI Voice Receptionist",
  speed_to_lead: "Speed to Lead",
  live_chat: "Live Chat",
  reputation_management: "Reputation Management",
};

const USE_CASE_LABELS: Record<string, string> = {
  lead_reactivation: "Lead reactivation",
  appointment_reminders: "Appointment reminders",
  customer_care: "Customer care",
  marketing_promotions: "Marketing / promotions",
  follow_up: "Follow-up",
};

function labelServices(services: unknown): string {
  if (!Array.isArray(services) || services.length === 0) return "—";
  return services.map((s) => SERVICE_LABELS[s as string] ?? String(s)).join(", ");
}

function contactLine(contact: any): string {
  if (!contact) return "—";
  const parts = [contact.name, contact.email, contact.phone].filter(Boolean);
  return parts.length ? parts.join(" · ") : "—";
}

/**
 * Fire a Slack alert when a client completes onboarding.
 *
 * Best-effort by design: this NEVER throws. A missing webhook or a Slack
 * outage must not fail the client's submission — the row is already saved in
 * Supabase (the source of truth), so the worst case is a missing ping, not
 * lost data. Hermes reads these messages to spin up subaccounts; the
 * submission id lets it pull the full record back from Supabase.
 */
export async function notifyOnboardingSubmission(
  payload: any,
  submissionId: string
): Promise<void> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.warn(
      "SLACK_WEBHOOK_URL not set — skipping onboarding Slack notification"
    );
    return;
  }

  const business = payload?.business ?? {};
  const a2p = payload?.a2p ?? {};
  const primary = payload?.contacts?.primary;
  const name = business.legalName || business.dbaName || "New client";
  const dba = business.dbaName ? ` (DBA ${business.dbaName})` : "";
  const adminUrl = `${SITE.url}/admin/onboarding`;

  const fields: { type: "mrkdwn"; text: string }[] = [
    { type: "mrkdwn", text: `*Business:*\n${name}${dba}` },
    { type: "mrkdwn", text: `*Industry:*\n${business.industry || "—"}` },
    { type: "mrkdwn", text: `*Services:*\n${labelServices(payload?.services)}` },
    { type: "mrkdwn", text: `*Primary contact:*\n${contactLine(primary)}` },
    { type: "mrkdwn", text: `*Website:*\n${business.website || "—"}` },
    { type: "mrkdwn", text: `*EIN:*\n${business.einNumber || "—"}` },
  ];

  // A2P fields only matter when the client selected an SMS service.
  if (a2p.smsPhoneNumber || a2p.useCase) {
    fields.push({
      type: "mrkdwn",
      text: `*SMS number:*\n${a2p.smsPhoneNumber || "—"}`,
    });
    fields.push({
      type: "mrkdwn",
      text: `*Use case:*\n${USE_CASE_LABELS[a2p.useCase] ?? a2p.useCase ?? "—"}`,
    });
  }

  const message = {
    text: `New onboarding: ${name} — ${labelServices(payload?.services)}`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `🎉 New onboarding: ${name}`, emoji: true },
      },
      { type: "section", fields },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Submission \`${submissionId}\` · <${adminUrl}|View in admin>`,
          },
        ],
      },
    ],
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Slack onboarding notify failed:", res.status, detail);
    }
  } catch (err) {
    console.error("Slack onboarding notify error:", err);
  }
}
