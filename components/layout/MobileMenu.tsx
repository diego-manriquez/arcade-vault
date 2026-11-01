"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import type { MockUser } from "@/types/user";
import { NAV_ITEMS } from "./nav-items";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user: MockUser | null;
}

/** Drawer lateral del menú móvil. Va fuera del `<header>` para que `position: fixed` no quede atrapado por su `backdrop-filter`. */
export function MobileMenu({ open, onClose, user }: MobileMenuProps) {
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const accountActive = pathname.startsWith("/acceso");

  return (
    <>
      <div
        className={cn("av-mobile-backdrop", open && "open")}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id="mobile-menu"
        aria-label="Menú móvil"
        aria-hidden={!open}
        inert={!open}
        className={cn("av-mobile-panel", open && "open")}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="pixel neon-cyan" style={{ fontSize: 11 }}>
            MENÚ
          </div>
          <button
            ref={closeRef}
            type="button"
            className="dbtn"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 2L14 14M14 2L2 14" stroke="#ff006e" strokeWidth="3" />
            </svg>
          </button>
        </div>

        {NAV_ITEMS.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={cn(active && "active")}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/acceso"
          onClick={onClose}
          aria-current={accountActive ? "page" : undefined}
          className={cn(accountActive && "active")}
        >
          {user ? "Cuenta" : "Iniciar Sesión"}
        </Link>

        <div style={{ flex: 1 }} />
        <div
          className="pixel"
          style={{ fontSize: 9, color: "var(--ink-faint)", letterSpacing: "0.16em" }}
        >
          CRÉDITOS · 03
        </div>
      </aside>
    </>
  );
}
