import { Controller } from "react-hook-form";
import { serviceTypes } from "@/lib/onboarding/schema";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/*
  Ledger rows per DESIGN.md: mono index, serif name, sans description,
  right-aligned mono term column. The lucide icon tiles are gone — the design
  system has no icon-in-a-rounded-square vocabulary, and they read as template.

  The term column states the pricing model up front. DBR is the only
  performance-priced service, so it gets --booked; the rest are flat monthly.
*/
const serviceConfig = {
  dbr: {
    label: "Database Reactivation",
    description: "AI-powered SMS outreach that reactivates cold leads and past customers.",
    term: "pay per booked appt",
    performancePriced: true,
  },
  ai_voice: {
    label: "AI Voice Receptionist",
    description: "Never miss a call. AI answers, qualifies, and books appointments 24/7.",
    term: "flat monthly",
    performancePriced: false,
  },
  speed_to_lead: {
    label: "Speed to Lead",
    description: "Instant response to new leads. First contact in under 60 seconds.",
    term: "flat monthly",
    performancePriced: false,
  },
  live_chat: {
    label: "Live Chat",
    description: "AI-powered website chat that captures visitors who never fill out a form.",
    term: "flat monthly",
    performancePriced: false,
  },
  reputation_management: {
    label: "Reputation Management",
    description: "Automatically ask happy customers for Google reviews after every visit.",
    term: "flat monthly",
    performancePriced: false,
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

interface ServiceSelectionProps {
  control: any;
}

export function ServiceSelection({ control }: ServiceSelectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-[clamp(24px,2.6vw,32px)] font-normal leading-[1.12] tracking-[-0.015em] text-ink">
          Which services are we setting up?
        </h2>
        <p className="mt-2 text-ink-soft">
          Select all that apply. You can add more services later.
        </p>
      </div>

      <Controller
        name="services"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <div className="border-t border-ink">
              {serviceTypes.map((service, index) => {
                const config = serviceConfig[service];
                const isSelected = field.value?.includes(service);

                return (
                  <button
                    key={service}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      const current = field.value ?? [];
                      if (isSelected) {
                        field.onChange(current.filter((s: string) => s !== service));
                      } else {
                        field.onChange([...current, service]);
                      }
                    }}
                    className={cn(
                      "flex w-full items-baseline gap-4 border-b border-rule px-2 py-4 text-left transition-colors",
                      isSelected ? "bg-lime/25" : "hover:bg-lime/10"
                    )}
                  >
                    <span className="w-6 shrink-0 font-mono text-xs text-ink-faint">
                      {isSelected ? (
                        <Check className="h-4 w-4 text-ink" aria-label="selected" />
                      ) : (
                        pad(index + 1)
                      )}
                    </span>
                    <span className="flex-1">
                      <span className="block font-serif text-lg text-ink">
                        {config.label}
                      </span>
                      <span className="mt-1 block text-sm text-ink-soft">
                        {config.description}
                      </span>
                      <span
                        className={cn(
                          "mt-1.5 block font-mono text-xs sm:hidden",
                          config.performancePriced ? "text-booked" : "text-ink-soft"
                        )}
                      >
                        {config.term}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "hidden shrink-0 font-mono text-xs sm:block",
                        config.performancePriced ? "text-booked" : "text-ink-soft"
                      )}
                    >
                      {config.term}
                    </span>
                  </button>
                );
              })}
            </div>
            {fieldState.error && (
              <p className="mt-3 font-mono text-xs text-error">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
