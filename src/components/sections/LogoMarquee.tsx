"use client";

import { motion } from "framer-motion";

const verticals = [
  "Solar",
  "Dental",
  "Roofing",
  "Legal",
  "Insurance",
  "HVAC",
  "Plastic Surgery",
  "Franchise",
  "Ecommerce",
  "Home Services",
];

export function LogoMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/30 py-8">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
      
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-max gap-12"
      >
        {[...verticals, ...verticals].map((vertical, i) => (
          <div
            key={`${vertical}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap text-lg font-semibold text-text-muted"
          >
            <div className="h-2 w-2 rounded-full bg-accent/40" />
            {vertical}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
