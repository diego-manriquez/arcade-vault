import { formatScore } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { ScoreEntry } from "@/types/score";
import { medalClass } from "./medal";

/** Lista compacta del Top 10 (panel lateral del detalle). */
export function ScoreList({ entries }: { entries: ScoreEntry[] }) {
  return (
    <ol className="m-0 list-none px-0 py-1">
      {entries.map((entry) => (
        <li
          key={entry.rank}
          className={cn("lb-row", medalClass(entry.rank), entry.isMine && "mine")}
        >
          <span className="rank text-[#8fe9ef]">{formatScore(entry.rank, 2)}</span>
          <span className="min-w-0">
            <strong className="block overflow-hidden text-ellipsis whitespace-nowrap">
              {entry.name}
            </strong>
            <span className="text-[13px] text-[#8e8eab]">{entry.date}</span>
          </span>
          <span className="px neon-y text-[11px]">{formatScore(entry.score)}</span>
        </li>
      ))}
    </ol>
  );
}
