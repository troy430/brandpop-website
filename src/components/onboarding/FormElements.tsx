import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Night Shift Ledger form controls. See DESIGN.md.

  The register: a printed intake sheet. Labels are IBM Plex Mono (mono is the
  font of proof), fields are --bone-deep paper wells with hairline ink rules,
  and the required marker is the wordmark's own asterisk device (.star-mark).
  Lime appears only on focus — the highlighter landing on the active field.
*/

// Field labels are mono but NOT uppercase — several run past 50 characters
// ("In-person address (if different from business address)") and shout in caps.
// Uppercase + 0.16em tracking stays reserved for section kickers.
const labelClass = "mb-2 block font-mono text-xs text-ink-soft";

// --dead reads as red at 3.6:1 on --card: fine for a border (WCAG 1.4.11 asks
// 3:1 for UI boundaries), not for the message text, which uses --dead-deep.
const fieldClass =
  "w-full rounded-xl border bg-bone-deep px-4 py-3 text-base text-ink placeholder:text-text-muted transition-colors focus:border-ink focus:outline-none focus:ring-[3px] focus:ring-lime";
const fieldBorder = (error?: string) => (error ? "border-dead" : "border-rule");

const errorClass = "mt-2 font-mono text-xs text-error";

function RequiredMark() {
  // The asterisk is the brand device, not a red warning glyph.
  return (
    <span className="star-mark ml-1" aria-hidden="true">
      *
    </span>
  );
}

function FieldLabel({
  children,
  required,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label className={labelClass} htmlFor={htmlFor}>
      {children}
      {required && <RequiredMark />}
    </label>
  );
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, required, type = "text", ...props }, ref) => {
    const id = React.useId();
    const fieldId = props.id ?? id;
    return (
      <div className="w-full">
        {label && (
          <FieldLabel required={required} htmlFor={fieldId}>
            {label}
          </FieldLabel>
        )}
        <input
          id={fieldId}
          type={type}
          aria-invalid={error ? true : undefined}
          className={cn(fieldClass, fieldBorder(error), className)}
          ref={ref}
          {...props}
          value={props.value ?? ""}
        />
        {error && <p className={errorClass}>{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  required?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, required, ...props }, ref) => {
    const id = React.useId();
    const fieldId = props.id ?? id;
    return (
      <div className="w-full">
        {label && (
          <FieldLabel required={required} htmlFor={fieldId}>
            {label}
          </FieldLabel>
        )}
        <textarea
          id={fieldId}
          aria-invalid={error ? true : undefined}
          className={cn(
            fieldClass,
            fieldBorder(error),
            "min-h-[100px] resize-y",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className={errorClass}>{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, required, ...props }, ref) => {
    const id = React.useId();
    const fieldId = props.id ?? id;
    return (
      <div className="w-full">
        {label && (
          <FieldLabel required={required} htmlFor={fieldId}>
            {label}
          </FieldLabel>
        )}
        {/* appearance-none with no chevron left the select looking like a text
            input, so it read as un-clickable. */}
        <div className="relative">
          <select
            id={fieldId}
            aria-invalid={error ? true : undefined}
            className={cn(
              fieldClass,
              fieldBorder(error),
              "appearance-none pr-11",
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          />
        </div>
        {error && <p className={errorClass}>{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
  required?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, label, required, ...props }, ref) => {
    const id = React.useId();
    const fieldId = props.id ?? id;
    return (
      <div className={cn("flex items-start gap-3", className)}>
        <input
          id={fieldId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 rounded-[3px] border border-ink accent-lime focus:outline-none focus:ring-[3px] focus:ring-lime"
          ref={ref}
          {...props}
        />
        <div>
          {/* Consent copy runs to full sentences (the A2P line is 122 chars),
              so checkbox labels stay in body sans, not mono. */}
          <label htmlFor={fieldId} className="text-sm text-ink-soft">
            {label}
            {required && <RequiredMark />}
          </label>
          {error && <p className={errorClass}>{error}</p>}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export interface RadioGroupProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  error,
  required,
}: RadioGroupProps) {
  return (
    <div className="w-full">
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(opt.value)}
              className={cn(
                // Matches the primary button: 3px radius, ink border, hard
                // offset shadow that the press translates into.
                "rounded-[3px] border px-4 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-[3px] focus:ring-lime",
                selected
                  ? "border-ink bg-lime text-ink shadow-[2px_2px_0_var(--ink)]"
                  : "border-rule bg-card text-ink-soft hover:border-ink hover:text-ink"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

export interface FileUploadProps {
  label?: string;
  accept?: string;
  onFileSelect: (file: File | null) => void;
  fileName?: string;
  error?: string;
  required?: boolean;
}

export function FileUpload({
  label,
  accept,
  onFileSelect,
  fileName,
  error,
  required,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      {/* Was a div with onClick — unreachable by keyboard. */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "w-full cursor-pointer rounded-xl border border-dashed px-6 py-8 text-center transition-colors focus:outline-none focus:ring-[3px] focus:ring-lime",
          error ? "border-dead" : "border-rule hover:border-ink",
          fileName ? "bg-lime/12" : "bg-bone-deep"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
        />
        {fileName ? (
          <div>
            {/* The filename is evidence, so it sets in mono. */}
            <p className="font-mono text-sm text-ink">{fileName}</p>
            <p className="mt-1 font-mono text-xs text-text-muted">
              click to change file
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-ink-soft">
              Drop a file here, or click to browse
            </p>
            <p className="mt-1 font-mono text-xs text-text-muted">
              {accept ? `accepted: ${accept}` : "PDF, CSV, or images"}
            </p>
          </div>
        )}
      </button>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}
