"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
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

  return (
    <>
      {open && <div className="scrim" onClick={onClose} aria-hidden="true" />}
      <aside
        id="mobile-menu"
        aria-label="Menú móvil"
        aria-hidden={!open}
        inert={!open}
        className={cn("panel", open && "open")}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="px neon-c text-[11px]">
            ARCADE<span className="neon-m"> VAULT</span>
          </span>
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
              className={cn("panel-link no-underline", active && "on")}
            >
              {item.label}
            </Link>
          );
        })}

        {user ? (
          <div className="mt-3 flex flex-col gap-2.5">
            <span className="text-[#b9b9d2]">
              Jugador: <strong className="text-white">{user.name}</strong>
            </span>
            <Button variant="ghost">Cerrar sesión</Button>
          </div>
        ) : (
          <Button
            href="/acceso"
            variant="magenta"
            className="mt-3"
            onClick={onClose}
          >
            Iniciar Sesión
          </Button>
        )}

        <p className="mt-auto text-[13px] text-[#8e8eab]">
          INSERTA UNA MONEDA PARA JUGAR
        </p>
      </aside>
    </>
  );
}
