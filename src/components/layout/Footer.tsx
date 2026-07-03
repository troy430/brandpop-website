import Link from "next/link";
import { SITE } from "@/lib/site";

const footnotes = [
  "pay only when it books. database reactivation is performance-priced — per booked appointment or a share of revenue it generates. nothing up front, nothing monthly.",
  "first time with us? we’ll reactivate your first ~500 leads free. if it books appointments, we’ll talk pricing then. that’s the whole negotiation.",
  "every thread on this page is a real conversation. names and details changed to protect client data.",
  "franchise? we price per location and we’ll walk you through the unit math on the first call.",
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink md:mt-[110px]">
      <div className="mx-auto max-w-[1240px] px-5 pb-[60px] pt-11 md:px-14">
        <ul className="mb-11 space-y-2 font-mono text-[13px] leading-[1.9] text-ink-soft">
          {footnotes.map((note) => (
            <li key={note}>
              <span className="star-mark">*</span>&nbsp; {note}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Link
            href="/"
            className="font-sans text-[20px] font-semibold tracking-tight text-ink"
          >
            brandpop*
          </Link>
          <p className="font-mono text-[11.5px] text-ink-faint">
            © {new Date().getFullYear()} brandpop ·{" "}
            <a href={`mailto:${SITE.email}`} className="hover:text-ink">
              {SITE.email}
            </a>{" "}
            · the asterisk means what it says
          </p>
        </div>
      </div>
    </footer>
  );
}
