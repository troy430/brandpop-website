"use client";

import { useState } from "react";

const fmt = (n: number) => n.toLocaleString("en-US");

function campaignFee(leads: number) {
  if (leads <= 2000) return 2500;
  if (leads <= 7500) return 5000;
  return 7500;
}

export function TheMath() {
  const [leads, setLeads] = useState(2000);
  const [value, setValue] = useState(10000);
  const [rate, setRate] = useState(1);
  const [close, setClose] = useState(25);

  const appts = Math.round((leads * rate) / 100);
  const revenue = Math.round(appts * (close / 100) * value);
  const cost = campaignFee(leads) + appts * 300;

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
        Drag the sliders. The booking rate is our planning rate* — we’d
        rather you use a conservative number and be surprised later.
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
                average job value
                <output className="text-[18px] font-semibold normal-case tracking-normal text-ink">
                  ${fmt(value)}
                </output>
              </label>
              <input
                id="calc-value"
                className="calc-range"
                type="range"
                min={1000}
                max={25000}
                step={500}
                value={value}
                onChange={(e) => setValue(+e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="calc-rate"
                className="mb-3 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft"
              >
                booking rate (planning rate*)
                <output className="text-[18px] font-semibold normal-case tracking-normal text-ink">
                  {rate}%
                </output>
              </label>
              <input
                id="calc-rate"
                className="calc-range"
                type="range"
                min={0.5}
                max={4}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="calc-close"
                className="mb-3 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft"
              >
                close rate
                <output className="text-[18px] font-semibold normal-case tracking-normal text-ink">
                  {close}%
                </output>
              </label>
              <input
                id="calc-close"
                className="calc-range"
                type="range"
                min={10}
                max={50}
                step={5}
                value={close}
                onChange={(e) => setClose(+e.target.value)}
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
                revenue at {close}% close
              </span>
              <span className="font-mono text-[26px] font-semibold tracking-[-0.02em] text-booked md:text-[40px]">
                ${fmt(revenue)}
              </span>
            </div>
            <div className="flex items-baseline justify-between py-[18px]">
              <span className="max-w-[20ch] font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint">
                your cost
              </span>
              <span className="bg-lime px-2.5 font-mono text-[26px] font-semibold tracking-[-0.02em] text-ink md:text-[40px]">
                ${fmt(cost)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-9 border-t border-dashed border-rule pt-5 font-mono text-[12.5px] leading-[1.9] text-ink-soft">
          <span className="star-mark">*</span> that 1% is a planning rate, not
          a promise. it’s what we expect from a decent list — real estimates
          given to real people, not a pile of names nobody recognizes. a
          stale list will do worse. a warm list can do better. either way,
          the per-appointment fee only exists when an appointment actually
          books.
        </p>
      </div>
    </section>
  );
}
