import { stepLabels, type OnboardingStep } from "@/lib/onboarding/schema";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: OnboardingStep[];
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  onStepClick?: (step: OnboardingStep) => void;
}

export function StepIndicator({ steps, currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step);
          const isCurrent = step === currentStep;
          const isPending = index > currentIndex;

          const clickable = !isPending && onStepClick;

          return (
            <div key={step} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => clickable && onStepClick(step)}
                disabled={!clickable}
                className={cn(
                  "flex flex-col items-center",
                  clickable && "cursor-pointer hover:opacity-80"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    isCompleted && "bg-accent text-background",
                    isCurrent && "border-2 border-accent bg-surface text-accent",
                    isPending && "border border-border bg-surface text-text-muted"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span
                  className={cn(
                    "mt-1.5 hidden text-xs font-medium sm:block",
                    isCurrent ? "text-accent" : "text-text-muted"
                  )}
                >
                  {stepLabels[step]}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-px flex-1 transition-colors sm:mx-4",
                    isCompleted ? "bg-accent" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
