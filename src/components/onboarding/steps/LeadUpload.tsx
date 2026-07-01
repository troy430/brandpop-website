import { Control, Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { OnboardingData } from "@/lib/onboarding/schema";
import { Textarea, FileUpload } from "@/components/onboarding/FormElements";
import { uploadFile } from "@/lib/upload";

interface LeadUploadProps {
  control: any;
}

export function LeadUpload({ control }: LeadUploadProps) {
  const { setValue } = useFormContext();
  const [uploadStatus, setUploadStatus] = useState<{
    fileName?: string;
    uploading?: boolean;
    error?: string;
  }>({});

  const handleCsvUpload = async (file: File | null) => {
    if (!file) return;
    setUploadStatus({ fileName: file.name, uploading: true });
    try {
      const result = await uploadFile(file, "lead_csv");
      setValue("leadCsvPath", result.path, { shouldValidate: false });
      setValue("leadCsvUrl", result.url, { shouldValidate: false });
      setUploadStatus({ fileName: file.name, uploading: false });
    } catch (err: any) {
      setUploadStatus({ fileName: file.name, error: err.message || "Upload failed" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Lead data</h2>
        <p className="mt-1 text-text-secondary">
          Only needed for Database Reactivation. Skip this step if you're only setting up AEO or Voice.
        </p>
      </div>


      <FileUpload
        label="Upload lead list (CSV)"
        accept=".csv"
        fileName={uploadStatus.fileName}
        error={uploadStatus.error}
        onFileSelect={(file) => {
          handleCsvUpload(file);
        }}
      />
      {uploadStatus.uploading && (
        <p className="text-xs text-text-muted">Uploading...</p>
      )}

      <Controller
        name="leads.campaignContext"
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            label="Describe your product / service"
            placeholder="We install residential solar panels with $0 down financing. Average system size is 8kW and saves customers $150+/month on electricity."
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="leads.commonObjections"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Common objections you hear from leads"
            placeholder="Too expensive, waiting for roof replacement, not sure about savings, need to talk to spouse..."
            {...field}
          />
        )}
      />

      <Controller
        name="leads.currentFollowUp"
        control={control}
          render={({ field }) => (
            <Textarea
              label="Current follow-up process (if any)"
              placeholder="Sales reps call within 24 hours, then email after 3 days, then nothing..."
              {...field}
            />
          )}
        />

      <Controller
        name="leads.bestContactTimes"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Best days / times to message leads"
            placeholder="Weekdays 9am–6pm, avoid Sundays"
            {...field}
          />
        )}
      />

      <Controller
        name="leads.exclusions"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Any leads to exclude?"
            placeholder="Do not contact leads from the last 30 days, existing customers, or anyone on our DNC list..."
            {...field}
          />
        )}
      />
    </div>
  );
}
