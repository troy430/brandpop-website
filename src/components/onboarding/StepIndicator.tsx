import { stepLabels, type OnboardingStep } from "@/lib/onboarding/schema";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: OnboardingStep[];
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  onStepClick?: (step: OnboardingStep) => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

/*
  Ledger rows, not a stock wizard: mono indices under a 1px ink rule, with the
  active step underlined by the 2px lime the design system uses for ghost links.
  Labels hide under sm — the mono counter above carries the position on mobile.
*/
export function StepIndicator({ steps, currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between font-mono text-xs text-text-muted">
        <span>
          step {pad(currentIndex + 1)} of {pad(steps.length)}
        </span>
        <span className="text-ink-soft sm:hidden">{stepLabels[currentStep]}</span>
      </div>

      <div className="flex border-t border-ink">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step);
          const isCurrent = step === currentStep;
          const isPending = index > currentIndex;
          const clickable = !isPending && onStepClick;

          return (
            <button
              key={step}
              type="button"
              onClick={() => clickable && onStepClick(step)}
              disabled={!clickable}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex flex-1 items-center gap-1.5 border-b-2 px-1 pb-2 pt-2.5 text-left transition-colors",
                isCurrent && "border-lime",
                isCompleted && !isCurrent && "border-ink/25",
                isPending && "border-rule",
                clickable && "cursor-pointer hover:bg-lime/12"
              )}
            >
              <span
                className={cn(
                  "font-mono text-xs",
                  isCurrent ? "text-ink" : isPending ? "text-text-muted" : "text-ink-soft"
                )}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="h-3.5 w-3.5" aria-label="completed" />
                ) : (
                  pad(index + 1)
                )}
              </span>
              <span
                className={cn(
                  "hidden truncate text-xs sm:block",
                  isCurrent ? "font-medium text-ink" : isPending ? "text-text-muted" : "text-ink-soft"
                )}
              >
                {stepLabels[step]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
