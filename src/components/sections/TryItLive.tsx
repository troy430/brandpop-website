import { OpenChatButton } from "@/components/chat/OpenChatButton";

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
            The chat in the corner of this page is the same AI we deploy for
            clients. Ask it to play a business like yours, go quiet
            mid-conversation, try to stump it. Fair warning: it’ll probably
            book you.
          </p>
          <p className="font-mono text-[13px] text-ink-soft">
            <span className="star-mark">*</span>&nbsp; no script, no canned
            demo. it answers whatever you type.
          </p>
        </div>

        <div className="max-w-[440px] rounded-[22px] bg-night px-[26px] py-[30px] shadow-[0_24px_60px_-12px_rgba(9,9,13,0.45)]">
          <p className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.14em] text-[#F4F4EF]/40">
            live demo — you’re one click away
          </p>
          <p className="mb-6 text-[14px] font-light text-[#F4F4EF]/70">
            Tell it your industry and it becomes your front desk on the spot.
            Answers, qualifies, books — the same thing your website visitors
            and leads would get, around the clock.
          </p>
          <OpenChatButton className="btn-lime w-full px-[26px] py-[13px] text-[15px]">
            Chat with our AI now
          </OpenChatButton>
          <p className="mt-4 text-center font-mono text-[10.5px] tracking-[0.08em] text-[#F4F4EF]/35">
            replies in about a second · that’s the product
          </p>
        </div>
      </div>
    </section>
  );
}
