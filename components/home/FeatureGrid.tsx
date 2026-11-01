import { FEATURES } from "@/data/home";
import { FeatureIcon } from "./FeatureIcon";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function FeatureGrid() {
  return (
    <Reveal className="home-section">
      <SectionHead kicker="// 01" title="¿POR QUÉ ARCADE VAULT?" accent="magenta" />
      <div className="feature-grid">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={`feature-card ${f.accent}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <FeatureIcon kind={f.icon} />
            <div className="ft-title pixel">{f.title}</div>
            <div className="ft-desc">{f.description}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
