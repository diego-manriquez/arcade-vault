/** Clase de medalla (oro, plata, bronce) para los puestos 1 a 3. */
export function medalClass(rank: number): string {
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  return "";
}
