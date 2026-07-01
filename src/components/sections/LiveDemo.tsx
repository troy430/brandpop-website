"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const messages = [
  { sender: "ai", text: "Hi Sarah! It's been a while since you looked into solar for your home. With summer rates kicking in, are you still considering it?", delay: 0 },
  { sender: "lead", text: "Actually yes, I've been meaning to look into it again.", delay: 1.8 },
  { sender: "ai", text: "Great timing — we're offering free energy audits this month. When's a good time for a 10-min call?", delay: 3.6 },
  { sender: "lead", text: "Tuesday afternoon works", delay: 5.4 },
  { sender: "ai", text: "Let me check... Tuesday afternoon is fully booked. How about Wednesday at 2pm or Thursday at 10am?", delay: 7.2 },
  { sender: "lead", text: "Wednesday at 2pm works", delay: 9.6 },
  { sender: "ai", text: "Perfect, you're confirmed for Wednesday at 2pm. Talk then!", delay: 11.4 },
];

export function LiveDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [runId, setRunId] = useState(0);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(0);
    const timers: NodeJS.Timeout[] = [];
    messages.forEach((msg, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleCount(i + 1);
        }, msg.delay * 1000)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [runId]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [visibleCount]);

  return (
    <section id="demo" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-text-muted">
            See it in action
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            This is how we reactivate leads
          </h2>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[3rem] border-4 border-surface-elevated bg-background shadow-2xl shadow-black/50"
            >
              {/* Notch */}
              <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-surface-elevated" />
              
              {/* Screen */}
              <div className="flex h-[600px] flex-col bg-background px-4 pb-8 pt-10">
                {/* Header */}
                <div className="mb-4 flex items-center gap-3 border-b border-border pb-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Brandpop AI</p>
                    <p className="text-xs text-accent">Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div ref={messagesRef} className="flex-1 space-y-3 overflow-y-auto no-scrollbar">
                  {messages.slice(0, visibleCount).map((msg, i) => (
                    <motion.div
                      key={`${runId}-${i}`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender === "ai"
                            ? "rounded-tl-sm bg-surface text-text-primary"
                            : "rounded-tr-sm bg-accent text-background"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {visibleCount > 0 && visibleCount < messages.length && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-tl-sm bg-surface px-4 py-3">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                            className="h-2 w-2 rounded-full bg-text-muted"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                            className="h-2 w-2 rounded-full bg-text-muted"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                            className="h-2 w-2 rounded-full bg-text-muted"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Glow behind phone */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-accent/5 blur-3xl" />
          </motion.div>

          {/* Explanatory content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="mb-6 text-2xl font-bold text-text-primary md:text-3xl">
              Conversational AI, not blast texts
            </h3>
            <div className="mb-8 space-y-4">
              {[
                { title: "Personalized opener", desc: "References their original inquiry, not generic spam." },
                { title: "Adapts in real-time", desc: "If they say 'maybe later,' the AI follows up. If they say 'book me,' it checks the calendar." },
                { title: "Sounds human", desc: "Short sentences, casual tone, occasional typo. Prospects think it is a real salesperson." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <div>
                    <p className="font-semibold text-text-primary">{item.title}</p>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              onClick={() => setRunId((id) => id + 1)}
              className="gap-2"
            >
              <RotateCcw size={16} />
              Restart demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
