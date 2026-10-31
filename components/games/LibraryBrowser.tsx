"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Category, Game } from "@/types/game";
import { GameCard } from "./GameCard";

const ALL = "TODOS";
type Filter = typeof ALL | Category;

/** Minúsculas y sin tildes, para que "clasico" encuentre "CLÁSICO". */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

interface LibraryBrowserProps {
  games: Game[];
  categories: Category[];
}

export function LibraryBrowser({ games, categories }: LibraryBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>(ALL);

  const q = normalize(query.trim());
  const filtered = games.filter((game) => {
    const matchesCategory = category === ALL || game.category === category;
    const matchesQuery =
      !q ||
      normalize(game.title).includes(q) ||
      normalize(game.category).includes(q);
    return matchesCategory && matchesQuery;
  });

  const clearFilters = () => {
    setQuery("");
    setCategory(ALL);
  };

  const chips: Filter[] = [ALL, ...categories];

  return (
    <>
      <div className="mb-9 flex flex-col gap-4">
        <label htmlFor="av-search" className="sr">
          Buscar juegos
        </label>
        <div className="relative">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
            className="absolute left-4 top-[15px]"
          >
            <circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="#00f5ff" strokeWidth="2" />
            <path d="M12 12L16.5 16.5" stroke="#00f5ff" strokeWidth="2.5" />
          </svg>
          <input
            id="av-search"
            type="search"
            className="field !pl-[46px]"
            placeholder="Busca por nombre o categoría… (ej. Tetris, disparos)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div
          role="group"
          aria-label="Filtrar por categoría"
          className="flex flex-wrap gap-2"
        >
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              className={cn("chip", category === chip && "on")}
              aria-pressed={category === chip}
              onClick={() => setCategory(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
        <p
          className="px mt-1 text-[9px] text-[#8e8eab]"
          role="status"
          aria-live="polite"
        >
          {filtered.length}{" "}
          {filtered.length === 1 ? "JUEGO DISPONIBLE" : "JUEGOS DISPONIBLES"}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="cards">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[18px] border-2 border-dashed border-[#2d2d45] px-5 py-14 text-center">
          <p className="px neon-m m-0 text-xs">NINGÚN CARTUCHO COINCIDE</p>
          <p className="m-0 text-[#b9b9d2]">
            Prueba con otro nombre o quita el filtro de categoría.
          </p>
          <Button variant="yellow" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        </div>
      )}
    </>
  );
}
