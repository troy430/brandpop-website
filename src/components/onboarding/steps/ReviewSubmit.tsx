import { OnboardingData, industries, needsA2P, needsLeads, needsCalendar } from "@/lib/onboarding/schema";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";

interface ReviewSubmitProps {
  data: OnboardingData;
  onEditStep: (step: string) => void;
  isSubmitting: boolean;
}

const serviceLabels: Record<string, string> = {
  dbr: "Database Reactivation",
  ai_voice: "AI Voice Receptionist",
  speed_to_lead: "Speed to Lead",
};

const industryLabels: Record<string, string> = {
  solar: "Solar",
  roofing: "Roofing",
  dental: "Dental",
  med_spa: "Med Spa",
  home_services: "Home Services",
  legal: "Legal",
  insurance: "Insurance",
  fitness: "Fitness",
  franchise: "Franchise",
  ecommerce: "Ecommerce",
  other: "Other",
};

function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: string;
  onEdit: (step: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors"
        >
          <Edit3 className="h-3 w-3" />
          Edit
        </button>
      </div>
      <div className="mt-3 text-sm text-text-secondary space-y-1">
        {children}
      </div>
    </div>
  );
}

function LabelValue({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <p>
      <span className="text-text-muted">{label}:</span>{" "}
      <span className="text-text-primary">{value}</span>
    </p>
  );
}

export function ReviewSubmit({ data, onEditStep, isSubmitting }: ReviewSubmitProps) {
  const showA2P = needsA2P(data.services || []);
  const showLeads = needsLeads(data.services || []);
  const showCalendar = needsCalendar(data.services || []);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Review & submit</h2>
        <p className="mt-1 text-text-secondary">
          Double-check everything. You can edit any section before submitting.
        </p>
      </div>

      <ReviewSection title="Services" step="services" onEdit={onEditStep}>
        <div className="flex flex-wrap gap-2">
          {data.services?.map((s) => (
            <span
              key={s}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              {serviceLabels[s]}
            </span>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection title="Business" step="business" onEdit={onEditStep}>
        <LabelValue label="Legal name" value={data.business?.legalName} />
        <LabelValue label="DBA" value={data.business?.dbaName} />
        <LabelValue
          label="Address"
          value={
            data.business?.address
              ? `${data.business.address.street}, ${data.business.address.city}, ${data.business.address.state} ${data.business.address.zip}`
              : undefined
          }
        />
        <LabelValue label="Website" value={data.business?.website} />
        <LabelValue label="Industry" value={industryLabels[data.business?.industry]} />
        <LabelValue label="Years in business" value={data.business?.yearsInBusiness} />
        <LabelValue
          label="Avg ticket"
          value={
            data.business?.averageTicket
              ? `$${data.business.averageTicket.toLocaleString()}`
              : undefined
          }
        />
        <LabelValue label="EIN" value={data.business?.einNumber} />
        {data.einDocumentUrl && (
          <p>
            <span className="text-text-muted">EIN document:</span>{" "}
            <a
              href={data.einDocumentUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              View uploaded file
            </a>
          </p>
        )}
        <LabelValue label="Primary contact" value={data.contacts?.primary?.name} />
        <LabelValue label="Contact email" value={data.contacts?.primary?.email} />
      </ReviewSection>

      {showA2P && (
        <ReviewSection title="A2P Compliance" step="a2p" onEdit={onEditStep}>
          <LabelValue label="Business type" value={data.a2p?.businessType} />
          <LabelValue label="Employees" value={data.a2p?.employeeCount} />
          <LabelValue label="Use case" value={data.a2p?.useCase} />
          <LabelValue label="Monthly volume" value={data.a2p?.monthlyVolume} />
          <LabelValue label="Existing number to port" value={data.a2p?.smsPhoneNumber} />
          <LabelValue label="Call forwarding" value={data.a2p?.callForwardingNumber} />
          <LabelValue
            label="TOS accepted"
            value={data.a2p?.tosAccepted ? "Yes" : "No"}
          />
          <LabelValue
            label="Needs privacy policy"
            value={data.a2p?.needsPrivacyPolicy ? "Yes" : "No"}
          />
        </ReviewSection>
      )}


      {showCalendar && (
        <ReviewSection title="Calendar & GHL" step="calendar" onEdit={onEditStep}>
          <LabelValue label="GHL invitation email" value={data.calendar?.ghlInvitationEmail} />
          <LabelValue label="Duration" value={`${data.calendar?.appointmentDuration} min`} />
          <LabelValue label="Buffer" value={`${data.calendar?.bufferTime} min`} />
          <LabelValue
            label="Days"
            value={data.calendar?.availableDays?.join(", ")}
          />
          <LabelValue
            label="Hours"
            value={
              data.calendar?.availableHours
                ? `${data.calendar.availableHours.start} – ${data.calendar.availableHours.end}`
                : undefined
            }
          />
          <LabelValue label="Same day" value={data.calendar?.allowSameDay ? "Yes" : "No"} />
          <LabelValue label="Types" value={data.calendar?.appointmentTypes?.join(", ")} />
        </ReviewSection>
      )}

      <ReviewSection title="Notifications" step="contacts" onEdit={onEditStep}>
        {data.notifications?.recipients?.map((r, i) => (
          <p key={i}>
            {r.role} — {r.email}
            {r.phone && ` (${r.phone})`}
          </p>
        ))}
        <LabelValue label="Methods" value={data.notifications?.methods?.join(", ")} />
        <LabelValue label="Timing" value={data.notifications?.timing} />
      </ReviewSection>

      {showLeads && data.leads && (
        <ReviewSection title="Leads" step="leads" onEdit={onEditStep}>
          {data.leadCsvUrl && (
            <p>
              <span className="text-text-muted">Lead list:</span>{" "}
              <a
                href={data.leadCsvUrl}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                View uploaded CSV
              </a>
            </p>
          )}
          <LabelValue label="Campaign context" value={data.leads.campaignContext} />
          <LabelValue label="Objections" value={data.leads.commonObjections} />
          <LabelValue label="Follow-up" value={data.leads.currentFollowUp} />
        </ReviewSection>
      )}

      <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
        <p className="text-sm text-text-secondary">
          By submitting, you confirm that all information is accurate and that you have
          the authority to set up these services on behalf of your business.
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit onboarding"}
      </Button>
    </div>
  );
}
