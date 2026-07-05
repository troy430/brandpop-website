import { OpenChatButton } from "@/components/chat/OpenChatButton";

const industries = [
  { label: "dental", message: "I run a dental practice" },
  { label: "chiropractic", message: "I run a chiropractic clinic" },
  { label: "roofing", message: "I run a roofing company" },
  { label: "HVAC", message: "I run an HVAC company" },
  { label: "med spa", message: "I run a med spa" },
  { label: "legal", message: "I run a law firm" },
  { label: "home services", message: "I run a home services business" },
];

export function TryItLive() {
  return (
    <section
      id="try"
      className="mx-auto max-w-[1240px] px-5 py-16 md:px-14 md:py-[110px]"
    >
      <p className="kicker mb-[18px]">the proof · try it yourself</p>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-[72px]">
        <div>
          <h2 className="mb-[18px] max-w-[24ch] font-serif text-[30px] font-[420] leading-[1.12] tracking-[-0.01em] md:text-[46px]">
            Don’t take our word for it.{" "}
            <em className="font-[460] italic">Be the lead.</em>
          </h2>
          <p className="mb-7 max-w-[58ch] text-[16.5px] text-ink-soft">
            That bubble in the corner isn’t a support widget. It’s the live
            chat we install on client websites, running here on our own. Pick
            your industry and it becomes that business’s front desk —
            answering questions, qualifying, booking — so you can feel exactly
            what your own visitors and leads would get.
          </p>
          <p className="font-mono text-[13px] text-ink-soft">
            <span className="star-mark">*</span>&nbsp; no script, no canned
            demo. and the reply speed you’ll see is the same engine behind
            speed to lead.
          </p>
        </div>

        <div className="max-w-[440px] rounded-[22px] bg-night px-[26px] py-[30px] shadow-[0_24px_60px_-12px_rgba(9,9,13,0.45)]">
          <p className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.14em] text-[#F4F4EF]/40">
            pick your industry — watch it become your front desk
          </p>
          <div className="mb-6 flex flex-wrap gap-2">
            {industries.map((i) => (
              <OpenChatButton
                key={i.label}
                message={i.message}
                className="rounded-full border border-lime/40 px-3.5 py-1.5 font-mono text-[12px] text-lime transition-colors hover:bg-lime hover:text-ink"
              >
                {i.label}
              </OpenChatButton>
            ))}
          </div>
          <OpenChatButton className="btn-lime w-full px-[26px] py-[13px] text-[15px]">
            Or just open the chat and talk
          </OpenChatButton>
          <p className="mt-4 text-center font-mono text-[10.5px] tracking-[0.08em] text-[#F4F4EF]/35">
            replies in about a second · that’s the product
          </p>
        </div>
      </div>
    </section>
  );
}
