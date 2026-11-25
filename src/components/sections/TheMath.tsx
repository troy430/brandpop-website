"use client";

import { useState } from "react";

const fmt = (n: number) => n.toLocaleString("en-US");

function campaignFee(leads: number) {
  if (leads <= 2000) return 2500;
  return 5000;
}

const lineItems = [
  {
    label: "your full list reactivated at $300 an appointment",
    value: "~$30,000",
  },
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
                max={7000}
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

      <div className="mt-9 max-w-[620px]">
        <p className="mb-5 text-[16.5px] font-light text-ink-soft">
          Push “dormant leads” past 7,000 and a per-campaign run isn’t the
          right shape anymore — that’s the Install from the table above:
          $25,000 flat for your full list, worked in waves, with Speed to
          Lead and AI voice included for 90 days.
        </p>
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
              <span className="whitespace-nowrap text-ink">{item.value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] font-light text-ink-soft">
          That’s roughly $34,000 bought piece by piece.{" "}
          <span className="font-semibold text-ink">
            The Install is $25,000, flat.
          </span>
        </p>

        <p className="mt-7 max-w-[70ch] text-[16.5px] text-ink-soft">
          First question, and it’s the only qualifier:{" "}
          <strong className="font-sans font-medium text-ink">
            how many old estimates are sitting in your system that never
            turned into a job?
          </strong>
        </p>
        <p className="mt-3 max-w-[70ch] font-mono text-[13px] leading-[1.8] text-ink-soft">
          Under 1,000, start with a standard campaign. Between 1,000 and
          7,000, the ladder pricing above is your route. Over 7,000, the
          Install was built for you.
        </p>
      </div>
    </section>
  );
}
