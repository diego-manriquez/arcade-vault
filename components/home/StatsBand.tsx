import { STATS } from "@/data/home";
import { Reveal } from "./Reveal";

export function StatsBand() {
  return (
    <Reveal className="home-stats">
      <div className="stats-inner">
        {STATS.map((stat, i) => (
          <div
            key={stat.unit}
            className="stat-block"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="stat-n neon-yellow">{stat.value}</div>
            <div className="stat-u pixel">{stat.unit}</div>
            <div className="stat-s">{stat.caption}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
