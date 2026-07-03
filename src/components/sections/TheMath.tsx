"use client";

import { useState } from "react";

const fmt = (n: number) => n.toLocaleString("en-US");

export function TheMath() {
  const [leads, setLeads] = useState(1000);
  const [value, setValue] = useState(500);
  const [rate, setRate] = useState(6);

  const appts = Math.round((leads * rate) / 100);
  const revenue = Math.round(appts * 0.5 * value);

  return (
    <section
      id="math"
      className="mx-auto max-w-[1240px] px-5 py-16 md:px-14 md:py-[110px]"
    >
      <p className="kicker mb-[18px]">the math · run your own numbers</p>
      <h2 className="mb-[18px] max-w-[24ch] font-serif text-[30px] font-[420] leading-[1.12] tracking-[-0.01em] md:text-[46px]">
        We’d rather show you the math than a brochure.
      </h2>
      <p className="mb-[52px] max-w-[58ch] text-[16.5px] text-ink-soft">
        Drag the sliders. The rebook rate is an industry benchmark* — we’d
        rather you use conservative numbers and be surprised later.
      </p>

      <div className="exhibit-card max-w-[980px] p-7 md:p-[52px]">
        <span className="mb-10 inline-block border border-ink px-3 py-[5px] font-mono text-[12px] uppercase tracking-[0.16em] text-ink">
          Database reactivation — unit math
        </span>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-[1fr_1px_1fr] md:gap-14">
          <div>
            <div className="mb-8">
              <label
                htmlFor="calc-leads"
                className="mb-3 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft"
              >
                dormant leads in your list
                <output className="text-[18px] font-semibold normal-case tracking-normal text-ink">
                  {fmt(leads)}
                </output>
              </label>
              <input
                id="calc-leads"
                className="calc-range"
                type="range"
                min={200}
                max={10000}
                step={100}
                value={leads}
                onChange={(e) => setLeads(+e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="calc-value"
                className="mb-3 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft"
              >
                average customer value
                <output className="text-[18px] font-semibold normal-case tracking-normal text-ink">
                  ${fmt(value)}
                </output>
              </label>
              <input
                id="calc-value"
                className="calc-range"
                type="range"
                min={100}
                max={5000}
                step={50}
                value={value}
                onChange={(e) => setValue(+e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="calc-rate"
                className="mb-3 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft"
              >
                rebook rate (benchmark*)
                <output className="text-[18px] font-semibold normal-case tracking-normal text-ink">
                  {rate}%
                </output>
              </label>
              <input
                id="calc-rate"
                className="calc-range"
                type="range"
                min={2}
                max={12}
                step={1}
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
              />
            </div>
          </div>

          <div className="hidden bg-rule md:block" />

          <div>
            <div className="flex items-baseline justify-between border-b border-dashed border-rule py-[18px]">
              <span className="max-w-[20ch] font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint">
                appointments booked
              </span>
              <span className="font-mono text-[26px] font-semibold tracking-[-0.02em] text-booked md:text-[40px]">
                {fmt(appts)}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-b border-dashed border-rule py-[18px]">
              <span className="max-w-[20ch] font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint">
                revenue if half become customers
              </span>
              <span className="font-mono text-[26px] font-semibold tracking-[-0.02em] text-booked md:text-[40px]">
                ${fmt(revenue)}
              </span>
            </div>
            <div className="flex items-baseline justify-between py-[18px]">
              <span className="max-w-[20ch] font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint">
                your up-front cost
              </span>
              <span className="bg-lime px-2.5 font-mono text-[26px] font-semibold tracking-[-0.02em] text-ink md:text-[40px]">
                $0.00
              </span>
            </div>
          </div>
        </div>

        <p className="mt-9 border-t border-dashed border-rule pt-5 font-mono text-[12.5px] leading-[1.9] text-ink-soft">
          * benchmark rates drawn from industry database-reactivation case data,
          not our client roster — we’re a young company and we’d rather tell you
          that than borrow someone else’s numbers.
          <br />
          your first ~500 leads are free to reactivate. after that, pricing is
          performance-based: per booked appointment or a share of what it
          generates. the leads that don’t respond cost you nothing.
        </p>
      </div>
    </section>
  );
}
