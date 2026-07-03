import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FactsStrip } from "@/components/sections/FactsStrip";
import { ServicesLedger } from "@/components/sections/ServicesLedger";
import { TryItLive } from "@/components/sections/TryItLive";
import { TheMath } from "@/components/sections/TheMath";
import { OnboardingCta } from "@/components/sections/OnboardingCta";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <div className="relative z-[2]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FactsStrip />
        <ServicesLedger />
        <TryItLive />
        <TheMath />
        <OnboardingCta />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
