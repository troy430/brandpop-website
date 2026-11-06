import Link from "next/link";
import { SITE } from "@/lib/site";

const footnotes = [
  "database reactivation is priced per result: a campaign fee to build and launch — $2,500 up to 2,000 contacts, $5,000 up to 7,500, $7,500 up to 15,000 — then $300 for every appointment we book. if we don’t book it, you don’t pay for it.",
  "ai voice receptionist, speed to lead, live chat, and reputation management each carry a 3-month minimum.",
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
