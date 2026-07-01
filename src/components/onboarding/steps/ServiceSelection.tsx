import { Control, Controller } from "react-hook-form";
import { OnboardingData, serviceTypes } from "@/lib/onboarding/schema";
import { cn } from "@/lib/utils";
import { Database, Phone, Zap, MessageSquare, Star } from "lucide-react";

const serviceConfig = {
  dbr: {
    label: "Database Reactivation",
    description: "AI-powered SMS outreach that reactivates lapsed patients and dead leads.",
    icon: Database,
  },
  ai_voice: {
    label: "AI Voice Receptionist",
    description: "Never miss a call. AI answers, qualifies, and books appointments 24/7.",
    icon: Phone,
  },
  speed_to_lead: {
    label: "Speed to Lead",
    description: "Instant response to new leads. First contact in under 60 seconds.",
    icon: Zap,
  },
  live_chat: {
    label: "Live Chat",
    description: "AI-powered website chat that captures visitors who never fill out a form.",
    icon: MessageSquare,
  },
  reputation_management: {
    label: "Reputation Management",
    description: "Automatically ask happy customers for Google reviews after every visit.",
    icon: Star,
  },
};

interface ServiceSelectionProps {
  control: any;
}

export function ServiceSelection({ control }: ServiceSelectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          Which services are we setting up?
        </h2>
        <p className="mt-1 text-text-secondary">
          Select all that apply. You can add more services later.
        </p>
      </div>

      <Controller
        name="services"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-3">
            {serviceTypes.map((service) => {
              const config = serviceConfig[service];
              const Icon = config.icon;
              const isSelected = field.value?.includes(service);

              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => {
                    const current = field.value ?? [];
                    if (isSelected) {
                      field.onChange(current.filter((s: string) => s !== service));
                    } else {
                      field.onChange([...current, service]);
                    }
                  }}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all",
                    isSelected
                      ? "border-accent bg-accent/5"
                      : "border-border bg-surface hover:border-text-muted"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      isSelected ? "bg-accent text-background" : "bg-surface-elevated text-text-muted"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={cn(
                          "font-semibold",
                          isSelected ? "text-accent" : "text-text-primary"
                        )}
                      >
                        {config.label}
                      </h3>
                      {isSelected && (
                        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">
                      {config.description}
                    </p>
                  </div>
                </button>
              );
            })}
            {fieldState.error && (
              <p className="text-sm text-error">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
