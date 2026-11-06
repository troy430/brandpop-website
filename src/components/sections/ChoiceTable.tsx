const columns = [
  { key: "campaign", label: "Reactivation Campaign", highlight: false },
  { key: "install", label: "The Install", badge: "Best value", highlight: true },
  { key: "partner", label: "Front Desk Partner", highlight: false },
] as const;

const rows = [
  {
    label: "Built for",
    campaign: "Lists under 7,000 contacts",
    install: "Lists of 7,000+ contacts",
    partner:
      "Multi-location operators who want the whole front desk handled, all year",
  },
  {
    label: "You pay",
    campaign:
      "Campaign fee by list size, then $300 per booked appointment, as it books",
    install:
      "$25,000 flat — $7,500 to start, $10,000 at launch, $7,500 at your 50th booked appointment or day 75",
    partner: "$49,000/year",
  },
  {
    label: "What the same list costs at 1% (10,000 contacts)",
    campaign: "~$37,500, open-ended",
    install: "$25,000, capped",
    partner: "Included",
  },
  {
    label: "Database reactivation",
    campaign: "One run through your list",
    install: "Your full list, worked in waves for 90 days",
    partner: "The Install, plus fresh reactivation waves every quarter",
  },
  {
    label: "Speed to Lead",
    campaign: "Not included",
    install: "Included for 90 days",
    partner: "Included for 12 months",
  },
  {
    label: "AI Voice Receptionist",
    campaign: "Not included",
    install: "Included for 90 days",
    partner: "Included for 12 months",
  },
  {
    label: "Live Chat",
    campaign: "Not included",
    install: "Not included",
    partner: "Included for 12 months",
  },
  {
    label: "Reputation Management",
    campaign: "Not included",
    install: "Not included",
    partner: "Included for 12 months",
  },
  {
    label: "Guarantee",
    campaign: "You only pay the $300 when an appointment books",
    install:
      "50 booked appointments in 90 days, or we keep working free until you have them",
    partner: "Everything in the Install, all year",
  },
] as const;

export function ChoiceTable() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-14 md:py-[110px]">
      <p className="kicker mb-[18px]">the choice · three ways to buy</p>
      <h2 className="mb-[18px] max-w-[26ch] font-serif text-[30px] font-[420] leading-[1.12] tracking-[-0.01em] md:text-[46px]">
        Three sizes of the same promise.
      </h2>
      <p className="mb-[52px] max-w-[64ch] text-[16.5px] text-ink-soft">
        No column is a discount on another one. Each one is a different
        amount of us, for a different size of problem.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-t border-b border-ink">
              <th className="w-[200px] py-4 pr-4 text-left align-bottom" />
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-4 text-left align-bottom ${
                    col.highlight ? "bg-lime/15" : ""
                  }`}
                >
                  {"badge" in col && col.badge && (
                    <span className="mb-2 inline-block bg-lime px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink">
                      {col.badge}
                    </span>
                  )}
                  <div className="font-serif text-[18px] font-[460] leading-tight text-ink md:text-[21px]">
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-rule">
                <td className="py-4 pr-4 align-top font-mono text-[11px] uppercase leading-[1.4] tracking-[0.06em] text-ink-faint">
                  {row.label}
                </td>
                <td className="px-4 py-4 align-top font-sans text-[13.5px] font-light leading-[1.5] text-ink-soft">
                  {row.campaign}
                </td>
                <td className="bg-lime/15 px-4 py-4 align-top font-sans text-[13.5px] font-light leading-[1.5] text-ink">
                  {row.install}
                </td>
                <td className="px-4 py-4 align-top font-sans text-[13.5px] font-light leading-[1.5] text-ink-soft">
                  {row.partner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-9 max-w-[64ch] font-mono text-[12.5px] leading-[1.9] text-ink-soft">
        if you’re not sure which one your list is, that’s the first thing a
        call figures out — starting with how many old estimates you’re
        sitting on.
      </p>
    </section>
  );
}
