"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  onboardingSchema,
  type OnboardingData,
  type OnboardingStep,
  stepLabels,
  getDynamicSteps,
  needsA2P,
  needsLeads,
  needsCalendar,
  calendarRequired,
} from "@/lib/onboarding/schema";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { ServiceSelection } from "@/components/onboarding/steps/ServiceSelection";
import { BusinessProfile } from "@/components/onboarding/steps/BusinessProfile";
import { A2PCompliance } from "@/components/onboarding/steps/A2PCompliance";
import { CalendarSetup } from "@/components/onboarding/steps/CalendarSetup";
import { ContactsSetup } from "@/components/onboarding/steps/ContactsSetup";
import { LeadUpload } from "@/components/onboarding/steps/LeadUpload";
import { ReviewSubmit } from "@/components/onboarding/steps/ReviewSubmit";
import { getIndustryTemplates, fillTemplate } from "@/lib/onboarding/templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const STORAGE_KEY = "brandpop_onboarding_progress";

const defaultValues: OnboardingData = {
  services: [],
  business: {
    legalName: "",
    dbaName: "",
    address: { street: "", city: "", state: "", zip: "" },
    website: "",
    industry: "other",
    yearsInBusiness: undefined,
    averageTicket: undefined,
    einNumber: "",
  },
  contacts: {
    primary: { name: "", title: "", email: "", phone: "" },
  },
  a2p: {
    // No defaults for businessType/useCase: carriers review A2P registrations,
    // so the client must consciously choose these.
    businessType: undefined,
    employeeCount: "",
    useCase: undefined,
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
    availableDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    availableHours: { start: "09:00", end: "17:00" },
    minNotice: 24,
    maxAdvanceBooking: 30,
    allowSameDay: false,
    appointmentTypes: [],
    zoomLink: "",
    inPersonAddress: "",
  },
  notifications: {
    recipients: [{ role: "", email: "", phone: "" }],
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
  einDocumentPath: "",
  einDocumentUrl: "",
  leadCsvPath: "",
  leadCsvUrl: "",
};

function getStepFields(step: OnboardingStep, services: string[] = []): string[] {
  switch (step) {
    case "services":
      return ["services"];
    case "business": {
      const fields = [
        "business.legalName",
        "business.address.street",
        "business.address.city",
        "business.address.state",
        "business.address.zip",
        "business.industry",
        "contacts.primary.name",
        "contacts.primary.email",
      ];
      if (services.includes("ai_voice")) fields.push("business.callForwardingNumber");
      if (services.includes("live_chat")) fields.push("business.websitePlatform");
      if (services.includes("reputation_management")) fields.push("business.googleBusinessUrl");
      return fields;
    }
    case "a2p":
      return [
        "a2p.businessType",
        "a2p.employeeCount",
        "a2p.useCase",
        "a2p.monthlyVolume",
        "a2p.optInMethod",
        "a2p.tosAccepted",
      ];
    case "calendar":
      if (!calendarRequired(services)) return [];
      return [
        "calendar.ghlInvitationEmail",
        "calendar.availableDays",
        "calendar.availableHours.start",
        "calendar.availableHours.end",
        "calendar.appointmentTypes",
      ];
    case "contacts":
      return ["notifications.recipients", "notifications.methods", "notifications.timing"];
    case "leads":
      return [];
    case "review":
      return [];
    default:
      return [];
  }
}

function getStepForField(path: string): OnboardingStep | null {
  if (path === "services") return "services";
  if (path.startsWith("business")) return "business";
  if (path.startsWith("contacts.primary")) return "business";
  if (path.startsWith("a2p")) return "a2p";
  if (path.startsWith("calendar")) return "calendar";
  if (path.startsWith("notifications")) return "contacts";
  if (path.startsWith("leads")) return "leads";
  return null;
}

function collectErrorMessages(errors: any, prefix = ""): { path: string; message: string }[] {
  const results: { path: string; message: string }[] = [];
  for (const key of Object.keys(errors)) {
    const val = errors[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (val?.message) {
      results.push({ path, message: val.message });
    } else if (typeof val === "object" && val !== null) {
      results.push(...collectErrorMessages(val, path));
    }
  }
  return results;
}
const pad = (n: number) => String(n).padStart(2, "0");

function Wordmark() {
  return (
    <span className="font-sans text-lg font-semibold tracking-tight text-ink">
      brandpop<span className="star-mark">*</span>
    </span>
  );
}

/*
  The asterisk footnote system — the brand device. The wordmark's own asterisk
  is footnote zero, so the pricing note has to be the first one that resolves.
  Lowercase, mono, plainspoken, never weasel.
*/
function Footnotes() {
  return (
    // --ink-faint is only 3.1:1 on bone. These footnotes carry pricing and data
    // terms at 12px, so they take the darker muted value that clears AA.
    <div className="mt-12 space-y-2 border-t border-dashed border-rule pt-4 font-mono text-xs leading-relaxed text-text-muted">
      <p>
        <span className="star-mark">*</span> database reactivation is the only
        service you pay per booked appointment. everything else is flat monthly.
      </p>
      <p>
        <span className="star-mark">*</span> hipaa compliant, baa available on
        request. your data is never sold or shared.
      </p>
    </div>
  );
}

export function OnboardingForm() {
  const searchParams = useSearchParams();
  const clientSlug = searchParams.get("client") || "new-client";

  const [currentStep, setCurrentStep] = useState<OnboardingStep>("services");
  const [completedSteps, setCompletedSteps] = useState<OnboardingStep[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);

  const methods = useForm({
    resolver: zodResolver(onboardingSchema) as any,
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    control,
    formState,
    watch,
  } = methods;

  const services = watch("services") as string[];
  const dynamicSteps = getDynamicSteps(services || []);
  const showA2P = needsA2P(services || []);
  const showLeads = needsLeads(services || []);
  const showCalendar = needsCalendar(services || []);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data) {
          methods.reset(parsed.data);
        }
        // Only restore a step that still exists for the saved service
        // selection — otherwise the form renders an empty card.
        const validSteps = getDynamicSteps(parsed.data?.services || []);
        if (parsed.step && validSteps.includes(parsed.step)) {
          setCurrentStep(parsed.step);
        }
        if (parsed.completed) setCompletedSteps(parsed.completed);
      }
    } catch {
      // ignore
    }
  }, [methods]);

  // Save progress
  useEffect(() => {
    const subscription = methods.watch((data: any) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data,
          step: currentStep,
          completed: completedSteps,
        })
      );
    });
    return () => subscription.unsubscribe();
  }, [methods, currentStep, completedSteps]);

  const validateStep = async (step: OnboardingStep): Promise<{ valid: boolean; messages?: string[] }> => {
    const fields = getStepFields(step, services || []);
    if (fields.length === 0) return { valid: true };
    const valid = await trigger(fields as any);
    if (!valid) {
      const errors = collectErrorMessages(formState.errors);
      const messages = errors.map((e) => e.message);
      return { valid: false, messages };
    }
    return { valid: true };
  };

  const handleNext = async () => {
    setStepError(null);
    const result = await validateStep(currentStep);
    if (!result.valid) {
      const uniqueMessages = Array.from(new Set(result.messages || []));
      const list = uniqueMessages.slice(0, 3).join("; ");
      const more = uniqueMessages.length > 3 ? ` (+${uniqueMessages.length - 3} more)` : "";
      setStepError(`Please fix: ${list}${more}`);
      return;
    }

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    // Pre-fill A2P templates when leaving business step
    if (currentStep === "business" && showA2P) {
      const industry = methods.getValues("business.industry");
      if (industry) {
        const templates = getIndustryTemplates(industry);
        const business = methods.getValues("business");
        const contacts = methods.getValues("contacts");
        methods.setValue("a2p.useCaseDescription", fillTemplate(templates.useCaseDescription, business, contacts));
        methods.setValue("a2p.sampleMessage", fillTemplate(templates.sampleMessage, business, contacts));
      }
    }

    const idx = dynamicSteps.indexOf(currentStep);
    const next = dynamicSteps[idx + 1];
    if (next) setCurrentStep(next);
  };

  const handleBack = () => {
    setStepError(null);
    const idx = dynamicSteps.indexOf(currentStep);
    const prev = dynamicSteps[idx - 1];
    if (prev) setCurrentStep(prev);
  };

  const handleStepClick = async (step: OnboardingStep) => {
    setStepError(null);
    const stepIndex = dynamicSteps.indexOf(step);
    const currentIndex = dynamicSteps.indexOf(currentStep);

    // Can always go back
    if (stepIndex < currentIndex) {
      setCurrentStep(step);
      return;
    }

    // Can jump forward to completed steps or the immediate next step
    if (stepIndex === currentIndex + 1 || completedSteps.includes(step)) {
      const result = await validateStep(currentStep);
      if (result.valid) {
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps((prev) => [...prev, currentStep]);
        }
        setCurrentStep(step);
      } else {
        const uniqueMessages = Array.from(new Set(result.messages || []));
        const list = uniqueMessages.slice(0, 3).join("; ");
        const more = uniqueMessages.length > 3 ? ` (+${uniqueMessages.length - 3} more)` : "";
        setStepError(`Please fix: ${list}${more}`);
      }
    }
  };

  const onSubmit = async (data: any) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, clientSlug }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Submission failed");
      }

      localStorage.removeItem(STORAGE_KEY);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (errors: any) => {
    const errorList = collectErrorMessages(errors);
    const stepsWithErrors = new Set<OnboardingStep>();
    for (const err of errorList) {
      const step = getStepForField(err.path);
      if (step) stepsWithErrors.add(step);
    }

    const stepNames = Array.from(stepsWithErrors).map((s) => stepLabels[s]).join(", ");
    const firstErrors = Array.from(new Set(errorList.map((e) => e.message))).slice(0, 3).join("; ");

    let message = "";
    if (stepNames) {
      message = `Errors found in: ${stepNames}. ${firstErrors}`;
    } else {
      message = firstErrors || "Please fix the errors before submitting.";
    }
    setSubmitError(message);

    // Auto-navigate to the first step with an error
    const firstStepWithError = dynamicSteps.find((s) => stepsWithErrors.has(s));
    if (firstStepWithError) {
      setCurrentStep(firstStepWithError);
    }
  };

  if (isSubmitted) {
    // Ledger rows: mono index, what happens, right-aligned mono term.
    const nextSteps = showA2P
      ? [
          { label: "A2P registration submitted to carriers", term: "24–48 hrs" },
          { label: "Campaign messaging written, then approved by you", term: "you approve" },
          { label: "Trial launch", term: "results in 48 hrs" },
        ]
      : [
          { label: "GHL account connection and integration setup", term: "1–2 days" },
          { label: "AI configured and tuned to your business and tone", term: "we handle it" },
          { label: "Go live", term: "results in a week" },
        ];

    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Wordmark />
          <div className="exhibit-card mt-6 p-6 sm:p-8">
            <div className="kicker">submitted</div>
            <h1 className="mt-4 font-serif text-[clamp(28px,3.4vw,40px)] font-normal leading-[1.1] tracking-[-0.015em] text-ink">
              That’s everything we need.
            </h1>
            <p className="mt-3 max-w-xl text-ink-soft">
              Nothing else is required from you. We build it, run it, and monitor it.
              Here’s the order it happens in.
            </p>
            <ol className="mt-8 border-t border-ink">
              {nextSteps.map((step, i) => (
                <li
                  key={step.label}
                  className="flex items-baseline gap-4 border-b border-rule py-4"
                >
                  <span className="font-mono text-xs text-ink-faint">{pad(i + 1)}</span>
                  <span className="flex-1 text-ink">{step.label}</span>
                  <span className="shrink-0 font-mono text-xs text-ink-soft">
                    {step.term}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-mono text-xs text-text-muted">
              questions? reply to your confirmation email — it comes straight to
              a person.
            </p>
          </div>
          <Footnotes />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header — left-aligned editorial, never centered. */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <Wordmark />
            <button
              type="button"
              onClick={() => {
                if (confirm("Start over? This will clear all your progress.")) {
                  localStorage.removeItem(STORAGE_KEY);
                  window.location.reload();
                }
              }}
              className="font-mono text-xs text-ink-faint underline underline-offset-2 hover:text-ink"
            >
              start over
            </button>
          </div>
          <div className="kicker mt-6">client onboarding</div>
          <h1 className="mt-4 font-serif text-[clamp(28px,3.4vw,40px)] font-normal leading-[1.1] tracking-[-0.015em] text-ink">
            Tell us about the business. We’ll build the rest.
          </h1>
          <p className="mt-3 max-w-xl text-ink-soft">
            About <span className="font-mono">8 minutes</span>. Your progress
            saves automatically.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <StepIndicator steps={dynamicSteps} currentStep={currentStep} completedSteps={completedSteps} onStepClick={(step) => { setStepError(null); handleStepClick(step); }} />
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit as any, onInvalid)}>
            {/* exhibit-card: --card ground, ink border, hard offset shadow.
                Square-cornered — cards on paper don't have soft radii. */}
            <div className="exhibit-card p-6 sm:p-8">
              {stepError && (
                <div className="mb-6 rounded-xl border border-error bg-error/10 p-4 text-sm text-error">
                  {stepError}
                </div>
              )}
              {currentStep === "services" && <ServiceSelection control={control} />}
              {currentStep === "business" && <BusinessProfile control={control} />}
              {currentStep === "a2p" && showA2P && <A2PCompliance control={control} />}
              {currentStep === "calendar" && showCalendar && <CalendarSetup control={control} />}
              {currentStep === "contacts" && <ContactsSetup control={control} />}
              {currentStep === "leads" && showLeads && <LeadUpload control={control} />}
              {currentStep === "review" && (
                <ReviewSubmit
                  data={getValues()}
                  onEditStep={(step) => setCurrentStep(step as OnboardingStep)}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
            {submitError && (
              <div className="mt-4 rounded-xl border border-error bg-error/10 p-4 text-sm text-error">
                {submitError}
              </div>
            )}

            {/* Navigation */}
            {currentStep !== "review" && (
              <div className="mt-6 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === "services"}
                  className={currentStep === "services" ? "invisible" : ""}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="button" onClick={handleNext}>
                  {dynamicSteps[dynamicSteps.length - 2] === currentStep ? "Review" : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
        <Footnotes />
      </div>
    </div>
  );
}
