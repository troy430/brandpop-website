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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-text-muted">
            How it works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            From dead list to revenue in 4 steps
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="mb-4 text-5xl font-extrabold text-surface-elevated">
                {step.number}
              </div>
              <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                <step.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-text-primary">
                {step.title}
  </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
