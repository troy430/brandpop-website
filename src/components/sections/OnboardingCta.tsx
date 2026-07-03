import Link from "next/link";

export function OnboardingCta() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-0 pt-16 md:px-14 md:pt-[110px]">
      <div className="flex flex-wrap items-center justify-between gap-8 border border-ink bg-lime p-7 shadow-[6px_6px_0_var(--ink)] md:p-12">
        <div>
          <h3 className="max-w-[24ch] font-serif text-[24px] font-[460] leading-[1.15] md:text-[34px]">
            Already convinced? Onboarding takes about ten minutes.
          </h3>
          <p className="mt-2.5 font-mono text-[12.5px] text-ink-soft">
            you bring the business details — we build everything else and go
            live in days, not quarters.
          </p>
        </div>
        <Link className="btn-ink px-7 py-3.5 text-[15px]" href="/get-started">
          Start onboarding →
        </Link>
      </div>
    </section>
  );
}
