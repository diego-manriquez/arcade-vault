import Link from "next/link";
import { getGame } from "@/data/games";
import { RECENT_SCORES, TOP_PLAYERS } from "@/data/home";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

const nf = new Intl.NumberFormat("es-ES");
const MEDALS = ["top1", "top2", "top3"] as const;

export function LiveActivity() {
  return (
    <Reveal className="home-section">
      <SectionHead kicker="// 03" title="ACTIVIDAD EN VIVO" accent="yellow" />
      <div className="activity-grid">
        <div className="activity-card">
          <div className="ac-head">
            <h3 className="ac-title pixel m-0 font-normal">▸ ÚLTIMAS PUNTUACIONES</h3>
          </div>
          <div className="ticker">
            {RECENT_SCORES.map((r, i) => (
              <div
                key={`${r.player}-${r.gameId}`}
                className="tick-row"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className={`tk-p neon-${r.accent}`}>{r.player}</span>
                <span className="tk-mid">▸ {getGame(r.gameId)?.title}</span>
                <span className="tk-s">+{nf.format(r.score)}</span>
                <span className="tk-t">{r.ago}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="activity-card">
          <div className="ac-head">
            <h3 className="ac-title pixel neon-magenta m-0 font-normal">
              ▸ TOP JUGADORES · HOY
            </h3>
            <Link href="/salon-de-la-fama" className="lb-link">
              VER SALÓN →
            </Link>
          </div>
          <div className="top-list">
            {TOP_PLAYERS.map((p, i) => (
              <div key={p.player} className={`top-row${i < 3 ? ` ${MEDALS[i]}` : ""}`}>
                <span className="tp-rk">#{String(p.rank).padStart(2, "0")}</span>
                <span className="tp-bar" aria-hidden="true">
                  <span className="tp-fill" style={{ width: `${100 - i * 16}%` }} />
                </span>
                <span className="tp-p">{p.player}</span>
                <span className="tp-s">{nf.format(p.score)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
