import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Services } from "@/components/sections/Services";
import { VisualHowItWorks } from "@/components/sections/VisualHowItWorks";
import { SocialProof } from "@/components/sections/SocialProof";
import { DemoCta } from "@/components/sections/DemoCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <LiveDemo />
        <Services />
        <VisualHowItWorks />
        <SocialProof />
        <DemoCta />
      </main>
      <Footer />
    </>
  );
}
