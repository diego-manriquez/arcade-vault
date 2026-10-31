import { UiShowcase } from "@/components/dev/UiShowcase";

export default function Home() {
  return (
    <main className="view flex flex-1 flex-col items-center justify-center gap-6 px-5 py-24 text-center">
      <h1 className="px flicker text-[clamp(28px,6vw,64px)] leading-[1.15]">
        <span className="neon-c">ARCADE</span>{" "}
        <span className="neon-m">VAULT</span>
      </h1>
      <p className="px neon-y blink text-[clamp(9px,1.6vw,13px)]">
        INSERTA UNA MONEDA PARA JUGAR
      </p>
      {/* TEMPORAL: se elimina en el paso 6 */}
      <UiShowcase />
    </main>
  );
}
