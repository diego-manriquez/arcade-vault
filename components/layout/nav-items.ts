export interface NavItem {
  href: string;
  label: string;
  /** Rutas que marcan este enlace como activo. */
  isActive: (pathname: string) => boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Inicio",
    isActive: (p) => p === "/",
  },
  {
    href: "/biblioteca",
    label: "Biblioteca",
    isActive: (p) => p.startsWith("/biblioteca") || p.startsWith("/juegos"),
  },
  {
    href: "/salon-de-la-fama",
    label: "Salón de la Fama",
    isActive: (p) => p.startsWith("/salon-de-la-fama"),
  },
  {
    href: "/acerca-de",
    label: "Acerca de",
    isActive: (p) => p.startsWith("/acerca-de"),
  },
];

/** La pantalla de juego va a pantalla completa, sin navbar. */
export function isPlayerRoute(pathname: string): boolean {
  return /^\/juegos\/[^/]+\/jugar\/?$/.test(pathname);
}
