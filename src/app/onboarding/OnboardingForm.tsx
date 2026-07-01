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
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

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

function getStepFields(step: OnboardingStep): string[] {
  switch (step) {
    case "services":
      return ["services"];
    case "business":
      return [
        "business.legalName",
        "business.address.street",
        "business.address.city",
        "business.address.state",
        "business.address.zip",
        "business.industry",
        "contacts.primary.name",
        "contacts.primary.email",
      ];
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
      return [
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

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data) {
          methods.reset(parsed.data);
        }
        if (parsed.step) setCurrentStep(parsed.step);
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
    const fields = getStepFields(step);
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
    const isSmsService = showA2P;
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-text-primary">
            You're all set
          </h1>
          <p className="mt-3 text-text-secondary">
            We received everything. Here's what happens next:
          </p>
          <ol className="mt-6 space-y-3 text-left text-sm text-text-secondary">
            {isSmsService ? (
              <>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-accent">
                    1
                  </span>
                  A2P registration submitted to carriers (24–48 hours)
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-accent">
                    2
                  </span>
                  Campaign messaging crafted and approved by you
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-accent">
                    3
                  </span>
                  Trial launch — you'll see results within 48 hours of going live
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-accent">
                    1
                  </span>
                  GHL account connection and integration setup (1–2 business days)
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-accent">
                    2
                  </span>
                  AI configuration and voice/SEO optimization
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-accent">
                    3
                  </span>
                  Go live — you'll start seeing results within a week
                </li>
              </>
            )}
          </ol>
          <p className="mt-8 text-xs text-text-muted">
            Questions? Reply to your confirmation email or contact us directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Get started with brandpop*
          </h1>
          <p className="mt-2 text-text-secondary">
            Complete this onboarding in about 8 minutes. Your progress saves automatically.
          </p>
          <p className="mt-2 text-xs text-text-muted">
            HIPAA compliant · BAA available · Your data is never sold or shared
          </p>
          <button
            type="button"
            onClick={() => {
              if (confirm("Start over? This will clear all your progress.")) {
                localStorage.removeItem(STORAGE_KEY);
                window.location.reload();
              }
            }}
            className="mt-3 text-xs text-text-muted underline hover:text-text-secondary"
          >
            Start over
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <StepIndicator steps={dynamicSteps} currentStep={currentStep} completedSteps={completedSteps} onStepClick={(step) => { setStepError(null); handleStepClick(step); }} />
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit as any, onInvalid)}>
            <div className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8">
              {stepError && (
                <div className="mb-6 rounded-xl border border-error bg-error/10 p-4 text-sm text-error">
                  {stepError}
                </div>
              )}
              {currentStep === "services" && <ServiceSelection control={control} />}
              {currentStep === "business" && <BusinessProfile control={control} />}
              {currentStep === "a2p" && showA2P && <A2PCompliance control={control} />}
              {currentStep === "calendar" && <CalendarSetup control={control} />}
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
      </div>
    </div>
  );
}
