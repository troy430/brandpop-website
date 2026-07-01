import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brandpop* — AI-Powered Lead Reactivation",
  description:
    "Turn dead leads into revenue with conversational AI. No upfront fees — you only pay when it works. Built for solar, dental, roofing, legal, and home service businesses.",
  openGraph: {
    title: "Brandpop* — AI-Powered Lead Reactivation",
    description:
      "Turn dead leads into revenue with conversational AI. No upfront fees — you only pay when it works.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
