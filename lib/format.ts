/**
 * Rellena con ceros a la izquierda (equivale a `avPad` del prototipo).
 * Puntuaciones: 6 dígitos (`formatScore(4820)` → "004820"); rangos y nivel: `formatScore(n, 2)`.
 */
export function formatScore(n: number, width = 6): string {
  return String(Math.max(0, Math.floor(n))).padStart(width, "0");
}
