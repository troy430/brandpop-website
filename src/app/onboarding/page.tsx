import { Suspense } from "react";
import { OnboardingForm } from "./OnboardingForm";

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-text-secondary">Loading...</div>
        </div>
      }
    >
      <OnboardingForm />
    </Suspense>
  );
}
