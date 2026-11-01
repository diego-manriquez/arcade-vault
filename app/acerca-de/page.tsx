import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { ContactSection } from "@/components/about/ContactSection";
import { PixelDivider } from "@/components/about/PixelDivider";

export const metadata: Metadata = {
  title: "Acerca de — Arcade Vault",
  description:
    "La misión de Arcade Vault: preservar y celebrar los arcades clásicos, accesibles para todos y sin costo.",
};

export default function AcercaDePage() {
  return (
    <main className="about fade-in">
      <AboutHero />
      <PixelDivider />
      <ContactSection />
    </main>
  );
}
