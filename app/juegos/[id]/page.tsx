import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScoreList } from "@/components/scores/ScoreList";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { GAMES, getGame } from "@/data/games";
import { getBestScore, getTopScores } from "@/data/scores";
import { formatScore } from "@/lib/format";
import { getMockUser } from "@/lib/session";

export function generateStaticParams() {
  return GAMES.map((game) => ({ id: game.id }));
}

export async function generateMetadata(
  props: PageProps<"/juegos/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const game = getGame(id);
  return game ? { title: `${game.title} · Arcade Vault` } : {};
}

export default async function GameDetailPage(props: PageProps<"/juegos/[id]">) {
  const { id } = await props.params;
  const game = getGame(id);
  if (!game) notFound();

  const user = getMockUser();
  const isGuest = user === null;

  return (
    <main className="view mx-auto w-full max-w-[1180px] px-5 pb-20 pt-10">
      <Button href="/biblioteca" variant="ghost" className="mb-8">
        ← Volver al Vault
      </Button>

      <div className="detail-grid">
        <div className="flex flex-col gap-[22px]">
          <Tag className="!text-[10px]">{game.category}</Tag>
          <h1 className="px neon-c flicker m-0 text-[clamp(26px,5vw,52px)] font-normal leading-tight">
            {game.title}
          </h1>
          <p className="m-0 max-w-[620px] text-lg leading-[1.6] text-[#d0d0e4]">
            {game.description}
          </p>

          <dl className="m-0 flex flex-wrap gap-6 text-[15px] text-[#b9b9d2]">
            <div>
              <dt className="px mb-2 text-[8px] text-[#8fe9ef]">CONTROLES</dt>
              <dd className="m-0">{game.controls}</dd>
            </div>
            <div>
              <dt className="px mb-2 text-[8px] text-[#8fe9ef]">
                MEJOR PUNTUACIÓN
              </dt>
              <dd className="neon-y m-0 font-bold">
                {formatScore(getBestScore(game.id))}
              </dd>
            </div>
          </dl>

          <div className="mt-2.5 flex flex-wrap gap-3.5">
            <Button
              href={`/juegos/${game.id}/jugar`}
              variant="solid"
              className="pulse !px-7 !py-5 !text-sm"
            >
              Jugar ahora
            </Button>
            <Button href="/biblioteca" variant="magenta" className="!px-[22px] !py-5">
              Volver al Vault
            </Button>
          </div>

          {isGuest && (
            <p className="m-0 text-sm text-[#8e8eab]">
              Jugarás como invitado.{" "}
              <Link href="/acceso" className="underline">
                Inicia sesión
              </Link>{" "}
              para entrar al ranking global.
            </p>
          )}
        </div>

        <aside className="panel-box h-fit" aria-labelledby="top-title">
          <div className="flex items-center justify-between border-b-2 border-neon-magenta p-[18px]">
            <h2 id="top-title" className="px neon-m m-0 text-[11px] font-normal">
              MEJORES PUNTUACIONES
            </h2>
            <span className="px text-[8px] text-[#8e8eab]">TOP 10</span>
          </div>
          <ScoreList entries={getTopScores(game.id, user)} />
        </aside>
      </div>
    </main>
  );
}
