"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Calendar, CreditCard } from "lucide-react";
import Link from "next/link";

const trustItems = [
  { icon: Shield, text: "No setup fees" },
  { icon: Calendar, text: "Free 500-lead trial" },
  { icon: CreditCard, text: "Pay only when it works" },
];

export function DemoCta() {
  return (
    <section id="pricing" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-text-muted">
            Get started
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            Stop leaving money on the table
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Every lead you paid for and forgot about is still valuable. Book a
            free demo and see what your dead list is worth.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/get-started">
              <Button size="lg" className="gap-2">
                Get started <ArrowRight size={18} />
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              className="gap-2"
              onClick={() =>
                window.open(
                  "https://api.leadconnectorhq.com/widget/bookings/brandpop",
                  "_blank"
                )
              }
            >
              Book a free demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {trustItems.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-sm text-text-secondary"
              >
                <item.icon size={16} className="text-accent" />
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
