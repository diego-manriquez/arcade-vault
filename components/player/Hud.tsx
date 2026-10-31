import { formatScore } from "@/lib/format";
import { cn } from "@/lib/cn";

interface HudProps {
  score: number;
  lives: number;
  maxLives?: number;
  level: number;
  playerName: string;
}

/** Marcador de la partida: puntuación, vidas, nivel y jugador. */
export function Hud({ score, lives, maxLives = 3, level, playerName }: HudProps) {
  return (
    <div className="hud" aria-live="polite">
      <div>
        <span className="hud-k">PUNTUACIÓN</span>
        <span className="hud-v neon-y">{formatScore(score)}</span>
      </div>
      <div>
        <span className="hud-k">VIDAS</span>
        <span
          className="flex gap-1.5"
          role="img"
          aria-label={`${lives} de ${maxLives} vidas`}
        >
          {Array.from({ length: maxLives }, (_, i) => (
            <span key={i} className={cn("life", i >= lives && "off")} />
          ))}
        </span>
      </div>
      <div>
        <span className="hud-k">NIVEL</span>
        <span className="hud-v neon-c">{formatScore(level, 2)}</span>
      </div>
      <div>
        <span className="hud-k">JUGADOR</span>
        <span className="hud-v text-[11px] text-[#ff5c9d]">{playerName}</span>
      </div>
    </div>
  );
}
