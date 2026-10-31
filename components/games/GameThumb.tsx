import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import type { GameId } from "@/types/game";
import {
  ArkanoidThumb,
  AsteroidsThumb,
  InvadersThumb,
  PacmanThumb,
  SnakeThumb,
  TetrisThumb,
} from "./thumbs";

const THUMBS: Record<GameId, { Art: ComponentType; bg: string }> = {
  ark: { Art: ArkanoidThumb, bg: "th-ark" },
  tet: { Art: TetrisThumb, bg: "th-tet" },
  snk: { Art: SnakeThumb, bg: "th-snk" },
  maz: { Art: PacmanThumb, bg: "th-maz" },
  inv: { Art: InvadersThumb, bg: "th-inv" },
  ast: { Art: AsteroidsThumb, bg: "th-ast" },
};

/** Miniatura decorativa del cartucho con fondo degradado y scanlines. */
export function GameThumb({
  id,
  className,
}: {
  id: GameId;
  className?: string;
}) {
  const { Art, bg } = THUMBS[id];
  return (
    <div className={cn("thumb", bg, className)}>
      <Art />
    </div>
  );
}
