import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SITE } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const lexend = localFont({
  src: "../../public/fonts/Lexend-VariableFont_wght.ttf",
  weight: "100 900",
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Brandpop* — Fully managed AI front desk for local businesses & franchises",
    template: "%s | Brandpop*",
  },
  description:
    "Brandpop answers, follows up, and books your leads by text, voice, and chat — 24/7, in your name. Database reactivation is pay-per-booked-appointment: $0 until it works.",
  keywords: [
    "AI front desk",
    "database reactivation",
    "AI voice receptionist",
    "speed to lead",
    "AI live chat",
    "reputation management",
    "franchise lead management",
    "missed call text back",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Brandpop* — Fully managed AI front desk",
    description:
      "We build it, run it, monitor it 24/7, and send you the report. Database reactivation is pay-per-booked-appointment: $0 until it works.",
    url: SITE.url,
    siteName: "Brandpop",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandpop* — Fully managed AI front desk",
    description:
      "AI that answers, follows up, and books your leads 24/7. Pay-per-booked-appointment database reactivation.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#org`,
      name: "Brandpop",
      url: SITE.url,
      email: SITE.email,
      description:
        "Fully managed AI front desk for local businesses and franchise brands: database reactivation, AI voice receptionist, speed to lead, live chat, and reputation management.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#site`,
      url: SITE.url,
      name: "Brandpop",
      publisher: { "@id": `${SITE.url}/#org` },
    },
    ...SITE.services.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: s.description,
      provider: { "@id": `${SITE.url}/#org` },
      serviceType: s.name,
      areaServed: "US",
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${fraunces.variable} ${plexMono.variable} ${lexend.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
