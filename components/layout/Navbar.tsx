"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
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
      <header className="av-nav">
        <Link href="/" className="logo" aria-label="Arcade Vault, ir al Inicio">
          <div className="logo-mark" aria-hidden="true" />
          <div className="logo-text neon-cyan">
            ARCADE <span className="neon-magenta">VAULT</span>
          </div>
        </Link>

        <nav className="links" aria-label="Principal">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(active && "active")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="spacer" />

        <div className="coin-counter">
          <span className="coin" aria-hidden="true" />
          <span>CRÉDITOS · 03</span>
        </div>

        {user ? (
          <div className="user-chip">
            <span
              aria-hidden="true"
              className="pixel flex size-10 items-center justify-center bg-neon-magenta text-xs text-background shadow-[0_0_12px_rgba(255,0,110,0.7)]"
            >
              {user.name.charAt(0)}
            </span>
            <span className="font-bold">{user.name}</span>
            <button type="button" className="home-btn ghost">
              Salir
            </button>
          </div>
        ) : (
          <Link href="/acceso" className="home-btn auth-btn">
            Iniciar Sesión
          </Link>
        )}

        <button
          type="button"
          className="home-btn ghost hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          ≡
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} user={user} />
    </>
  );
}
