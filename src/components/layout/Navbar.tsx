"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/site";

const navLinks = [
  { label: "services", href: "/#services" },
  { label: "try it live", href: "/#try" },
  { label: "the math", href: "/#math" },
  { label: "onboarding", href: "/get-started" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bone/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-[22px] md:px-14">
        <Link
          href="/"
          className="font-sans text-[22px] font-semibold tracking-tight text-ink"
        >
          brandpop*
        </Link>

        <nav className="hidden items-center gap-[34px] md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[12.5px] tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            className="btn-lime px-[22px] py-[11px] text-[14.5px]"
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a demo
          </a>
        </nav>

        <button
          className="text-ink md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-rule bg-bone px-5 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[14px] text-ink-soft transition-colors hover:text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="btn-lime mt-2 px-[22px] py-[11px] text-center text-[14.5px]"
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
