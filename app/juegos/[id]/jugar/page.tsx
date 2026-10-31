import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlayerShell } from "@/components/player/PlayerShell";
import { GAMES, getGame } from "@/data/games";
import { getMockUser } from "@/lib/session";

export function generateStaticParams() {
  return GAMES.map((game) => ({ id: game.id }));
}

export async function generateMetadata(
  props: PageProps<"/juegos/[id]/jugar">,
): Promise<Metadata> {
  const { id } = await props.params;
  const game = getGame(id);
  return game ? { title: `Jugando a ${game.title} · Arcade Vault` } : {};
}

export default async function PlayPage(props: PageProps<"/juegos/[id]/jugar">) {
  const { id } = await props.params;
  const game = getGame(id);
  if (!game) notFound();

  const user = getMockUser();

  return (
    <PlayerShell
      game={game}
      playerName={user?.name ?? "INVITADO"}
      isGuest={user === null}
    />
  );
}
