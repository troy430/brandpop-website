export const metadata = {
  title: "Get Started — Brandpop*",
  description: "Onboard your business in minutes. Set up AI-powered lead reactivation, voice, and visibility services.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-background">
      {children}
    </div>
  );
}
