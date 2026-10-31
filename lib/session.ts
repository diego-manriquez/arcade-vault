import type { MockUser } from "@/types/user";

/**
 * Sesión simulada (SPEC 01). No hay autenticación real.
 *
 * Devuelve `null` para ver la UI de invitado. Para ver la UI con sesión,
 * devuelve por ejemplo `{ name: "NEONKID" }`. Es el único punto que habrá
 * que reemplazar cuando exista auth real.
 */
export function getMockUser(): MockUser | null {
  return null;
}
