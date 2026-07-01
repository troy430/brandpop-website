import { getSupabase } from "@/lib/supabase";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  MapPin,
  Clock,
  Users,
  FileText,
  Download,
} from "lucide-react";

interface OnboardingRecord {
  id: string;
  created_at: string;
  client_slug: string;
  services: string[];
  business: any;
  contacts: any;
  a2p: any;
  calendar: any;
  notifications: any;
  leads: any;
  ein_document_url?: string;
  lead_csv_url?: string;
}

export const dynamic = "force-dynamic";

export default async function AdminOnboardingPage() {
  const supabase = getSupabase();
  const { data: submissions, error } = await supabase
    .from("onboarding_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Supabase fetch error:", error);
  }

  const records: OnboardingRecord[] = submissions || [];

  const serviceLabels: Record<string, string> = {
    dbr: "DBR",
    ai_voice: "AI Voice",
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

  const useCaseLabels: Record<string, string> = {
    lead_reactivation: "Lead Reactivation",
    appointment_reminders: "Appointment Reminders",
    customer_care: "Customer Care",
    marketing_promotions: "Marketing Promotions",
    follow_up: "Follow-up",
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-text-primary">
            Onboarding submissions
          </h1>
          <p className="mt-1 text-text-secondary">
            {records.length} total submission{records.length !== 1 ? "s" : ""}
          </p>
        </div>

        {records.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface-elevated p-12 text-center">
            <p className="text-text-secondary">No submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {records.map((r) => {
              const business = r.business || {};
              const primary = r.contacts?.primary || {};
              const date = new Date(r.created_at).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              });

              return (
                <div
                  key={r.id}
                  className="rounded-xl border border-border bg-surface-elevated p-5 sm:p-6"
                >
                  {/* Header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-accent" />
                        <h2 className="text-lg font-semibold text-text-primary">
                          {business.legalName || business.dbaName || "Unnamed business"}
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-text-muted" />
                          {date}
                        </span>
                        {business.industry && (
                          <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-text-muted border border-border">
                            {industryLabels[business.industry] || business.industry}
                          </span>
                        )}
                        {business.website && (
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent hover:text-accent-hover transition-colors"
                          >
                            {business.website.replace(/^https?:\/\//, "")}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(r.services || []).map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
                        >
                          {serviceLabels[s] || s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick info row */}
                  <div className="mt-4 grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-3">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Mail className="h-4 w-4 text-text-muted" />
                      <span>{primary.email || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Phone className="h-4 w-4 text-text-muted" />
                      <span>{primary.phone || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="text-text-muted">A2P:</span>
                      <span>
                        {r.a2p?.needsPrivacyPolicy ? "Needs privacy policy" : "Privacy policy OK"}
                        {" · "}
                        {useCaseLabels[r.a2p?.useCase] || r.a2p?.useCase || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Detailed sections */}
                  <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Business Details */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Business
                      </h3>
                      <div className="space-y-1 text-sm text-text-secondary">
                        {business.legalName && (
                          <p><span className="text-text-muted">Legal:</span> {business.legalName}</p>
                        )}
                        {business.dbaName && (
                          <p><span className="text-text-muted">DBA:</span> {business.dbaName}</p>
                        )}
                        {business.address?.street && (
                          <p className="flex items-start gap-1">
                            <MapPin className="h-3.5 w-3.5 mt-0.5 text-text-muted" />
                            <span>
                              {business.address.street}, {business.address.city}, {business.address.state} {business.address.zip}
                            </span>
                          </p>
                        )}
                        {business.yearsInBusiness !== undefined && business.yearsInBusiness !== null && (
                          <p><span className="text-text-muted">Years:</span> {business.yearsInBusiness}</p>
                        )}
                        {business.averageTicket !== undefined && business.averageTicket !== null && (
                          <p><span className="text-text-muted">Avg ticket:</span> ${Number(business.averageTicket).toLocaleString()}</p>
                        )}
                        {business.einNumber && (
                          <p><span className="text-text-muted">EIN:</span> {business.einNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Calendar */}
                    {r.calendar && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                          Calendar
                        </h3>
                        <div className="space-y-1 text-sm text-text-secondary">
                          {r.calendar.ghlInvitationEmail && (
                            <p><span className="text-text-muted">GHL email:</span> {r.calendar.ghlInvitationEmail}</p>
                          )}
                          {r.calendar.availableDays?.length > 0 && (
                            <p className="flex items-start gap-1">
                              <Clock className="h-3.5 w-3.5 mt-0.5 text-text-muted" />
                              <span>{r.calendar.availableDays.join(", ")}</span>
                            </p>
                          )}
                          {r.calendar.availableHours && (
                            <p><span className="text-text-muted">Hours:</span> {r.calendar.availableHours.start} – {r.calendar.availableHours.end}</p>
                          )}
                          {r.calendar.appointmentDuration && (
                            <p><span className="text-text-muted">Duration:</span> {r.calendar.appointmentDuration} min</p>
                          )}
                          {r.calendar.appointmentTypes?.length > 0 && (
                            <p><span className="text-text-muted">Types:</span> {r.calendar.appointmentTypes.join(", ")}</p>
                          )}
                          {r.calendar.zoomLink && (
                            <p><span className="text-text-muted">Zoom:</span> <a href={r.calendar.zoomLink} target="_blank" rel="noreferrer" className="text-accent">link</a></p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Contacts & Notifications */}
                    {r.notifications && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                          Notifications
                        </h3>
                        <div className="space-y-1 text-sm text-text-secondary">
                          {r.notifications.recipients?.map((rec: any, i: number) => (
                            <p key={i} className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-text-muted" />
                              <span>{rec.role} — {rec.email}{rec.phone && ` (${rec.phone})`}</span>
                            </p>
                          ))}
                          {r.notifications.methods?.length > 0 && (
                            <p><span className="text-text-muted">Methods:</span> {r.notifications.methods.join(", ")}</p>
                          )}
                          {r.notifications.timing && (
                            <p><span className="text-text-muted">Timing:</span> {r.notifications.timing}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* A2P Details */}
                    {r.a2p && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                          A2P Compliance
                        </h3>
                        <div className="space-y-1 text-sm text-text-secondary">
                          {r.a2p.businessType && (
                            <p><span className="text-text-muted">Type:</span> {r.a2p.businessType}</p>
                          )}
                          {r.a2p.employeeCount && (
                            <p><span className="text-text-muted">Employees:</span> {r.a2p.employeeCount}</p>
                          )}
                          {r.a2p.monthlyVolume && (
                            <p><span className="text-text-muted">Volume:</span> {r.a2p.monthlyVolume}</p>
                          )}
                          {r.a2p.smsPhoneNumber && (
                            <p><span className="text-text-muted">SMS #:</span> {r.a2p.smsPhoneNumber}</p>
                          )}
                          {r.a2p.callForwardingNumber && (
                            <p><span className="text-text-muted">Forwarding:</span> {r.a2p.callForwardingNumber}</p>
                          )}
                          {r.a2p.sampleMessage && (
                            <p className="italic">"{r.a2p.sampleMessage}"</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Leads */}
                    {r.leads && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                          Leads
                        </h3>
                        <div className="space-y-1 text-sm text-text-secondary">
                          {r.leads.campaignContext && (
                            <p><span className="text-text-muted">Context:</span> {r.leads.campaignContext}</p>
                          )}
                          {r.leads.commonObjections && (
                            <p><span className="text-text-muted">Objections:</span> {r.leads.commonObjections}</p>
                          )}
                          {r.leads.bestContactTimes && (
                            <p><span className="text-text-muted">Best times:</span> {r.leads.bestContactTimes}</p>
                          )}
                          {r.leads.exclusions && (
                            <p><span className="text-text-muted">Exclusions:</span> {r.leads.exclusions}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* File downloads */}
                  {(r.ein_document_url || r.lead_csv_url) && (
                    <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4">
                      {r.ein_document_url && (
                        <a
                          href={r.ein_document_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          EIN Document
                        </a>
                      )}
                      {r.lead_csv_url && (
                        <a
                          href={r.lead_csv_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Lead CSV
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
