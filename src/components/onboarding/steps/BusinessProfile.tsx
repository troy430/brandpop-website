import { Control, Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { OnboardingData, industries } from "@/lib/onboarding/schema";
import { Input, Select, FileUpload } from "@/components/onboarding/FormElements";
import { uploadFile } from "@/lib/upload";

const industryOptions = [
  { value: "", label: "Select an industry" },
  { value: "solar", label: "Solar" },
  { value: "roofing", label: "Roofing" },
  { value: "dental", label: "Dental" },
  { value: "med_spa", label: "Med Spa" },
  { value: "home_services", label: "Home Services" },
  { value: "legal", label: "Legal" },
  { value: "insurance", label: "Insurance" },
  { value: "fitness", label: "Fitness" },
  { value: "franchise", label: "Franchise" },
  { value: "ecommerce", label: "Ecommerce" },
  { value: "other", label: "Other" },
];

interface BusinessProfileProps {
  control: any;
}

export function BusinessProfile({ control }: BusinessProfileProps) {
  const { setValue, watch } = useFormContext();
  const [uploadStatus, setUploadStatus] = useState<{
    fileName?: string;
    uploading?: boolean;
    error?: string;
  }>({});

  const handleEinUpload = async (file: File | null) => {
    if (!file) return;
    setUploadStatus({ fileName: file.name, uploading: true });
    try {
      const result = await uploadFile(file, "ein_document");
      setValue("einDocumentPath", result.path, { shouldValidate: false });
      setValue("einDocumentUrl", result.url, { shouldValidate: false });
      setUploadStatus({ fileName: file.name, uploading: false });
    } catch (err: any) {
      setUploadStatus({ fileName: file.name, error: err.message || "Upload failed" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Business profile</h2>
        <p className="mt-1 text-text-secondary">
          We need this for A2P registration and to tailor your campaigns.
        </p>
      </div>

      <div className="space-y-4">
        <Controller
          name="business.legalName"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Legal business name"
              placeholder="Acme Solar LLC"
              error={fieldState.error?.message}
              required
              {...field}
            />
          )}
        />

        <Controller
          name="business.dbaName"
          control={control}
          render={({ field }) => (
            <Input
              label="DBA / Brand name (if different)"
              placeholder="Acme Solar"
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="business.address.street"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Street address"
                placeholder="123 Main St"
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="business.address.city"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="City"
                placeholder="Phoenix"
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="business.address.state"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="State"
                placeholder="AZ"
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="business.address.zip"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="ZIP code"
                placeholder="85001"
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="business.website"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Website"
              placeholder="https://acmesolar.com"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="business.industry"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Industry"
                options={industryOptions}
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="business.yearsInBusiness"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Years in business"
                type="number"
                placeholder="5"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="business.averageTicket"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Average deal size / ticket value"
              type="number"
              placeholder="25000"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="business.einNumber"
          control={control}
          render={({ field }) => (
            <Input
              label="EIN (optional — we'll extract from your upload)"
              placeholder="XX-XXXXXXX"
              {...field}
            />
          )}
        />

        <FileUpload
          label="Upload IRS CP 575 or EIN confirmation letter (PDF)"
          accept=".pdf"
          fileName={uploadStatus.fileName}
          error={uploadStatus.error}
          onFileSelect={(file) => {
            handleEinUpload(file);
          }}
        />
        {uploadStatus.uploading && (
          <p className="text-xs text-text-muted">Uploading...</p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-text-primary">Primary contact</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="contacts.primary.name"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Full name"
                placeholder="John Smith"
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="contacts.primary.title"
            control={control}
            render={({ field }) => (
              <Input label="Title" placeholder="Owner" {...field} />
            )}
          />
          <Controller
            name="contacts.primary.email"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label="Email"
                type="email"
                placeholder="john@acmesolar.com"
                error={fieldState.error?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="contacts.primary.phone"
            control={control}
            render={({ field }) => (
              <Input label="Phone" placeholder="(555) 123-4567" {...field} />
            )}
          />
        </div>
      </div>
    </div>
  );
}
