import Link from "next/link";
import { GameThumb } from "@/components/games/GameThumb";
import { GAMES } from "@/data/games";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function GamesPreview() {
  return (
    <Reveal className="home-section">
      <SectionHead kicker="// 02" title="JUEGOS DISPONIBLES AHORA" accent="cyan" />
      <div className="mini-rail">
        {GAMES.slice(0, 6).map((game) => (
          <Link key={game.id} href={`/juegos/${game.id}`} className="mini-card">
            <div className="mini-cover">
              <GameThumb id={game.id} className="absolute inset-0 !aspect-auto" />
            </div>
            <div className="mini-meta">
              <div className="mini-title">{game.title}</div>
              <div className="mini-cat">{game.category}</div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link href="/biblioteca" className="home-btn lg">
          VER TODOS LOS JUEGOS →
        </Link>
      </div>
    </Reveal>
  );
}
