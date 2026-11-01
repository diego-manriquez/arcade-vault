"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Etiqueta HTML que envuelve el contenido. */
  as?: "section" | "div";
}

/**
 * Hace aparecer su contenido cuando entra en pantalla (umbral 0,12).
 *
 * El contenido es visible en el render del servidor. Solo después de montar,
 * y si el navegador soporta IntersectionObserver y no pide movimiento
 * reducido, se "arma" (clase `armed`, oculto) y se muestra al entrar (`in`).
 * Sin JS o con `prefers-reduced-motion` nunca llega a ocultarse.
 */
export function Reveal({ children, className, as: Tag = "section" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    el.classList.add("armed");
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove("armed", "in");
    };
  }, []);

  return (
    <Tag ref={ref as never} className={cn("reveal", className)}>
      {children}
    </Tag>
  );
}
