import { GAMES } from "@/data/games";
import type { GameId } from "@/types/game";
import type { ScoreEntry } from "@/types/score";

/** Puntuación del puesto 1 de cada juego (base de la semilla del prototipo). */
const BASE_SCORE: Record<GameId, number> = {
  ark: 48200,
  tet: 129800,
  snk: 2350,
  maz: 86400,
  inv: 15600,
  ast: 31900,
};

const NAMES = [
  "NEONKID",
  "PIXELA",
  "B1TMAP",
  "KOMETA",
  "RAYO_X",
  "LUNA8",
  "ZETA",
  "MOXI",
  "GLITCH",
  "VOLTIO",
  "CRTGIRL",
  "TURBO",
];

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Portado de `avSeed()` del prototipo. Determinista: sin Math.random ni Date. */
function buildTop10(gameId: GameId, gameIndex: number): ScoreEntry[] {
  const base = BASE_SCORE[gameId];
  return Array.from({ length: 10 }, (_, i) => {
    const drop = Math.round(base * (0.07 + ((i * 7 + gameIndex * 3) % 5) * 0.01));
    return {
      rank: i + 1,
      name: NAMES[(i + gameIndex * 2) % NAMES.length],
      score: base - i * drop,
      date: `${pad2(((i * 5 + gameIndex * 3) % 25) + 1)}/${pad2(((i + gameIndex) % 3) + 8)}/2026`,
    };
  });
}

const SCORES: Record<GameId, ScoreEntry[]> = Object.fromEntries(
  GAMES.map((g, i) => [g.id, buildTop10(g.id, i)]),
) as Record<GameId, ScoreEntry[]>;

export function getTopScores(id: GameId): ScoreEntry[] {
  return SCORES[id];
}

export function getBestScore(id: GameId): number {
  return SCORES[id][0].score;
}
