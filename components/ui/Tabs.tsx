import Link from "next/link";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  /** Si existe, la pestaña es un enlace (navegación); si no, un botón. */
  href?: string;
}

interface TabsProps {
  items: TabItem[];
  selectedId: string;
  label: string;
  /** Requerido para las pestañas sin `href`. Hace falta un Client Component como padre. */
  onSelect?: (id: string) => void;
  /** `pill`: pestañas con relleno (Salón de la Fama). `line`: subrayado (Acceso). */
  variant?: "pill" | "line";
  className?: string;
}

/** Lista de pestañas accesible (`role="tablist"`). */
export function Tabs({
  items,
  selectedId,
  label,
  onSelect,
  variant = "pill",
  className,
}: TabsProps) {
  const base = variant === "pill" ? "tab" : "atab";
  const wrapper = variant === "pill" ? "tabs" : "flex";

  return (
    <div role="tablist" aria-label={label} className={cn(wrapper, className)}>
      {items.map((item) => {
        const selected = item.id === selectedId;
        const classes = cn(base, selected && "on");

        if (item.href) {
          return (
            <Link
              key={item.id}
              href={item.href}
              role="tab"
              aria-selected={selected}
              className={cn(classes, "inline-flex items-center no-underline")}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={classes}
            onClick={() => onSelect?.(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
