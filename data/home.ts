import type { GameId } from "@/types/game";

/**
 * Contenido estático de la landing (SPEC 02), portado de references/home-about.
 * Es texto de ejemplo: no hay actividad, ranking ni estadísticas reales.
 */

export type Accent = "cyan" | "yellow" | "magenta" | "green";

export interface Feature {
  icon: "GAMEPAD" | "FREE" | "TROPHY" | "ROCKET";
  title: string;
  description: string;
  accent: Accent;
}

export interface Stat {
  value: string;
  unit: string;
  caption: string;
}

export interface RecentScore {
  player: string;
  gameId: GameId;
  score: number;
  ago: string;
  accent: Accent;
}

export interface TopPlayer {
  rank: number;
  player: string;
  score: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const FEATURES: Feature[] = [
  {
    icon: "GAMEPAD",
    title: "JUEGOS CLÁSICOS",
    description:
      "Arkanoid, Tetris, Snake y muchos más. Los mejores arcades de todos los tiempos en un solo lugar.",
    accent: "cyan",
  },
  {
    icon: "FREE",
    title: "100% GRATIS",
    description:
      "Sin suscripciones, sin pagos ocultos. Todos los juegos disponibles de forma gratuita.",
    accent: "yellow",
  },
  {
    icon: "TROPHY",
    title: "LADDER BOARDS",
    description:
      "Compite con jugadores de todo el mundo. Escala el ranking y demuestra quién es el mejor.",
    accent: "magenta",
  },
  {
    icon: "ROCKET",
    title: "SIEMPRE CRECIENDO",
    description:
      "Agregamos nuevos juegos constantemente. Vuelve seguido, siempre habrá algo nuevo que jugar.",
    accent: "green",
  },
];

export const STATS: Stat[] = [
  { value: "12+", unit: "JUEGOS", caption: "Y CONTANDO" },
  { value: "MILES", unit: "DE PARTIDAS", caption: "JUGADAS CADA DÍA" },
  { value: "GLOBAL", unit: "RANKING", caption: "COMPITE CON EL MUNDO" },
];

/**
 * Los juegos de la referencia se reasignan a los del proyecto por afinidad
 * (Caída→TETRIS, Glotón→PAC-MAN, Invasores→SPACE INVADERS, Rocas→ASTEROIDS,
 * Bloque Buster→ARKANOID, Serpentina→SNAKE). Ranaria no tiene equivalente y
 * pasa a ARKANOID.
 */
export const RECENT_SCORES: RecentScore[] = [
  { player: "NEONFOX", gameId: "tet", score: 184220, ago: "hace 2 min", accent: "magenta" },
  { player: "PX_KAI", gameId: "maz", score: 96400, ago: "hace 5 min", accent: "yellow" },
  { player: "Z3R0COOL", gameId: "inv", score: 54190, ago: "hace 8 min", accent: "green" },
  { player: "VAULT_07", gameId: "ast", score: 41200, ago: "hace 12 min", accent: "cyan" },
  { player: "GLITCHA", gameId: "ark", score: 28450, ago: "hace 18 min", accent: "cyan" },
  { player: "ARKADYA", gameId: "snk", score: 7820, ago: "hace 24 min", accent: "green" },
  { player: "CYBER_LU", gameId: "ark", score: 18900, ago: "hace 31 min", accent: "yellow" },
];

export const TOP_PLAYERS: TopPlayer[] = [
  { rank: 1, player: "NEONFOX", score: 312840 },
  { rank: 2, player: "PX_KAI", score: 248110 },
  { rank: 3, player: "M00NRYU", score: 196720 },
  { rank: 4, player: "VAULT_07", score: 154300 },
  { rank: 5, player: "GLITCHA", score: 138900 },
];

export const PRICING_PERKS: string[] = [
  "✔ Acceso a todos los juegos",
  "✔ Ranking global y salón de la fama",
  "✔ Sin anuncios entre partidas",
  "✔ Guarda tus puntuaciones",
  "✔ Nuevos juegos cada mes",
  "✔ Funciona en cualquier navegador",
];

export const FAQ: FaqItem[] = [
  {
    question: "¿REALMENTE ES GRATIS?",
    answer:
      'Sí. Arcade Vault es un proyecto sin fines de lucro hecho por amor a los clásicos. No hay versión "premium" escondida.',
  },
  {
    question: "¿NECESITO CREAR CUENTA?",
    answer:
      "No. Puedes jugar como invitado. Si quieres guardar tu puntuación y aparecer en el ranking, regístrate en 10 segundos.",
  },
  {
    question: "¿CÓMO SOBREVIVEN SIN COBRAR?",
    answer:
      "Es un proyecto comunitario. Si te gusta, compártelo. Esa es toda la moneda que aceptamos.",
  },
];
