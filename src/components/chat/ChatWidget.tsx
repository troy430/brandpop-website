"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { JASMINE_OPENING } from "@/lib/jasmine";

type ChatMessage = { role: "user" | "assistant"; content: string };

// Shown before the first message so nobody has to wonder what to type.
const STARTERS: { label: string; message: string }[] = [
  { label: "Demo it for my industry", message: "Show me a demo for my industry" },
  { label: "What does Brandpop do?", message: "What does Brandpop actually do?" },
  { label: "How does pricing work?", message: "How does pricing work?" },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [ended, setEnded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Refs mirror state so sendText stays correct when fired from window events.
  const messagesRef = useRef<ChatMessage[]>([]);
  const busyRef = useRef(false);
  const endedRef = useRef(false);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, busy]);

  const sendText = useCallback(async (raw: string) => {
    const text = raw.trim();
    if (!text || busyRef.current || endedRef.current) return;
    const history: ChatMessage[] = [
      ...messagesRef.current,
      { role: "user", content: text },
    ];
    setMessages(history);
    setBusy(true);
    busyRef.current = true;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      setMessages([...history, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        const current = reply;
        setMessages([...history, { role: "assistant", content: current }]);
      }
      if (reply.trim() === "goodbye") {
        setEnded(true);
        endedRef.current = true;
      }
    } catch {
      setMessages([
        ...history,
        {
          role: "assistant",
          content:
            "Hm, something glitched on my end. Give it another try, or grab a time with Troy directly: https://book.brandpop.ai/widget/bookings/brandpop",
        },
      ]);
    } finally {
      setBusy(false);
      busyRef.current = false;
    }
  }, []);

  // Anywhere on the page can open the chat — optionally with a first message
  // (the industry chips in Try It Live use this to jump straight into roleplay).
  useEffect(() => {
    const openChat = (e: Event) => {
      setOpen(true);
      const message = (e as CustomEvent).detail?.message;
      if (typeof message === "string" && message.trim()) {
        sendText(message);
      }
    };
    window.addEventListener("open-jasmine", openChat);
    return () => window.removeEventListener("open-jasmine", openChat);
  }, [sendText]);

  function handleSend() {
    const text = input;
    setInput("");
    sendText(text);
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Chat with our AI"}
        className="btn-lime fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center !rounded-full !shadow-[3px_3px_0_var(--ink)]"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Panel — full screen on mobile, floating card on desktop */}
      {open && (
        <div className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden bg-night md:inset-auto md:bottom-24 md:right-5 md:h-[520px] md:w-[360px] md:rounded-[22px] md:shadow-[0_24px_60px_-12px_rgba(9,9,13,0.6)]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-[14px] font-medium text-[#F4F4EF]">
                Jasmine
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-lime">
                brandpop ai · live
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-[#F4F4EF]/60 hover:text-[#F4F4EF] md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Bubble role="assistant" content={JASMINE_OPENING} />

            {messages.length === 0 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {STARTERS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => sendText(s.message)}
                    className="rounded-full border border-lime/40 px-3.5 py-1.5 font-mono text-[11.5px] text-lime transition-colors hover:bg-lime hover:text-ink"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {busy && messages[messages.length - 1]?.role === "user" && (
              <p className="font-mono text-[10.5px] tracking-[0.08em] text-[#F4F4EF]/40">
                jasmine is typing…
              </p>
            )}
          </div>

          <div className="border-t border-white/10 p-3 pb-[max(12px,env(safe-area-inset-bottom))]">
            {ended ? (
              <p className="px-2 py-1 text-center font-mono text-[11px] text-[#F4F4EF]/40">
                conversation ended
              </p>
            ) : (
              <div className="flex items-center gap-2 rounded-[12px] border border-white/20 px-3 py-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  maxLength={1000}
                  placeholder="Ask about pricing, hours, anything…"
                  className="flex-1 bg-transparent font-sans text-[16px] font-light text-[#F4F4EF] placeholder:text-[#F4F4EF]/35 focus:outline-none md:text-[13.5px]"
                />
                <button
                  onClick={handleSend}
                  disabled={busy || !input.trim()}
                  className="rounded-[8px] bg-lime px-3 py-1.5 font-mono text-[11px] font-semibold text-ink disabled:opacity-40"
                >
                  SEND
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ role, content }: ChatMessage) {
  if (!content) return null;
  return (
    <div className={role === "user" ? "text-right" : ""}>
      <span
        className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-[14px] px-3.5 py-2.5 text-left font-sans text-[13.5px] font-light leading-[1.45] ${
          role === "user"
            ? "rounded-br-[4px] bg-lime text-ink"
            : "rounded-bl-[4px] bg-night-soft text-[#E8E8E2]"
        }`}
      >
        {content}
      </span>
    </div>
  );
}
