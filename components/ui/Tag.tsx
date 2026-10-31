import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Etiqueta pequeña de categoría (fuente pixel, rosa). */
export function Tag({ className, ...props }: ComponentProps<"span">) {
  return <span {...props} className={cn("tag", className)} />;
}
