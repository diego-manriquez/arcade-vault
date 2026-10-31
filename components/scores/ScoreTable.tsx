import { cn } from "@/lib/cn";
import { formatScore } from "@/lib/format";
import type { ScoreEntry } from "@/types/score";
import { medalClass } from "./medal";

interface ScoreTableProps {
  entries: ScoreEntry[];
  /** Título del juego, para el `<caption>` accesible. */
  gameTitle: string;
}

/** Tabla del Top 10 del Salón de la Fama. */
export function ScoreTable({ entries, gameTitle }: ScoreTableProps) {
  return (
    <div className="table-box">
      <table className="fame">
        <caption className="sr">Mejores puntuaciones de {gameTitle}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[110px]">RANGO</th>
            <th scope="col">JUGADOR</th>
            <th scope="col" className="num">PUNTUACIÓN</th>
            <th scope="col" className="num">FECHA</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.rank}
              className={cn(
                "frow",
                `d${entry.rank}`,
                medalClass(entry.rank),
                entry.isMine && "mine",
              )}
            >
              <td>
                <span className="rank">{formatScore(entry.rank, 2)}</span>
              </td>
              <td className="font-bold">
                {entry.name}
                {entry.isMine && (
                  <span className="px ml-2.5 text-[7px] text-neon-magenta [text-shadow:none]">
                    TÚ
                  </span>
                )}
              </td>
              <td className="num">
                <span className="px text-xs">{formatScore(entry.score)}</span>
              </td>
              <td className="num text-[#b9b9d2] [text-shadow:none]">
                {entry.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
