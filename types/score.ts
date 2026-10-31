export interface ScoreEntry {
  rank: number; // 1..10
  name: string; // alias, p. ej. "NEONKID"
  score: number;
  date: string; // "DD/MM/AAAA"
  isMine?: boolean; // resalta la fila "TÚ"
}
