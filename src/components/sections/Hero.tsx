import { SITE } from "@/lib/site";

const thread = [
  {
    from: "ai",
    text: "Hi Maria, it’s the team at Summit Dental. You asked about Invisalign a while back — we’re holding a few openings this month. Still curious?",
    time: "11:41 PM · delivered",
    delay: "msg-d1",
  },
  {
    from: "lead",
    text: "oh wow yes actually! i never heard back lol",
    time: "11:43 PM",
    delay: "msg-d2",
  },
  {
    from: "ai",
    text: "Happens more than you’d think 😅 We have Tuesday 2:15 or Thursday 10:30 for a free consult. Either work?",
    time: "11:44 PM · delivered",
    delay: "msg-d3",
  },
  {
    from: "lead",
    text: "tuesday works!",
    time: "11:46 PM",
    delay: "msg-d4",
  },
] as const;

function SmsExhibit() {
  return (
    <div>
      <p className="mb-2.5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
        Exhibit A — real thread, names changed
      </p>
      <div className="max-w-[400px] rounded-[22px] bg-night px-[22px] pb-[22px] pt-[26px] shadow-[0_24px_60px_-12px_rgba(9,9,13,0.45),0_4px_16px_rgba(9,9,13,0.25)]">
        <div className="mb-1.5 flex items-baseline justify-between border-b border-white/10 pb-3.5">
          <span className="font-sans text-[14px] font-medium text-[#F4F4EF]">
            Maria Alvarez
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-dead">
            lead · cold 14 months
          </span>
        </div>
        <p className="mb-3 text-center font-mono text-[10px] tracking-[0.08em] text-[#F4F4EF]/35">
          text message · sms
        </p>

        {thread.map((msg) => (
          <div
            key={msg.time}
            className={`msg-in ${msg.delay} mb-3 ${msg.from === "ai" ? "text-right" : ""}`}
          >
            <span
              className={`inline-block max-w-[85%] rounded-[14px] px-3.5 py-2.5 text-left font-sans text-[13.5px] font-light leading-[1.45] ${
                msg.from === "ai"
                  ? "rounded-br-[4px] bg-lime text-ink"
                  : "rounded-bl-[4px] bg-night-soft text-[#E8E8E2]"
              }`}
            >
              {msg.text}
            </span>
            <span className="mt-1 block font-mono text-[10px] tracking-[0.05em] text-[#F4F4EF]/40">
              {msg.time}
            </span>
          </div>
        ))}

        <p className="msg-in msg-d5 mt-4 border-t border-dashed border-lime/35 pt-3.5 font-mono text-[11.5px] tracking-[0.06em] text-lime">
          ✱ APPOINTMENT BOOKED — TUE 2:15 PM · 11:47 PM
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-8 px-5 pb-10 pt-12 md:grid-cols-[1.55fr_1fr] md:gap-[72px] md:px-14 md:pb-[72px] md:pt-[88px]">
      <div>
        <p className="mb-[26px] flex items-center gap-3.5 font-mono text-[15px] font-medium tracking-[0.08em] text-ink-soft before:h-px before:w-11 before:bg-ink before:content-['']">
          <span className="font-mono text-[28px] font-semibold tracking-[0.02em] text-ink md:text-[40px]">
            11:47 PM
          </span>
          tuesday
        </p>

        <h1 className="mb-[30px] font-serif text-[38px] font-[420] leading-[1.08] tracking-[-0.015em] md:text-[64px]">
          Your front desk went home at five. We just <span className="hl">booked</span>{" "}
          Mrs.&nbsp;Alvarez for Tuesday.
        </h1>

        <p className="mb-[38px] max-w-[52ch] text-[16px] font-light text-ink-soft md:text-[18.5px]">
          Brandpop is a fully managed AI front desk. We build it, run it, monitor
          it 24/7, and send you the report — while it answers your leads by text,
          voice, and chat, in your name, around the clock.
        </p>

        <div className="mb-[34px] flex flex-wrap items-center gap-7">
          <a
            className="btn-lime px-[26px] py-[13px] text-[15px]"
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a 15-min demo
          </a>
          <a className="btn-ghost text-[13.5px]" href="#try">
            or chat with our AI right now ↓
          </a>
        </div>

        <p className="font-mono text-[13px] text-ink-soft">
          <span className="star-mark">*</span>&nbsp; database reactivation is
          pay-per-booked-appointment. $0 until it works.
        </p>
      </div>

      <SmsExhibit />
    </section>
  );
}
