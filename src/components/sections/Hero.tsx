"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { ParticleBackground } from "./ParticleBackground";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-32 md:pt-32 md:pb-40">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ParticleBackground />
        
        {/* Large gradient orb top-right */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl"
        />
        {/* Purple orb bottom-left */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl"
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #F4F4EF 1px, transparent 1px), linear-gradient(to bottom, #F4F4EF 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-6 inline-block rounded-full border border-border bg-surface/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-text-secondary backdrop-blur-sm">
            Performance-based AI marketing
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-6xl lg:text-7xl"
        >
          Reactivate dead leads with{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-accent via-teal-300 to-accent bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent">
              AI
            </span>
          </span>
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
        >
          Turn dormant lead lists into revenue with conversational AI SMS and
          voice. Built for solar, dental, roofing, legal, and home service
          businesses with 1,000+ leads sitting cold.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/get-started">
            <Button size="lg" className="gap-2">
              Get started <ArrowRight size={18} />
            </Button>
          </Link>
          <a href="#demo">
            <Button variant="secondary" size="lg" className="gap-2">
              <Play size={18} /> See how it works
            </Button>
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-sm text-text-muted"
        >
          Or{" "}
          <a
            href="https://api.leadconnectorhq.com/widget/bookings/brandpop"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-text-secondary"
          >
            book a free demo
          </a>
        </motion.p>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 flex max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface/60 px-8 py-6 backdrop-blur-sm"
        >
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-text-muted">
              Trusted by businesses in
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm font-semibold text-text-secondary">
            <span>Solar</span>
            <span className="text-border">|</span>
            <span>Dental</span>
            <span className="text-border">|</span>
            <span>Roofing</span>
            <span className="text-border">|</span>
            <span>Legal</span>
            <span className="text-border">|</span>
            <span>Insurance</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
