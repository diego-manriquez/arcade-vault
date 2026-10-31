import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

export type NeonColor = "cyan" | "magenta" | "yellow";

const COLOR_CLASS: Record<NeonColor, string> = {
  cyan: "neon-c",
  magenta: "neon-m",
  yellow: "neon-y",
};

type NeonTextProps<T extends ElementType> = {
  as?: T;
  color: NeonColor;
  flicker?: boolean;
  blink?: boolean;
} & Omit<ComponentProps<T>, "color">;

/** Texto con brillo neón en fuente pixel. Elemento configurable con `as`. */
export function NeonText<T extends ElementType = "span">({
  as,
  color,
  flicker,
  blink,
  className,
  ...props
}: NeonTextProps<T>) {
  const Component: ElementType = as ?? "span";
  return (
    <Component
      {...props}
      className={cn(
        "px",
        COLOR_CLASS[color],
        flicker && "flicker",
        blink && "blink",
        className,
      )}
    />
  );
}
