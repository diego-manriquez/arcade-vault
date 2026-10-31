export type GameId = "ark" | "tet" | "snk" | "maz" | "inv" | "ast";

export type Category =
  | "ROMPELADRILLOS"
  | "PUZLE"
  | "CLÁSICO"
  | "LABERINTO"
  | "DISPAROS";

export interface Game {
  id: GameId;
  title: string; // "ARKANOID"
  category: Category;
  color: string; // acento neón del juego
  short: string; // texto de la tarjeta
  description: string; // texto del detalle
  controls: string; // "← → mover · Espacio lanzar"
}
