import { z } from "zod";

export const serviceTypes = [
  "dbr",
  "ai_voice",
  "speed_to_lead",
  "live_chat",
  "reputation_management",
] as const;

export const industries = [
  "solar",
  "roofing",
  "dental",
  "med_spa",
  "home_services",
  "legal",
  "insurance",
  "fitness",
  "franchise",
  "ecommerce",
  "other",
] as const;

export const businessTypes = [
  "sole_proprietorship",
  "llc",
  "s_corp",
  "c_corp",
  "partnership",
  "nonprofit",
] as const;

export const useCases = [
  "lead_reactivation",
  "appointment_reminders",
  "customer_care",
  "marketing_promotions",
  "follow_up",
] as const;

export const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
});

export const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
});

export const websitePlatforms = [
  "wordpress",
  "wix",
  "webflow",
  "squarespace",
  "shopify",
  "custom",
  "other",
] as const;

export const onboardingSchema = z.object({
  // Step 1: Service Selection
  services: z.array(z.enum(serviceTypes)).min(1, "Select at least one service"),

  // Step 2: Business Profile
  business: z.object({
    legalName: z.string().min(1, "Legal business name is required"),
    dbaName: z.string().optional(),
    address: addressSchema,
    website: z.string().url("Valid URL required").or(z.literal("")),
    industry: z.enum(industries),
    yearsInBusiness: z.preprocess((val) => val === "" ? undefined : Number(val), z.number().min(0).optional()),
    averageTicket: z.preprocess((val) => val === "" ? undefined : Number(val), z.number().min(0).optional()),
    einNumber: z.string().optional(),
    // Voice AI
    callForwardingNumber: z.string().optional(),
    // Live Chat
    websitePlatform: z.enum(websitePlatforms).optional(),
    // Reputation Management
    googleBusinessUrl: z.string().url("Enter a valid Google Business URL").or(z.literal("")).optional(),
  }),

  contacts: z.object({
    primary: contactSchema,
    decisionMaker: contactSchema.optional(),
    billing: contactSchema.optional(),
  }),

  // Step 3: A2P Compliance (only required for DBR and Speed-to-Lead)
  a2p: z.object({
    businessType: z.enum(businessTypes),
    employeeCount: z.string().min(1, "Required"),
    useCase: z.enum(useCases),
    useCaseDescription: z.string().optional(),
    monthlyVolume: z.string().min(1, "Required"),
    sampleMessage: z.string().optional(),
    optInMethod: z.string().min(10, "Describe how leads opt in"),
    smsPhoneNumber: z.string().optional(),
    callForwardingNumber: z.string().optional(),
    tosAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms of Service",
    }),
    needsPrivacyPolicy: z.boolean().default(false),
  }).optional(),

  // Step 4: Calendar + GHL
  calendar: z.object({
    ghlInvitationEmail: z.string().email("Valid email required").min(1, "Email is required"),
    appointmentDuration: z.coerce.number().min(5).default(30),
    bufferTime: z.coerce.number().min(0).default(0),
    availableDays: z.array(z.enum(daysOfWeek)).min(1, "Select at least one day"),
    availableHours: z.object({
      start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:MM format"),
      end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:MM format"),
    }),
    minNotice: z.coerce.number().min(0).default(24),
    maxAdvanceBooking: z.coerce.number().min(1).default(30),
    allowSameDay: z.boolean().default(false),
    appointmentTypes: z.array(z.string()).min(1, "Select at least one type"),
    zoomLink: z.string().url().or(z.literal("")).optional(),
    inPersonAddress: z.string().optional(),
  }),

  // Step 5: Notifications
  notifications: z.object({
    recipients: z
      .array(
        z.object({
          role: z.string().min(1, "Role is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
        })
      )
      .min(1, "Add at least one notification recipient"),
    methods: z.array(z.enum(["email", "sms", "ghl", "slack", "sheet"])).min(1),
    timing: z.enum(["immediate", "digest", "weekly"]),
    slackWebhook: z.string().optional(),
  }),

  // Step 6: Leads (optional, only for DBR)
  leads: z
    .object({
      campaignContext: z.string().optional(),
      commonObjections: z.string().optional(),
      currentFollowUp: z.string().optional(),
      bestContactTimes: z.string().optional(),
      exclusions: z.string().optional(),
    })
    .optional(),

  // File upload references
  einDocumentPath: z.string().optional(),
  einDocumentUrl: z.string().optional(),
  leadCsvPath: z.string().optional(),
  leadCsvUrl: z.string().optional(),
}).superRefine((data, ctx) => {
  // Voice AI requires call forwarding number
  if (data.services.includes("ai_voice") && !data.business.callForwardingNumber?.trim()) {
    ctx.addIssue({ code: "custom", message: "Call forwarding number is required for AI Voice", path: ["business", "callForwardingNumber"] });
  }

  // Live Chat requires website platform
  if (data.services.includes("live_chat") && !data.business.websitePlatform) {
    ctx.addIssue({ code: "custom", message: "Website platform is required for Live Chat", path: ["business", "websitePlatform"] });
  }

  // Reputation Management requires Google Business URL
  if (data.services.includes("reputation_management") && !data.business.googleBusinessUrl?.trim()) {
    ctx.addIssue({ code: "custom", message: "Google Business Profile URL is required for Reputation Management", path: ["business", "googleBusinessUrl"] });
  }

  // Only validate A2P when DBR or Speed-to-Lead are selected
  if (needsA2P(data.services)) {
    if (!data.a2p) {
      ctx.addIssue({
        code: "custom",
        message: "A2P Compliance is required for DBR and Speed-to-Lead",
        path: ["a2p"],
      });
      return;
    }

    const a2p = data.a2p;

    if (!a2p.businessType) {
      ctx.addIssue({ code: "custom", message: "Required", path: ["a2p", "businessType"] });
    }
    if (!a2p.employeeCount) {
      ctx.addIssue({ code: "custom", message: "Required", path: ["a2p", "employeeCount"] });
    }
    if (!a2p.useCase) {
      ctx.addIssue({ code: "custom", message: "Required", path: ["a2p", "useCase"] });
    }
    if (!a2p.monthlyVolume) {
      ctx.addIssue({ code: "custom", message: "Required", path: ["a2p", "monthlyVolume"] });
    }
    if (!a2p.optInMethod || a2p.optInMethod.length < 10) {
      ctx.addIssue({ code: "custom", message: "Describe how leads opt in", path: ["a2p", "optInMethod"] });
    }
    if (a2p.tosAccepted !== true) {
      ctx.addIssue({ code: "custom", message: "You must accept the Terms of Service", path: ["a2p", "tosAccepted"] });
    }
  }

  // Only validate leads when DBR is selected
  if (needsLeads(data.services)) {
    // leads is already optional, so just check it's present
    if (!data.leads) {
      ctx.addIssue({
        code: "custom",
        message: "Lead information is required for DBR",
        path: ["leads"],
      });
    }
  }
});

export type OnboardingData = z.infer<typeof onboardingSchema>;

export type OnboardingStep =
  | "services"
  | "business"
  | "a2p"
  | "calendar"
  | "contacts"
  | "leads"
  | "review";

export const stepOrder: OnboardingStep[] = [
  "services",
  "business",
  "a2p",
  "calendar",
  "contacts",
  "leads",
  "review",
];

export const stepLabels: Record<OnboardingStep, string> = {
  services: "Services",
  business: "Business",
  a2p: "A2P Setup",
  calendar: "Calendar",
  contacts: "Contacts",
  leads: "Leads",
  review: "Review",
};

export function getNextStep(current: OnboardingStep): OnboardingStep | null {
  const idx = stepOrder.indexOf(current);
  return stepOrder[idx + 1] ?? null;
}

export function getPrevStep(current: OnboardingStep): OnboardingStep | null {
  const idx = stepOrder.indexOf(current);
  return stepOrder[idx - 1] ?? null;
}

// Service categories
const a2pServices: readonly string[] = ["dbr", "speed_to_lead"];
const leadServices: readonly string[] = ["dbr"];

export function needsA2P(services: string[]): boolean {
  return services.some((s) => a2pServices.includes(s));
}

export function needsLeads(services: string[]): boolean {
  return services.some((s) => leadServices.includes(s));
}

export function getDynamicSteps(services: string[]): OnboardingStep[] {
  const steps: OnboardingStep[] = ["services", "business"];
  if (needsA2P(services)) {
    steps.push("a2p");
  }
  steps.push("calendar", "contacts");
  if (needsLeads(services)) {
    steps.push("leads");
  }
  steps.push("review");
  return steps;
}

export function getDynamicStepLabels(services: string[]): Record<OnboardingStep, string> {
  const base: Record<OnboardingStep, string> = { ...stepLabels };
  if (!needsA2P(services)) {
    base.calendar = "GHL & Calendar";
  }
  return base;
}
