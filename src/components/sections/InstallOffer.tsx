const lineItems = [
  {
    label: "your full list reactivated at $300 an appointment",
    value: "~$30,000",
  },
  { label: "the campaign build for a list that size", value: "$7,500" },
  {
    label: "speed to lead, installed and run for 90 days",
    value: "$2,750",
  },
  {
    label: "ai voice answering your after-hours calls for 90 days",
    value: "$1,200",
  },
  {
    label: "carrier registration, monitoring, and reporting",
    value: "included",
  },
] as const;

export function InstallOffer() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-14 md:py-[110px]">
      <p className="kicker mb-[18px]">the install · for large operators</p>
      <h2 className="mb-[18px] max-w-[28ch] font-serif text-[30px] font-[420] leading-[1.12] tracking-[-0.01em] md:text-[46px]">
        Running a big list? The{" "}
        <em className="font-[460] italic">
          90-Day Old Estimates Revival Install.
        </em>
      </h2>

      <div className="exhibit-card max-w-[860px] p-7 md:p-[52px]">
        <p className="mb-5 text-[16.5px] font-light text-ink-soft">
          If you’re sitting on 7,000 or more old contacts, a per-campaign run
          isn’t the right shape.
        </p>
        <p className="mb-8 max-w-[62ch] text-[16.5px] font-light text-ink-soft">
          The Install is one 90-day engagement: we work your entire list in
          waves, install Speed to Lead so new leads stop leaking while we
          revive the old ones, and cover your after-hours calls with AI
          voice.
        </p>

        <p className="mb-9 border-y border-dashed border-rule py-5 font-mono text-[17px] font-semibold leading-[1.6] text-booked md:text-[19px]">
          $25,000 flat. $7,500 to start, $10,000 when your campaign launches,
          $7,500 at your 50th booked appointment or day 75.
        </p>

        <p className="mb-5 text-[16.5px] font-light text-ink-soft">
          Here’s why it’s priced there.
        </p>
        <p className="mb-2 text-[16.5px] font-light text-ink-soft">
          For a decent list — people who actually got an estimate from you —
          we plan on about 1 in 100 booking.
        </p>
        <p className="mb-2 text-[16.5px] font-light text-ink-soft">
          On 10,000 contacts, that’s roughly 100 appointments.
        </p>
        <p className="mb-5 text-[16.5px] font-light text-ink-soft">
          Bought one at a time at $300 each, that’s $30,000 in appointment
          fees alone, plus the campaign fee.
        </p>
        <p className="mb-2 text-[16.5px] font-light text-ink-soft">
          The Install is $25,000 flat, and Speed to Lead and AI voice are
          included for the full 90 days.
        </p>
        <p className="mb-2 text-[16.5px] font-light text-ink-soft">
          The bigger your list, the harder the flat price works in your
          favor.
        </p>
        <p className="mb-2 text-[16.5px] font-light text-ink-soft">
          That’s deliberate.
        </p>
        <p className="mb-9 text-[16.5px] font-light text-ink-soft">
          We’d rather run one big list properly than five small ones badly.
        </p>

        <div className="mb-9 border-t border-dashed border-rule pt-6">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            what the install replaces, itemized at our own published prices
          </p>
          <ul className="space-y-2.5 font-mono text-[13px] text-ink-soft">
            {lineItems.map((item) => (
              <li
                key={item.label}
                className="flex items-baseline justify-between gap-4 border-b border-dashed border-rule pb-2.5"
              >
                <span className="max-w-[36ch]">{item.label}</span>
                <span className="whitespace-nowrap text-ink">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] font-light text-ink-soft">
            That’s roughly $41,000 bought piece by piece.
          </p>
          <p className="text-[16px] font-semibold text-ink">
            The Install is $25,000, flat.
          </p>
        </div>

        <p className="font-mono text-[13px] leading-[1.9] text-ink-soft">
          <span className="star-mark">*</span>&nbsp; and it’s guaranteed: 50
          booked appointments in your first 90 days, or we keep working your
          list free until you have them. not a refund. more work, until the
          number is real.
        </p>
      </div>

      <p className="mt-9 max-w-[70ch] text-[16.5px] text-ink-soft">
        First question, and it’s the only qualifier:{" "}
        <strong className="font-sans font-medium text-ink">
          how many old estimates are sitting in your system that never turned
          into a job?
        </strong>
      </p>
      <p className="mt-3 max-w-[70ch] font-mono text-[13px] leading-[1.8] text-ink-soft">
        If the answer is under 1,000, start with a standard campaign. Between
        1,000 and 7,000, the ladder pricing above is your route. Over 7,000,
        the Install was built for you.
      </p>
    </section>
  );
}
