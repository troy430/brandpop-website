import { Control, Controller, useFieldArray } from "react-hook-form";
import { OnboardingData } from "@/lib/onboarding/schema";
import { Input, Select, Checkbox } from "@/components/onboarding/FormElements";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const notificationMethodOptions = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "ghl", label: "GHL Pipeline Update" },
  { value: "slack", label: "Slack" },
  { value: "sheet", label: "Google Sheet" },
];

interface ContactsSetupProps {
  control: any;
}

export function ContactsSetup({ control }: ContactsSetupProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "notifications.recipients",
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Contacts & notifications</h2>
        <p className="mt-1 text-text-secondary">
          Who should receive alerts when appointments are booked or leads reply?
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">
            Notification recipients
          </h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              append({ role: "", email: "", phone: "" })
            }
          >
            <Plus className="mr-1 h-4 w-4" />
            Add recipient
          </Button>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Controller
                name={`notifications.recipients.${index}.role`}
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    label={index === 0 ? "Role" : undefined}
                    placeholder="Sales Manager"
                    error={fieldState.error?.message}
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name={`notifications.recipients.${index}.email`}
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    label={index === 0 ? "Email" : undefined}
                    type="email"
                    placeholder="sales@company.com"
                    error={fieldState.error?.message}
                    required
                    {...field}
                  />
                )}
              />
              <div className="flex items-end gap-2">
                <Controller
                  name={`notifications.recipients.${index}.phone`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      label={index === 0 ? "Phone (optional)" : undefined}
                      placeholder="(555) 123-4567"
                      {...field}
                    />
                  )}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mb-0.5 rounded-lg p-2 text-text-muted hover:text-error transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          Notification methods<span className="text-error ml-0.5">*</span>
        </h3>
        <Controller
          name="notifications.methods"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {notificationMethodOptions.map((method) => {
                  const isSelected = field.value?.includes(method.value as any);
                  return (
                    <Checkbox
                      key={method.value}
                      label={method.label}
                      checked={isSelected}
                      onChange={(e) => {
                        const current = field.value ?? [];
                        if (e.target.checked) {
                          field.onChange([...current, method.value]);
                        } else {
                          field.onChange(
                            current.filter((m: string) => m !== method.value)
                          );
                        }
                      }}
                    />
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

      <Controller
        name="notifications.timing"
        control={control}
        render={({ field }) => (
          <Select
            label="Notification timing"
            options={[
              { value: "immediate", label: "Immediate — as soon as it happens" },
              { value: "digest", label: "Daily digest — once per day" },
              { value: "weekly", label: "Weekly summary" },
            ]}
            {...field}
          />
        )}
      />

      <Controller
        name="notifications.slackWebhook"
        control={control}
        render={({ field }) => (
          <Input
            label="Slack webhook URL (optional)"
            placeholder="https://hooks.slack.com/services/..."
            {...field}
          />
        )}
      />
    </div>
  );
}
