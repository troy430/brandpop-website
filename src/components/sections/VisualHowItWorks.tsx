"use client";

import { motion } from "framer-motion";
import { ListChecks, MessageSquare, CalendarCheck, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ListChecks,
    title: "Share your dead lead list",
    description:
      "Upload a CSV of leads you have generated and forgotten about. If you have 1,000+ contacts, you are sitting on a goldmine.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "We customize the AI",
    description:
      "We build a conversational AI trained on your business, tone, and offer. It texts like a top salesperson — not a robot.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Launch a free trial",
    description:
      "We reactivate ~500 leads at no cost. You see real replies, real conversations, and real appointments before spending a dollar.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Scale what works",
    description:
      "Only pay when it performs. Choose per-appointment, appointment + kicker, or revenue share. No monthly fees. No setup costs.",
  },
];

export function VisualHowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #F4F4EF 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-text-muted">
            How it works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            From dead list to revenue in 4 steps
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent md:left-1/2 md:block md:-translate-x-px" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex items-center gap-8 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content side */}
                  <div className={`md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                    <div className={`inline-flex items-center gap-3 mb-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <step.icon size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-extrabold text-surface-elevated">{step.number}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-text-primary">{step.title}</h3>
                    <p className="max-w-sm text-sm leading-relaxed text-text-secondary md:text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-8 hidden md:left-1/2 md:block md:-translate-x-1/2">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </motion.div>
                  </div>

                  {/* Visual side */}
                  <div className={`hidden md:block md:w-1/2 ${isEven ? "md:pl-16" : "md:pr-16"}`}>
                    <motion.div
                      whileInView={{ opacity: 1, scale: 1 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="rounded-2xl border border-border bg-surface p-6"
                    >
                      {i === 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-text-muted">
                            <div className="h-3 w-3 rounded-full bg-red-500/80" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                            <div className="h-3 w-3 rounded-full bg-green-500/80" />
                            <span className="ml-2">dead_leads.csv</span>
                          </div>
                          <div className="space-y-1.5">
                            {["Name, Phone, Source, Date", "Sarah M., 555-0123, Facebook, 2024-03", "James K., 555-0456, Google, 2024-01", "Lisa R., 555-0789, Referral, 2023-11"].map((line, j) => (
                              <div key={j} className="h-2 rounded bg-surface-elevated" style={{ width: `${85 - j * 10}%` }} />
                            ))}
                          </div>
                        </div>
                      )}
                      {i === 1 && (
                        <div className="space-y-3">
                          <div className="rounded-lg bg-background p-3 text-xs text-text-secondary">
                            <span className="text-accent font-mono">system:</span> You are a friendly solar sales rep...
                          </div>
                          <div className="rounded-lg bg-background p-3 text-xs text-text-secondary">
                            <span className="text-accent font-mono">tone:</span> Casual, consultative, no pressure
                          </div>
                          <div className="rounded-lg bg-background p-3 text-xs text-text-secondary">
                            <span className="text-accent font-mono">goal:</span> Book energy audit appointment
                          </div>
                        </div>
                      )}
                      {i === 2 && (
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="text-xs text-text-muted">Trial progress</div>
                            <div className="h-2 w-32 overflow-hidden rounded-full bg-surface-elevated">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "65%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="h-full rounded-full bg-accent"
                              />
                            </div>
                            <div className="text-xs text-text-secondary">327 / 500 leads contacted</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-accent">47</div>
                            <div className="text-xs text-text-muted">Replies</div>
                          </div>
                        </div>
                      )}
                      {i === 3 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-text-secondary">Appointments booked</span>
                            <span className="font-bold text-text-primary">12</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-text-secondary">Closed deals</span>
                            <span className="font-bold text-text-primary">3</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-text-secondary">Revenue generated</span>
                            <span className="font-bold text-accent">$41,400</span>
                          </div>
                          <div className="mt-2 h-px bg-border" />
                          <div className="flex items-center justify-between text-sm font-semibold">
                            <span className="text-text-primary">Your cost</span>
                            <span className="text-accent">$0</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
