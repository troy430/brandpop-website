import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-text-primary">
              brandpop<span className="text-accent">*</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
            <a href="/#services" className="hover:text-text-primary transition-colors">
              Services
            </a>
            <a href="/#how-it-works" className="hover:text-text-primary transition-colors">
              How it works
            </a>
            <a href="/#proof" className="hover:text-text-primary transition-colors">
              Proof
            </a>
            <Link href="/get-started" className="hover:text-text-primary transition-colors">
              Get Started
            </Link>
          </nav>

          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Brandpop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
