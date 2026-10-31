"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Game } from "@/types/game";
import { Dpad } from "./Dpad";
import { GameOverModal } from "./GameOverModal";
import { GameScreen } from "./GameScreen";
import { Hud } from "./Hud";

/** Duración de la pantalla "CARGANDO CARTUCHO…". */
const LOAD_MS = 1500;

/** Puntuación de ejemplo que muestra el botón temporal "Simular fin de juego". */
const EXAMPLE_SCORE = 12340;

interface PlayerShellProps {
  game: Game;
  playerName: string;
  isGuest: boolean;
}

export function PlayerShell({ game, playerName, isGuest }: PlayerShellProps) {
  // `runId` cambia en cada (re)inicio; la carga termina cuando `readyRun` lo alcanza.
  const [runId, setRunId] = useState(0);
  const [readyRun, setReadyRun] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);

  const loading = readyRun !== runId;

  useEffect(() => {
    const timer = setTimeout(() => setReadyRun(runId), LOAD_MS);
    return () => clearTimeout(timer);
  }, [runId]);

  useEffect(() => {
    if (loading || over) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "p") setPaused((current) => !current);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [loading, over]);

  const playAgain = () => {
    setOver(false);
    setPaused(false);
    setScore(0);
    setRunId((current) => current + 1);
  };

  // TEMPORAL: sin juego no hay nada que termine la partida. Se retira cuando existan juegos.
  const simulateGameOver = () => {
    setPaused(false);
    setScore(EXAMPLE_SCORE);
    setOver(true);
  };

  return (
    <main className="view mx-auto flex w-full max-w-[760px] flex-col gap-4 px-4 pb-16 pt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="px text-[8px] text-[#8e8eab]">
            ARCADE VAULT · AHORA JUGANDO
          </span>
          <h1 className="px neon-c m-0 text-base font-normal">{game.title}</h1>
        </div>
        <div className="flex gap-2.5">
          <Button
            variant="yellow"
            disabled={loading}
            aria-pressed={paused}
            onClick={() => setPaused((current) => !current)}
          >
            {paused ? "Continuar" : "Pausa"}
          </Button>
          <Button href={`/juegos/${game.id}`} variant="magenta">
            Salir
          </Button>
        </div>
      </div>

      <Hud score={score} lives={3} level={1} playerName={playerName} />

      <GameScreen loading={loading} paused={paused} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex max-w-[380px] flex-col items-start gap-3">
          <p className="m-0 text-sm leading-normal text-[#b9b9d2]">
            {game.controls} · P para pausar.
            <br />
            El marco está listo; el cartucho de este juego llegará en una
            próxima versión.
          </p>
          {/* TEMPORAL: retirar cuando existan juegos reales. */}
          <Button
            variant="ghost"
            className="!text-[9px]"
            disabled={loading}
            onClick={simulateGameOver}
          >
            Simular fin de juego
          </Button>
        </div>
        <Dpad />
      </div>

      {over && (
        <GameOverModal
          score={score}
          isGuest={isGuest}
          onPlayAgain={playAgain}
        />
      )}
    </main>
  );
}
