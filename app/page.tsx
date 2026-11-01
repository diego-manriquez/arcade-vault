import { FeatureGrid } from "@/components/home/FeatureGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { GamesPreview } from "@/components/home/GamesPreview";
import { HomeHero } from "@/components/home/HomeHero";
import { LiveActivity } from "@/components/home/LiveActivity";
import { Pricing } from "@/components/home/Pricing";
import { StatsBand } from "@/components/home/StatsBand";

export default function HomePage() {
  return (
    <main className="home fade-in">
      <HomeHero />
      <FeatureGrid />
      <GamesPreview />
      <StatsBand />
      <LiveActivity />
      <Pricing />
      <FinalCta />
    </main>
  );
}
