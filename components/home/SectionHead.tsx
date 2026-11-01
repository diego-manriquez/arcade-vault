import type { Accent } from "@/data/home";

interface SectionHeadProps {
  kicker: string;
  title: string;
  accent: Accent;
}

/** Cabecera de sección: marcador "// NN", título y regla con degradado. */
export function SectionHead({ kicker, title, accent }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div className={`kicker pixel neon-${accent}`}>
        {kicker}
      </div>
      <h2 className="section-title">{title}</h2>
      <div className="section-rule" />
    </div>
  );
}
