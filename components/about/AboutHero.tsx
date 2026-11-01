import { HighlightIcon, type HighlightKind } from "./HighlightIcon";

const HIGHLIGHTS: { icon: HighlightKind; text: string; accent: "magenta" | "cyan" | "green" }[] = [
  { icon: "HEART", text: "HECHO CON ❤️ PARA JUGADORES", accent: "magenta" },
  { icon: "BROWSER", text: "JUEGOS EN HTML — CORREN EN CUALQUIER NAVEGADOR", accent: "cyan" },
  { icon: "PLANT", text: "PROYECTO EN CONSTANTE CRECIMIENTO", accent: "green" },
];

export function AboutHero() {
  return (
    <section className="about-hero" aria-labelledby="about-title">
      <div className="kicker pixel neon-yellow">▸ ACERCA DE</div>
      <h1 id="about-title" className="about-title">
        ACERCA DE ARCADE VAULT
      </h1>
      <p className="about-mission">
        ARCADE VAULT nació del amor por los videojuegos clásicos. Nuestra misión es preservar y
        celebrar los arcades que definieron una generación, haciéndolos accesibles para todos, en
        cualquier lugar y sin costo.
      </p>

      <div className="highlight-row">
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={h.icon}
            className={"highlight " + h.accent}
            style={{ transitionDelay: i * 80 + "ms" }}
          >
            <HighlightIcon kind={h.icon} />
            <div className="hl-text pixel">{h.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
