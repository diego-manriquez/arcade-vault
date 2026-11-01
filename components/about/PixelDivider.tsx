import { Reveal } from "@/components/home/Reveal";

/** Divisor decorativo de píxeles parpadeantes (24 píxeles). */
export function PixelDivider() {
  return (
    <Reveal as="div" className="about-divider">
      <div className="div-bar" aria-hidden="true" />
      <div className="div-pixels" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} style={{ animationDelay: i * 80 + "ms" }} />
        ))}
      </div>
      <div className="div-bar" aria-hidden="true" />
    </Reveal>
  );
}
