export interface NavItem {
  href: string;
  label: string;
  /** Rutas que marcan este enlace como activo. */
  isActive: (pathname: string) => boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Biblioteca",
    isActive: (p) => p === "/" || p.startsWith("/juegos"),
  },
  {
    href: "/salon-de-la-fama",
    label: "Salón de la Fama",
    isActive: (p) => p.startsWith("/salon-de-la-fama"),
  },
];

/** La pantalla de juego va a pantalla completa, sin navbar. */
export function isPlayerRoute(pathname: string): boolean {
  return /^\/juegos\/[^/]+\/jugar\/?$/.test(pathname);
}
