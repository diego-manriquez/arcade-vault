import type { Metadata } from "next";
import { MyBestBanner } from "@/components/scores/MyBestBanner";
import { ScoreTable } from "@/components/scores/ScoreTable";
import { Tabs } from "@/components/ui/Tabs";
import { GAMES, getGame, isGameId } from "@/data/games";
import { getTopScores } from "@/data/scores";
import { getMockUser } from "@/lib/session";
import type { GameId } from "@/types/game";

export const metadata: Metadata = { title: "Salón de la Fama · Arcade Vault" };

const DEFAULT_GAME: GameId = "ark";

export default async function HallOfFamePage(
  props: PageProps<"/salon-de-la-fama">,
) {
  const { juego } = await props.searchParams;
  const gameId = typeof juego === "string" && isGameId(juego) ? juego : DEFAULT_GAME;
  const game = getGame(gameId)!;

  const user = getMockUser();
  const entries = getTopScores(game.id, user);

  return (
    <main className="view mx-auto flex w-full max-w-[1040px] flex-col gap-7 px-5 pb-[120px] pt-16">
      <div className="flex flex-col gap-3.5">
        <p className="px neon-y m-0 text-[10px]">TOP 10 GLOBAL</p>
        <h1 className="px neon-m m-0 text-[clamp(22px,4.6vw,44px)] font-normal leading-tight">
          SALÓN DE LA FAMA
        </h1>
      </div>

      <Tabs
        label="Juegos"
        selectedId={game.id}
        items={GAMES.map((g) => ({
          id: g.id,
          label: g.title,
          href: `/salon-de-la-fama?juego=${g.id}`,
        }))}
      />

      <MyBestBanner user={user} entries={entries} />

      <ScoreTable entries={entries} gameTitle={game.title} />

      <p className="m-0 text-sm text-[#8e8eab]">
        Las marcas de invitado se guardan solo en este dispositivo. Las cuentas
        registradas compiten en el ranking global.
      </p>
    </main>
  );
}
