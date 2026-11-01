import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Cartucho no encontrado · Arcade Vault" };

export default function NotFound() {
  return (
    <main className="view flex flex-1 flex-col items-center justify-center gap-6 px-5 py-24 text-center">
      <p className="px neon-y m-0 text-[10px]">ERROR 404</p>
      <h1 className="px neon-m flicker m-0 text-[clamp(22px,5vw,44px)] font-normal leading-tight">
        CARTUCHO NO ENCONTRADO
      </h1>
      <p className="m-0 max-w-[460px] text-[17px] leading-normal text-[#b9b9d2]">
        Esta dirección no existe en el Vault. Vuelve a la biblioteca y elige un
        juego de la lista.
      </p>
      <Button href="/biblioteca" variant="yellow">
        Volver al Vault
      </Button>
    </main>
  );
}
