import { SITE } from "@/lib/site";

export function ServicesLedger() {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1240px] px-5 py-16 md:px-14 md:py-[110px]"
    >
      <p className="kicker mb-[18px]">the services · line items</p>
      <h2 className="mb-[18px] max-w-[24ch] font-serif text-[30px] font-[420] leading-[1.12] tracking-[-0.01em] md:text-[46px]">
        Five workflows. One goal:{" "}
        <em className="font-[460] italic">leads become appointments.</em>
      </h2>
      <p className="mb-[52px] max-w-[58ch] text-[16.5px] text-ink-soft">
        Every service is done-for-you. We design it, launch it, watch it around
        the clock, and report the results — tuned to get the best possible
        response out of your leads.
      </p>

      <ul className="border-t border-ink">
        {SITE.services.map((service) => (
          <li
            key={service.num}
            className="grid grid-cols-[40px_1fr] items-baseline gap-x-6 gap-y-2 border-b border-rule py-[26px] transition-colors hover:bg-lime/10 md:grid-cols-[64px_1.1fr_1.6fr_200px]"
          >
            <span className="font-mono text-[13px] text-ink-faint">
              {service.num}
            </span>
            <h3 className="font-serif text-[20px] font-[460] md:text-[25px]">
              {service.name}
              {service.performance && (
                <sup className="star-mark ml-0.5 font-mono text-[0.6em]">*</sup>
              )}
            </h3>
            <p className="col-start-2 text-[14.5px] font-light text-ink-soft md:col-start-3">
              {service.description}
            </p>
            <span
              className={`col-start-2 font-mono text-[12.5px] tracking-[0.02em] md:col-start-4 md:text-right ${
                service.performance
                  ? "font-semibold text-booked"
                  : "text-ink-soft"
              }`}
            >
              {service.term}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
