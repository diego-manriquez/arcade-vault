import { getBestScore } from "@/data/scores";
import { formatScore } from "@/lib/format";
import type { Game } from "@/types/game";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { GameThumb } from "./GameThumb";

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="card">
      <GameThumb id={game.id} />
      <div className="flex grow flex-col gap-3 p-5">
        <Tag>{game.category}</Tag>
        <h2 className="px m-0 text-sm font-normal leading-snug text-white">
          {game.title}
        </h2>
        <p className="m-0 text-[15px] leading-[1.45] text-[#b9b9d2]">
          {game.short}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2.5">
          <Badge
            label="MEJOR PUNTUACIÓN"
            value={formatScore(getBestScore(game.id))}
          />
          <Button
            href={`/juegos/${game.id}`}
            aria-label={`Jugar a ${game.title}`}
          >
            Jugar
          </Button>
        </div>
      </div>
    </article>
  );
}
