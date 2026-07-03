// Central site config — one place for contact points, CTAs, and the service
// lineup. The five services here must always match the onboarding flow
// (see DESIGN.md: AEO is never listed on the site).

export const SITE = {
  url: "https://brandpop.ai",
  email: "troy@brandpop.ai",
  bookingUrl: "https://book.brandpop.ai/widget/bookings/brandpop",
  // Demo lines — not currently wired up in GHL; kept for when the bots go
  // live so the Try It Live panel can re-list them.
  demoSmsPhone: "(570) 539-9116",
  demoSmsHref: "sms:+15705399116",
  demoVoicePhone: "(448) 242-1263",
  demoVoiceHref: "tel:+14482421263",
  services: [
    {
      num: "01",
      name: "Database Reactivation",
      description:
        "AI SMS revives the lead list you stopped calling. Conversational, personal, compliant — not blasts.",
      term: "pay per booked appt*",
      performance: true,
    },
    {
      num: "02",
      name: "AI Voice Receptionist",
      description:
        "Answers every call, qualifies, books — nights, weekends, lunch rushes. No voicemail, ever.",
      term: "flat monthly",
      performance: false,
    },
    {
      num: "03",
      name: "Speed to Lead",
      description:
        "A form comes in; the AI is texting back inside 60 seconds — while your competitor’s lead sits in an inbox.",
      term: "flat monthly",
      performance: false,
    },
    {
      num: "04",
      name: "Live Chat",
      description:
        "Website visitors get answers and appointment slots in real time, not a contact form and a wait.",
      term: "flat monthly",
      performance: false,
    },
    {
      num: "05",
      name: "Reputation Management",
      description:
        "Reviews requested, monitored, and answered — your Google profile compounds while you sleep.",
      term: "flat monthly",
      performance: false,
    },
  ],
} as const;
