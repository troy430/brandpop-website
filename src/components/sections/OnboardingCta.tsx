import Link from "next/link";

export function OnboardingCta() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-0 pt-16 md:px-14 md:pt-[110px]">
      <div className="flex flex-wrap items-center justify-between gap-8 border border-ink bg-lime p-7 shadow-[6px_6px_0_var(--ink)] md:p-12">
        <div>
          <h3 className="max-w-[26ch] font-serif text-[24px] font-[460] leading-[1.15] md:text-[34px]">
            Onboarding takes about ten minutes. Going live takes about a
            week.
          </h3>
          <p className="mt-2.5 max-w-[46ch] font-mono text-[12.5px] leading-[1.7] text-ink-soft">
            your campaigns send from your own business number, and carrier
            registration (A2P) sets that pace — most clients are registered
            and sending within a week. we’ll tell you exactly where yours
            stands, every step. anyone who promises you 48 hours is skipping
            the registration — or skipping the truth.
          </p>
        </div>
        <Link className="btn-ink px-7 py-3.5 text-[15px]" href="/get-started">
          Start onboarding →
        </Link>
      </div>
    </section>
  );
}
