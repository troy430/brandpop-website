import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, required, type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "w-full rounded-lg border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30",
            error ? "border-error" : "border-border",
            className
          )}
          ref={ref}
          {...props}
          value={props.value ?? ""}
        />
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
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
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            "w-full rounded-lg border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 resize-y min-h-[100px]",
            error ? "border-error" : "border-border",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
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
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <select
          className={cn(
            "w-full rounded-lg border bg-surface px-4 py-3 text-sm text-text-primary transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 appearance-none",
            error ? "border-error" : "border-border",
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
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
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
    return (
      <div className={cn("flex items-start gap-3", className)}>
        <input
          type="checkbox"
          className="mt-0.5 h-5 w-5 rounded border-border bg-surface text-accent focus:ring-accent/30"
          ref={ref}
          {...props}
        />
        <div>
          <span className="text-sm text-text-secondary">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </span>
          {error && <p className="mt-0.5 text-xs text-error">{error}</p>}
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
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  error,
}: RadioGroupProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
              value === opt.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-surface text-text-secondary hover:border-text-muted"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

export interface FileUploadProps {
  label?: string;
  accept?: string;
  onFileSelect: (file: File | null) => void;
  fileName?: string;
  error?: string;
}

export function FileUpload({
  label,
  accept,
  onFileSelect,
  fileName,
  error,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors hover:border-accent/50",
          error ? "border-error" : "border-border",
          fileName ? "bg-accent/5" : "bg-surface"
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
            <p className="text-sm font-medium text-accent">{fileName}</p>
            <p className="mt-1 text-xs text-text-muted">
              Click to change file
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-text-secondary">
              Drop a file here, or click to browse
            </p>
            <p className="mt-1 text-xs text-text-muted">
              {accept ? `Accepted: ${accept}` : "PDF, CSV, or images"}
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
