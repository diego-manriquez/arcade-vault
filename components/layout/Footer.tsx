"use client";

import { usePathname } from "next/navigation";
import { isPlayerRoute } from "./nav-items";

/** Pie de página. Como el navbar, no se muestra en la pantalla de juego. */
export function Footer() {
  const pathname = usePathname();
  if (isPlayerRoute(pathname)) return null;

  return (
    <footer className="av-footer">
      © 2026 ARCADE VAULT · HECHO CON PIXELES Y NEÓN · v2.6.0
    </footer>
  );
}
