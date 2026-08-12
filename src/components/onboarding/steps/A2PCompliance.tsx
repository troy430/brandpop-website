import { Controller } from "react-hook-form";
import {
  businessTypes,
  businessTypeLabels,
  useCases,
  useCaseLabels,
  monthlyVolumes,
  monthlyVolumeLabels,
} from "@/lib/onboarding/schema";
import { Input, Select, Textarea, Checkbox } from "@/components/onboarding/FormElements";

// Derived from the schema label maps so the dropdown and the review screen can
// never disagree about what a stored value is called.
const businessTypeOptions = [
  { value: "", label: "Select business type" },
  ...businessTypes.map((v) => ({ value: v, label: businessTypeLabels[v] })),
];

const useCaseOptions = [
  { value: "", label: "Select use case" },
  ...useCases.map((v) => ({ value: v, label: useCaseLabels[v] })),
];

const volumeOptions = [
  { value: "", label: "Select expected volume" },
  ...monthlyVolumes.map((v) => ({ value: v, label: monthlyVolumeLabels[v] })),
];

interface A2PComplianceProps {
  control: any;
}

export function A2PCompliance({ control }: A2PComplianceProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-[clamp(24px,2.6vw,32px)] font-normal leading-[1.12] tracking-[-0.015em] text-ink">A2P compliance setup</h2>
        <p className="mt-1 text-text-secondary">
          Required for all business SMS in the US. Carrier approval takes 24–48 hours.
        </p>
      </div>

      <div className="rounded-xl border border-rule p-5">
        <h3 className="kicker">Business details</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="a2p.businessType"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Business type"
                options={businessTypeOptions}
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="a2p.employeeCount"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Approximate employee count"
                placeholder="10"
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="a2p.useCase"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Primary use case"
                options={useCaseOptions}
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="a2p.monthlyVolume"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Expected monthly message volume"
                options={volumeOptions}
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="a2p.optInMethod"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="How do recipients opt in to receive messages?"
              placeholder="Leads fill out a web form with clear SMS consent language. Existing customers opt in via signed service agreements."
              error={fieldState.error?.message}
              required
              {...field}
            />
          )}
        />

        <div className="rounded-xl border border-rule p-5">
          <h3 className="kicker mb-3">
            Privacy policy
          </h3>
          <p className="text-xs text-text-secondary mb-4">
            A2P 10DLC registration requires a published privacy policy on your
            website. Check the box below and we’ll generate one from your
            business info for you to review and publish.
          </p>
          <Controller
            name="a2p.needsPrivacyPolicy"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="I need a privacy policy for my website"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
      </div>

      <div className="rounded-xl border border-rule p-5">
        <h3 className="kicker">Phone numbers</h3>
        <p className="mt-1 text-xs text-text-muted">
          The SMS number is provisioned by us in your GHL subaccount. We just need your
          main business line for call forwarding and voice services.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="a2p.smsPhoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                label="Existing business number (if you want to port it)"
                placeholder="(555) 123-4567"
                {...field}
              />
            )}
          />
          <Controller
            name="a2p.callForwardingNumber"
            control={control}
            render={({ field }) => (
              <Input
                label="Call forwarding number (for voice services)"
                placeholder="(555) 123-4567"
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="rounded-xl border border-rule p-5">
        <h3 className="kicker mb-3">
          Terms of Service
        </h3>
        <div className="max-h-48 overflow-y-auto rounded-lg border border-border bg-background p-4 text-xs text-text-secondary space-y-2">
          <p>
            <strong>Opting In:</strong> When opted-in, you will receive text messages
            (SMS/MMS) to your mobile number. These kinds of messages may include offers,
            coupons, or other information related to our services.
          </p>
          <p>
            <strong>Opting Out:</strong> You can opt-out of this service at any time by
            texting “STOP” to the phone number. After you text “STOP”, we may send you an
            SMS reply to confirm that you have been unsubscribed.
          </p>
          <p>
            <strong>Help:</strong> If you are experiencing any issues, you can reply with
            the keyword “HELP”.
          </p>
          <p>
            Carriers are not liable for delayed or undelivered messages. Message and data
            rates may apply.
          </p>
        </div>
        <div className="mt-4">
          <Controller
            name="a2p.tosAccepted"
            control={control}
            render={({ field, fieldState }) => (
              <Checkbox
                label="I confirm that my business has proper opt-in consent from all message recipients and complies with A2P 10DLC requirements."
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                error={fieldState.error?.message}
                required
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
