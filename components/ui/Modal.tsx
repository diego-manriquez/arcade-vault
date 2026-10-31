"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ModalProps {
  /** Nombre accesible del diálogo. */
  label: string;
  children: ReactNode;
  /** Se llama al pulsar Escape. Si falta, Escape no cierra. */
  onClose?: () => void;
  className?: string;
}

/**
 * Diálogo modal a pantalla completa con la tarjeta centrada.
 * Bloquea el scroll del fondo, enfoca el diálogo al abrir y devuelve el foco al cerrar.
 */
export function Modal({ label, children, onClose, className }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current?.();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      className="overlay flex items-center justify-center p-5 outline-none"
    >
      <div
        className={cn(
          "modal-card slidein flex flex-col items-center gap-5",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
