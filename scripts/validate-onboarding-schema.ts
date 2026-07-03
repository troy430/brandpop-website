// Throwaway validation audit for the onboarding schema. Run: npx tsx scripts/validate-onboarding-schema.ts
import { onboardingSchema, getDynamicSteps } from "../src/lib/onboarding/schema";

const base = {
  services: [] as string[],
  business: {
    legalName: "Test Co LLC",
    dbaName: "",
    address: { street: "1 Main St", city: "Portland", state: "OR", zip: "97201" },
    website: "",
    industry: "dental",
    einNumber: "",
  },
  contacts: {
    primary: { name: "Pat", title: "", email: "pat@test.com", phone: "" },
  },
  a2p: {
    businessType: "llc",
    employeeCount: "",
    useCase: "lead_reactivation",
    useCaseDescription: "",
    monthlyVolume: "",
    sampleMessage: "",
    optInMethod: "",
    smsPhoneNumber: "",
    callForwardingNumber: "",
    tosAccepted: false,
    needsPrivacyPolicy: false,
  },
  calendar: {
    ghlInvitationEmail: "",
    appointmentDuration: 30,
    bufferTime: 0,
    availableDays: [],
    availableHours: { start: "", end: "" },
    minNotice: 24,
    maxAdvanceBooking: 30,
    allowSameDay: false,
    appointmentTypes: [],
    zoomLink: "",
    inPersonAddress: "",
  },
  notifications: {
    recipients: [{ role: "Owner", email: "pat@test.com", phone: "" }],
    methods: ["email"],
    timing: "immediate",
    slackWebhook: "",
  },
  leads: {
    campaignContext: "",
    commonObjections: "",
    currentFollowUp: "",
    bestContactTimes: "",
    exclusions: "",
  },
};

function clone(overrides: Record<string, unknown> = {}) {
  return JSON.parse(JSON.stringify({ ...base, ...overrides }));
}

function check(name: string, data: unknown, expectPass: boolean, expectPaths: string[] = []) {
  const result = onboardingSchema.safeParse(data);
  const paths = result.success ? [] : result.error.issues.map((i) => i.path.join("."));
  const pass = result.success;
  const ok =
    pass === expectPass &&
    expectPaths.every((p) => paths.includes(p));
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) {
    console.log(`      expected ${expectPass ? "valid" : "invalid with " + expectPaths.join(", ")}`);
    console.log(`      got ${pass ? "valid" : "issues: " + paths.join(", ")}`);
  }
}

// ── Reputation Management only ──────────────────────────────
check(
  "rep-mgmt only, no Google URL → rejected on that field",
  clone({ services: ["reputation_management"] }),
  false,
  ["business.googleBusinessUrl"],
);

const repOk = clone({ services: ["reputation_management"] });
repOk.business.googleBusinessUrl = "https://g.page/test";
check("rep-mgmt only, with Google URL → accepted (no a2p/calendar demands)", repOk, true);

// ── Voice AI ─────────────────────────────────────────────────
check(
  "voice only, no forwarding number → rejected on that field",
  clone({ services: ["ai_voice"] }),
  false,
  ["business.callForwardingNumber"],
);

const voiceHalf = clone({ services: ["ai_voice"] });
voiceHalf.business.callForwardingNumber = "5035550100";
check(
  "voice only, forwarding set but calendar empty → rejected on calendar fields",
  voiceHalf,
  false,
  ["calendar.ghlInvitationEmail", "calendar.availableDays", "calendar.appointmentTypes"],
);

const voiceFull = JSON.parse(JSON.stringify(voiceHalf));
voiceFull.calendar.ghlInvitationEmail = "pat@test.com";
voiceFull.calendar.availableDays = ["monday"];
voiceFull.calendar.availableHours = { start: "09:00", end: "17:00" };
voiceFull.calendar.appointmentTypes = ["consult"];
check("voice only, calendar complete → accepted (no A2P demanded)", voiceFull, true);

// ── Live Chat ────────────────────────────────────────────────
check(
  "live chat only, no platform → rejected on that field",
  clone({ services: ["live_chat"] }),
  false,
  ["business.websitePlatform"],
);

const chatOk = clone({ services: ["live_chat"] });
chatOk.business.websitePlatform = "wordpress";
check("live chat only, platform set, calendar EMPTY → accepted (calendar optional)", chatOk, true);

// ── DBR ──────────────────────────────────────────────────────
const dbrBare = clone({ services: ["dbr"] });
check(
  "dbr, empty A2P + empty calendar → rejected on a2p + calendar fields",
  dbrBare,
  false,
  ["a2p.employeeCount", "a2p.monthlyVolume", "a2p.optInMethod", "a2p.tosAccepted", "calendar.ghlInvitationEmail"],
);

const dbrFull = clone({ services: ["dbr"] });
dbrFull.a2p.employeeCount = "1-10";
dbrFull.a2p.monthlyVolume = "1000-5000";
dbrFull.a2p.optInMethod = "Leads opted in via website form when requesting a quote";
dbrFull.a2p.tosAccepted = true;
dbrFull.calendar.ghlInvitationEmail = "pat@test.com";
dbrFull.calendar.availableDays = ["monday"];
dbrFull.calendar.availableHours = { start: "09:00", end: "17:00" };
dbrFull.calendar.appointmentTypes = ["consult"];
check("dbr, A2P + calendar complete → accepted", dbrFull, true);

// A2P short opt-in description
const dbrShortOptIn = JSON.parse(JSON.stringify(dbrFull));
dbrShortOptIn.a2p.optInMethod = "web form"; // < 10 chars
check("dbr, opt-in description under 10 chars → rejected", dbrShortOptIn, false, ["a2p.optInMethod"]);

// A2P selects left on their "" placeholder → must be rejected, not defaulted
const dbrNoChoices = JSON.parse(JSON.stringify(dbrFull));
dbrNoChoices.a2p.businessType = "";
dbrNoChoices.a2p.useCase = "";
check(
  "dbr, business type + use case left on placeholder → rejected on both",
  dbrNoChoices,
  false,
  ["a2p.businessType", "a2p.useCase"],
);

// ── Missing a2p object entirely (never saw the step) ────────
const dbrNoA2p = JSON.parse(JSON.stringify(dbrFull));
delete dbrNoA2p.a2p;
check("dbr with a2p object missing entirely → rejected on a2p", dbrNoA2p, false, ["a2p"]);

// ── All five services ───────────────────────────────────────
const all = JSON.parse(JSON.stringify(dbrFull));
all.services = ["dbr", "ai_voice", "speed_to_lead", "live_chat", "reputation_management"];
all.business.callForwardingNumber = "5035550100";
all.business.websitePlatform = "wordpress";
all.business.googleBusinessUrl = "https://g.page/test";
check("all five services, everything filled → accepted", all, true);

// ── Step visibility sanity ──────────────────────────────────
console.log("\nDynamic steps by service:");
for (const svc of ["dbr", "ai_voice", "speed_to_lead", "live_chat", "reputation_management"]) {
  console.log(`  ${svc}: ${getDynamicSteps([svc]).join(" → ")}`);
}
