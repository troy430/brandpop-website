"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "$100K+",
    label: "Pipeline generated in one week for a solar client during Christmas",
  },
  {
    value: "18%",
    label: "Average response rate on reactivated dead leads",
  },
  {
    value: "0",
    label: "Upfront fees. You only pay when the AI books appointments",
  },
];

const testimonial = {
  quote:
    "We generated $100K in pipeline during Christmas week — when no one buys solar. The AI kept conversations going while our team was off.",
  author: "Solar installer",
  location: "Canada",
};

export function SocialProof() {
  return (
    <section id="proof" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Stats */}
        <div className="mb-24 grid gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <div className="mb-3 text-5xl font-extrabold text-accent md:text-6xl">
                {stat.value}
              </div>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl rounded-3xl border border-border bg-surface p-10 md:p-16"
        >
          <blockquote className="mb-8 text-2xl font-medium leading-snug text-text-primary md:text-3xl">
            "{testimonial.quote}"
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-accent/20" />
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {testimonial.author}
              </p>
              <p className="text-sm text-text-muted">{testimonial.location}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
