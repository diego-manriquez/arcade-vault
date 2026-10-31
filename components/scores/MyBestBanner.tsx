import { Button } from "@/components/ui/Button";
import { formatScore } from "@/lib/format";
import type { ScoreEntry } from "@/types/score";
import type { MockUser } from "@/types/user";

interface MyBestBannerProps {
  user: MockUser | null;
  /** Top 10 del juego seleccionado, con `isMine` ya marcado. */
  entries: ScoreEntry[];
}

/** Con sesión: "TU MEJOR MARCA". Como invitado: aviso con acceso a /acceso. */
export function MyBestBanner({ user, entries }: MyBestBannerProps) {
  if (!user) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 border-2 border-dashed border-[#3a3a52] px-5 py-3.5">
        <span className="text-[#b9b9d2]">
          Inicia sesión para ver{" "}
          <strong className="text-[#ff5c9d]">TU MEJOR MARCA</strong> resaltada en
          la tabla.
        </span>
        <Button href="/acceso" variant="magenta" className="!text-[9px]">
          Iniciar Sesión
        </Button>
      </div>
    );
  }

  const mine = entries.filter((entry) => entry.isMine);
  const best = mine.length ? Math.max(...mine.map((entry) => entry.score)) : 0;
  const rank = mine.length ? Math.min(...mine.map((entry) => entry.rank)) : 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-2 border-neon-magenta bg-[rgba(255,0,110,0.08)] px-5 py-4 shadow-[0_0_18px_rgba(255,0,110,0.3)]">
      <span className="px text-[10px] text-[#ff5c9d]">TU MEJOR MARCA</span>
      <span className="text-lg">
        <strong>{user.name}</strong> ·{" "}
        <span className="px neon-y text-[13px]">
          {best ? formatScore(best) : "------"}
        </span>{" "}
        <span className="text-[#b9b9d2]">
          {best
            ? `(puesto ${rank} del top 10)`
            : "Aún sin marca en este juego"}
        </span>
      </span>
    </div>
  );
}
