import type { Category, Game, GameId } from "@/types/game";

export const GAMES: Game[] = [
  {
    id: "ark",
    title: "ARKANOID",
    category: "ROMPELADRILLOS",
    color: "#ff006e",
    short: "Rebota la bola y pulveriza cada muro de ladrillos.",
    description:
      "Controla la nave Vaus y devuelve la bola para destruir cada fila de ladrillos. Atrapa las cápsulas de poder para alargar tu paleta o disparar láseres. Si la bola se escapa, pierdes una vida.",
    controls: "← → mover · Espacio lanzar",
  },
  {
    id: "tet",
    title: "TETRIS",
    category: "PUZLE",
    color: "#00f5ff",
    short: "Encaja las piezas y limpia líneas sin parar.",
    description:
      "Gira y coloca las piezas que caen para completar líneas horizontales. Cada línea limpia suma puntos y acelera el ritmo. Si las piezas tocan el techo, se acabó la partida.",
    controls: "← → mover · ↑ girar · ↓ bajar",
  },
  {
    id: "snk",
    title: "SNAKE",
    category: "CLÁSICO",
    color: "#34ff7a",
    short: "Come, crece y no te muerdas la cola.",
    description:
      "Guía a la serpiente por la cuadrícula y devora cada punto de energía. Con cada bocado creces y la velocidad aumenta. Chocar contra un muro o contra tu propio cuerpo cuesta una vida.",
    controls: "Flechas o WASD · P pausa",
  },
  {
    id: "maz",
    title: "PAC-MAN",
    category: "LABERINTO",
    color: "#f5ff00",
    short: "Recorre el laberinto y huye de los fantasmas.",
    description:
      "Come todos los puntos del laberinto mientras esquivas a cuatro fantasmas implacables. Las píldoras de poder te dan unos segundos para cazarlos. Limpia el tablero para pasar de nivel.",
    controls: "Flechas para moverte",
  },
  {
    id: "inv",
    title: "SPACE INVADERS",
    category: "DISPAROS",
    color: "#ff006e",
    short: "Defiende la Tierra de la flota invasora.",
    description:
      "Una flota alienígena desciende fila tras fila. Muévete tras tus búnkeres, dispara y elimínalos antes de que toquen el suelo. Cuantos menos quedan, más rápido avanzan.",
    controls: "← → mover · Espacio disparar",
  },
  {
    id: "ast",
    title: "ASTEROIDS",
    category: "DISPAROS",
    color: "#00f5ff",
    short: "Pilota en el vacío y parte cada roca espacial.",
    description:
      "Tu nave flota en un campo de asteroides. Gira, impulsa y dispara para partir las rocas en fragmentos cada vez más pequeños. Cuidado con los platillos enemigos y con tu propia inercia.",
    controls: "← → girar · ↑ impulso · Espacio disparar",
  },
];

/** Categorías de los chips de filtro, en el orden del prototipo. */
export const CATEGORIES: Category[] = [
  "PUZLE",
  "DISPAROS",
  "LABERINTO",
  "ROMPELADRILLOS",
  "CLÁSICO",
];

export function isGameId(value: string): value is GameId {
  return GAMES.some((g) => g.id === value);
}

export function getGame(id: string): Game | undefined {
  return GAMES.find((g) => g.id === id);
}
