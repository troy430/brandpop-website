"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Database, Zap, Search, Phone } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    icon: Database,
    title: "Database Reactivation",
    description:
      "AI SMS that revives dead leads sitting in your CRM. Short, personalized, conversational messages — not blasts. You only pay when it books appointments.",
    stat: "18% avg response rate",
  },
  {
    icon: Zap,
    title: "Speed to Lead",
    description:
      "The moment a prospect submits a form, our AI fires back. Response time is everything — we make sure you never leave a hot lead waiting.",
    stat: "Sub-60 second response",
  },
  {
    icon: Search,
    title: "Answer Engine Optimization",
    description:
      "Get cited on ChatGPT, Perplexity, and Google AI Overviews. The easiest foot-in-the-door service — no technical setup required.",
    stat: "Get cited on AI search",
  },
  {
    icon: Phone,
    title: "AI Voice Receptionist",
    description:
      "Answers calls, qualifies leads, and books appointments 24/7. Never miss another opportunity because the phone went to voicemail.",
    stat: "24/7 coverage",
  },
];

function TiltCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      key={service.title}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent/30"
    >
      <div className="mb-6 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
        <service.icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="mb-3 text-xl font-bold text-text-primary">
        {service.title}
      </h3>
      <p className="mb-6 leading-relaxed text-text-secondary">
        {service.description}
      </p>
      <div className="absolute bottom-8 right-8 text-xs font-semibold uppercase tracking-wider text-accent">
        {service.stat}
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-text-muted">
            What we do
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            Four ways we drive revenue
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2" style={{ perspective: 1000 }}>
          {services.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
