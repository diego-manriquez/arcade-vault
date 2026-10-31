"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { MockUser } from "@/types/user";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS, isPlayerRoute } from "./nav-items";

interface NavbarProps {
  user: MockUser | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  if (isPlayerRoute(pathname)) return null;

  return (
    <>
      <header className="nav">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-2.5">
          <Link
            href="/"
            className="logo-btn inline-flex items-center no-underline"
            aria-label="Arcade Vault, ir a la Biblioteca"
          >
            <span className="px neon-c text-sm">
              ARCADE<span className="neon-m"> VAULT</span>
            </span>
          </Link>

          <nav className="nav-links flex gap-8" aria-label="Principal">
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "nav-link inline-flex items-center no-underline",
                    active && "on",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hide-sm flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="px flex size-10 items-center justify-center bg-neon-magenta text-xs text-background shadow-[0_0_12px_rgba(255,0,110,0.7)]"
                >
                  {user.name.charAt(0)}
                </span>
                <span className="font-bold">{user.name}</span>
                <Button
                  variant="ghost"
                  className="!px-3 !py-2.5 !text-[9px]"
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Button href="/acceso" variant="magenta" className="hide-sm">
                Iniciar Sesión
              </Button>
            )}
            <button
              type="button"
              className="burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg width="22" height="18" viewBox="0 0 22 18" aria-hidden="true">
                <rect y="0" width="22" height="3" fill="#00f5ff" />
                <rect y="7.5" width="22" height="3" fill="#00f5ff" />
                <rect y="15" width="22" height="3" fill="#00f5ff" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} user={user} />
    </>
  );
}
