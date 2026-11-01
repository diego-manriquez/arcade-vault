import { LibraryBrowser } from "@/components/games/LibraryBrowser";
import { CATEGORIES, GAMES } from "@/data/games";

export default function LibraryPage() {
  return (
    <main className="view mx-auto w-full max-w-[1240px] px-5 pb-[120px] pt-16">
      <div className="mb-14 flex flex-col items-center gap-[22px] text-center">
        <h1 className="px flicker m-0 text-[clamp(28px,6vw,64px)] font-normal leading-[1.15]">
          <span className="neon-c">ARCADE</span>{" "}
          <span className="neon-m">VAULT</span>
        </h1>
        <p className="px neon-y blink m-0 text-[clamp(9px,1.6vw,13px)]">
          INSERTA UNA MONEDA PARA JUGAR
        </p>
        <p className="m-0 max-w-[560px] text-[17px] leading-normal text-[#b9b9d2]">
          Clásicos de salón listos para jugar desde el navegador. Elige un
          cartucho, supera la mejor marca y entra en el Salón de la Fama.
        </p>
      </div>

      <LibraryBrowser games={GAMES} categories={CATEGORIES} />
    </main>
  );
}
