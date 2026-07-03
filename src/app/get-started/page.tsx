import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, MessageSquare, Zap, Rocket, Shield, Clock, FileCheck } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Choose your services",
    description:
      "Select what you need — Database Reactivation, AI Voice Receptionist, Speed to Lead, Live Chat, or Reputation Management. Mix and match.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Tell us about your business",
    description:
      "Share your business profile, A2P compliance details, and how you want appointments handled. Takes about 5 minutes.",
    icon: MessageSquare,
  },
  {
    number: "03",
    title: "Upload your data",
    description:
      "Drop in your lead list (CSV) and EIN confirmation. We handle the rest — no technical work on your end.",
    icon: FileCheck,
  },
  {
    number: "04",
    title: "We build, you approve",
    description:
      "Our team sets up your campaigns, calendars, and GHL integration. You'll review messaging before anything goes live.",
    icon: Zap,
  },
  {
    number: "05",
    title: "Go live in 48 hours",
    description:
      "Once approved, campaigns launch. You start seeing re-engaged leads and booked appointments within 48 hours.",
    icon: Rocket,
  },
];

const guarantees = [
  {
    icon: Shield,
    title: "No setup fees",
    description: "You only pay when it works. No hidden costs, no retainers.",
  },
  {
    icon: Clock,
    title: "48-hour launch",
    description: "From onboarding submission to live campaigns in 2 business days.",
  },
  {
    icon: FileCheck,
    title: "500-lead free trial",
    description: "Test the system with zero risk. See results before committing.",
  },
];

export default function GetStartedPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-text-muted">
              Client onboarding
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary md:text-6xl">
              Get started in 5 minutes
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Complete your onboarding profile so we can launch your campaigns
              fast. The more detail you provide, the better your results.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/onboarding">
                <Button size="lg" className="gap-2">
                  Start onboarding <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="secondary" size="lg">
                  Back to homepage
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-text-primary md:text-4xl">
                How onboarding works
              </h2>
              <p className="mx-auto max-w-xl text-text-secondary">
                Five simple steps. Most clients finish in under 10 minutes.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-elevated p-6 sm:flex-row sm:items-start sm:gap-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="text-xs font-bold text-accent">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {guarantees.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-surface-elevated p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-surface-elevated p-8 text-center md:p-16">
            <h2 className="mb-4 text-2xl font-bold text-text-primary md:text-4xl">
              Ready to reactivate your dead leads?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-text-secondary">
              Complete your onboarding now and we'll have your campaigns live
              within 48 hours.
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="gap-2">
                Start onboarding <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
