"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatScore } from "@/lib/format";

interface GameOverModalProps {
  score: number;
  isGuest: boolean;
  onPlayAgain: () => void;
}

/** Modal "FIN DEL JUEGO". "Guardar" solo cambia el estado visual: no persiste nada. */
export function GameOverModal({ score, isGuest, onPlayAgain }: GameOverModalProps) {
  const [saved, setSaved] = useState(false);

  return (
    <Modal label="Fin del juego">
      <span className="px text-[9px] text-[#8e8eab]">GAME OVER</span>
      <h2 className="px neon-m flicker m-0 text-[clamp(20px,5vw,30px)] font-normal">
        FIN DEL JUEGO
      </h2>

      <div>
        <span className="px text-[9px] text-[#8fe9ef]">PUNTUACIÓN FINAL</span>
        <p className="px neon-y mb-0 mt-3 text-[30px]">{formatScore(score)}</p>
      </div>

      {saved ? (
        <div className="flex flex-col items-center gap-2.5" role="status">
          <span className="px neon-y type text-xs">PUNTUACIÓN GUARDADA</span>
          <span className="text-sm text-[#b9b9d2]">
            {isGuest
              ? "Se guarda solo en este dispositivo. Inicia sesión para entrar al ranking global."
              : "Tu marca compite en el ranking global."}
          </span>
        </div>
      ) : (
        <Button variant="yellow" onClick={() => setSaved(true)}>
          Guardar puntuación
        </Button>
      )}

      <div className="mt-1.5 flex flex-wrap justify-center gap-3">
        <Button onClick={onPlayAgain}>Jugar de nuevo</Button>
        <Button href="/" variant="magenta">
          Volver al Vault
        </Button>
      </div>
    </Modal>
  );
}
