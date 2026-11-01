import { FeatureGrid } from "@/components/home/FeatureGrid";
import { GamesPreview } from "@/components/home/GamesPreview";
import { HomeHero } from "@/components/home/HomeHero";

export default function HomePage() {
  return (
    <main className="home fade-in">
      <HomeHero />
      <FeatureGrid />
      <GamesPreview />
      {/* Estadísticas, actividad, precios y CTA final: pasos 9-10 del SPEC 02. */}
    </main>
  );
}
