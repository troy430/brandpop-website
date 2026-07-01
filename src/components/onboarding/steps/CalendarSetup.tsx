import { Control, Controller } from "react-hook-form";
import { OnboardingData, daysOfWeek } from "@/lib/onboarding/schema";
import { Input, Checkbox } from "@/components/onboarding/FormElements";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

const dayLabels: Record<(typeof daysOfWeek)[number], string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

interface CalendarSetupProps {
  control: any;
}

export function CalendarSetup({ control }: CalendarSetupProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Calendar setup</h2>
        <p className="mt-1 text-text-secondary">
          Connect your availability so we can book appointments directly into your calendar.
        </p>
      </div>

      <Controller
        name="calendar.ghlInvitationEmail"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            label="Email for GHL subaccount invitation"
            placeholder="owner@company.com"
            error={fieldState.error?.message}
            required
            {...field}
          />
        )}
      />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Controller
            name="calendar.appointmentDuration"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Duration (min)"
                type="number"
                placeholder="30"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="calendar.bufferTime"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Buffer (min)"
                type="number"
                placeholder="0"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="calendar.minNotice"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Min notice (hrs)"
                type="number"
                placeholder="24"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="calendar.maxAdvanceBooking"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Max advance (days)"
                type="number"
                placeholder="30"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Available days<span className="text-error ml-0.5">*</span>
          </label>
          <Controller
            name="calendar.availableDays"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => {
                    const isSelected = field.value?.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          const current = field.value ?? [];
                          if (isSelected) {
                            field.onChange(current.filter((d: string) => d !== day));
                          } else {
                            field.onChange([...current, day]);
                          }
                        }}
                        className={cn(
                          "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                          isSelected
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border bg-surface text-text-muted hover:border-text-muted"
                        )}
                      >
                        {dayLabels[day]}
                      </button>
                    );
                  })}
                </div>
                {fieldState.error && (
                  <p className="mt-1 text-xs text-error">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="calendar.availableHours.start"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Start time"
                type="time"
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="calendar.availableHours.end"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="End time"
                type="time"
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="calendar.allowSameDay"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Allow same-day bookings"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          Appointment types<span className="text-error ml-0.5">*</span>
        </h3>
        <div className="space-y-3">
          <Controller
            name="calendar.appointmentTypes"
            control={control}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                {["Phone call", "Zoom", "In-person"].map((type) => {
                  const isSelected = field.value?.includes(type);
                  return (
                    <Checkbox
                      key={type}
                      label={type}
                      checked={isSelected}
                      onChange={(e) => {
                        const current = field.value ?? [];
                        if (e.target.checked) {
                          field.onChange([...current, type]);
                        } else {
                          field.onChange(current.filter((t: string) => t !== type));
                        }
                      }}
                    />
                  );
                })}
                {fieldState.error && (
                  <p className="text-xs text-error">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="calendar.zoomLink"
            control={control}
            render={({ field }) => (
              <Input
                label="Zoom link (if applicable)"
                placeholder="https://zoom.us/j/..."
                {...field}
              />
            )}
          />
          <Controller
            name="calendar.inPersonAddress"
            control={control}
            render={({ field }) => (
              <Input
                label="In-person address (if different from business address)"
                placeholder="123 Main St, Phoenix AZ 85001"
                {...field}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
