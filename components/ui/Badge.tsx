import { cn } from "@/lib/cn";

interface BadgeProps {
  label: string;
  value: string;
  className?: string;
}

/** Insignia amarilla con etiqueta pixel y valor, p. ej. MEJOR PUNTUACIÓN 048200. */
export function Badge({ label, value, className }: BadgeProps) {
  return (
    <span className={cn("badge", className)}>
      <span className="px text-[7px]">{label}</span>
      <strong>{value}</strong>
    </span>
  );
}
