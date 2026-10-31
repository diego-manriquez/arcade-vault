# SPEC 01 — MVP visual de Arcade Vault (todas las pantallas)

> **Status:** Implemented
> **Depends on:** Ninguna
> **Date:** 2026-10-31
> **Objective:** Portar a Next.js (App Router, Tailwind v4) todas las pantallas del prototipo `references/ARCADE VAULT – Arcade Vault — App.html`, separadas por ruta y componente, solo en su parte visual y sin implementar ningún juego.

---

## Por qué existe esta spec

El prototipo es un único HTML empaquetado (bundle) que funciona como SPA: una vista activa en `useState`, un overlay para el detalle y un motor de Snake de demostración. Esta spec lo convierte en una estructura mantenible: una ruta por pantalla, componentes reutilizables, datos tipados y estilos como tokens. Los juegos reales, la autenticación real y el backend quedan para specs posteriores.

Pantallas identificadas en el prototipo:

| # | Pantalla | Origen en el HTML | Ruta destino |
|---|----------|-------------------|--------------|
| 1 | Biblioteca (búsqueda + filtro por categoría + tarjetas) | `showLibrary` | `/` |
| 2 | Salón de la Fama (tabs por juego + tabla Top 10) | `showFame` | `/salon-de-la-fama` |
| 3 | Acceso (Iniciar sesión / Crear cuenta / social / invitado) | `showAuth` | `/acceso` |
| 4 | Detalle de juego (descripción, controles, Top 10 lateral) | `detailOpen` (overlay) | `/juegos/[id]` |
| 5 | Jugador (HUD, marco de pantalla, D-pad, estados) | `showPlayer` | `/juegos/[id]/jugar` |
| 6 | Modal "Fin del juego" | `over` (modal) | Componente dentro de la ruta 5 |
| — | Navbar + menú móvil (drawer) | `showNav`, `aside` | Componentes en `app/layout.tsx` |

---

## Scope

**In:**

- Rutas de App Router: `/`, `/salon-de-la-fama`, `/acceso`, `/juegos/[id]`, `/juegos/[id]/jugar` y `not-found.tsx`.
- Navbar y menú móvil compartidos en `app/layout.tsx`, con enlace activo según la ruta.
- Sistema visual como tokens en `app/globals.css` (`@theme`): colores neón, fuentes, scanlines, grid animado, sol, parpadeo/flicker, animaciones de entrada.
- Fuentes con `next/font/google`: `Press Start 2P` (títulos) y `Courier Prime` (texto).
- Miniaturas SVG de los 6 juegos como componentes.
- Interacciones puramente visuales en componentes cliente: búsqueda y filtro de la biblioteca, tabs de acceso, abrir/cerrar menú móvil, pausa y estados de la pantalla de juego.
- Variantes de UI según sesión (invitado / con usuario) alimentadas por datos mock.
- Datos mock tipados: 6 juegos y Top 10 por juego, portados de `AV_GAMES` y `avSeed()` del prototipo.
- Diseño responsive (móvil y escritorio) y accesibilidad básica (roles, `aria-*`, foco visible, `prefers-reduced-motion`).
- Usar `/frontend-design` para construir la interfaz (regla de `CLAUDE.md`).

**Out of scope (para futuras specs):**

- Cualquier juego (incluido el Snake de demostración del prototipo): sin motor, bucle, canvas dibujado ni `postMessage`.
- Autenticación real: sin backend, sesiones, cookies, OAuth con Google/GitHub ni persistencia de usuario.
- Persistencia de puntuaciones (ni `localStorage` ni base de datos) y ranking global real.
- Carga de juegos en `<iframe sandbox>` desde `/games/<id>/index.html`.
- Tests automatizados (no hay runner configurado).
- Internacionalización: la interfaz queda solo en español.

---

## Modelo de datos

Datos mock estáticos; no se persiste nada.

```ts
// types/game.ts
export type GameId = "ark" | "tet" | "snk" | "maz" | "inv" | "ast";

export type Category =
  | "ROMPELADRILLOS" | "PUZLE" | "CLÁSICO" | "LABERINTO" | "DISPAROS";

export interface Game {
  id: GameId;
  title: string;        // "ARKANOID"
  category: Category;
  color: string;        // acento neón del juego
  short: string;        // texto de la tarjeta
  description: string;  // texto del detalle
  controls: string;     // "← → mover · Espacio lanzar"
}

// types/score.ts
export interface ScoreEntry {
  rank: number;         // 1..10
  name: string;         // alias, p. ej. "NEONKID"
  score: number;
  date: string;         // "DD/MM/AAAA"
  isMine?: boolean;     // resalta la fila "TÚ"
}

// types/user.ts
export interface MockUser {
  name: string;         // alias mostrado en navbar y HUD
}
```

Convenciones:

- `data/games.ts` exporta `GAMES: Game[]` y `getGame(id)`.
- `data/scores.ts` exporta `getTopScores(id: GameId): ScoreEntry[]` y `getBestScore(id)`; el resultado es determinista (portado de `avSeed()`), sin `Math.random`.
- `lib/session.ts` exporta `getMockUser(): MockUser | null`, que devuelve `null` por defecto (invitado). Cambiar el valor devuelto es el interruptor para ver la UI con sesión; hay una sola función, así que el reemplazo futuro por auth real toca un único punto.
- `lib/format.ts` exporta `formatScore(n)` (relleno con ceros, como `avPad` del prototipo).
- Los textos de UI permanecen en español, tal cual el prototipo.

Estructura de archivos resultante:

```
app/
  layout.tsx            fuentes, fondo (sol + grid + scanlines), Navbar
  page.tsx              Biblioteca
  not-found.tsx
  salon-de-la-fama/page.tsx
  acceso/page.tsx
  juegos/[id]/page.tsx
  juegos/[id]/jugar/page.tsx
components/
  layout/   Navbar.tsx, MobileMenu.tsx, Backdrop.tsx
  ui/       Button.tsx, Tag.tsx, Badge.tsx, Tabs.tsx, Modal.tsx, NeonText.tsx
  games/    GameCard.tsx, GameThumb.tsx (+ 6 miniaturas SVG), LibraryBrowser.tsx
  scores/   ScoreTable.tsx, ScoreList.tsx, MyBestBanner.tsx
  auth/     AuthCard.tsx, AuthForm.tsx
  player/   PlayerShell.tsx, Hud.tsx, GameScreen.tsx, Dpad.tsx, GameOverModal.tsx
data/       games.ts, scores.ts
lib/        session.ts, format.ts
types/      game.ts, score.ts, user.ts
```

---

## Plan de implementación

1. **Leer la guía de Next.js.** Revisar `node_modules/next/dist/docs/` (App Router, `params`/`searchParams`, `next/font`, `not-found`) según advierte `AGENTS.md`. Sin cambios de código; fija las convenciones de la versión 16.
2. **Tokens y fondo.** Invocar `/frontend-design`. Definir colores, fuentes y animaciones en `app/globals.css` (`@theme`), cargar fuentes en `app/layout.tsx` y añadir `Backdrop` (sol, grid, scanlines). `app/page.tsx` muestra solo el título. Se ve el fondo y las fuentes.
3. **Tipos y datos mock.** Crear `types/`, `data/games.ts`, `data/scores.ts`, `lib/session.ts`, `lib/format.ts`. Sin UI nueva; compila.
4. **Componentes base `ui/`.** `Button` (variantes: base, magenta, amarillo, ghost, sólido), `Tag`, `Badge`, `Tabs`, `NeonText`, `Modal`. Verificables renderizándolos en `/`.
5. **Navbar y menú móvil.** `Navbar` y `MobileMenu` (cliente) con enlaces a `/` y `/salon-de-la-fama`, enlace activo con `usePathname`, botón "Iniciar Sesión" a `/acceso` o alias + "Salir" si `getMockUser()` devuelve usuario. Montados en `layout.tsx`.
6. **Biblioteca (`/`).** `GameThumb` con las 6 miniaturas SVG, `GameCard`, `LibraryBrowser` (búsqueda por nombre/categoría, chips de categoría con `aria-pressed`, contador, estado "NINGÚN CARTUCHO COINCIDE" con "Limpiar filtros"). Cada tarjeta enlaza a `/juegos/[id]`.
7. **Detalle (`/juegos/[id]`).** Layout de dos columnas con descripción, controles, mejor puntuación, `ScoreList` Top 10, botones "Jugar ahora" (a `/juegos/[id]/jugar`) y "Volver al Vault" (a `/`), y aviso de invitado con enlace a `/acceso`. `generateStaticParams` con los 6 ids; id inválido llama a `notFound()`.
8. **Salón de la Fama (`/salon-de-la-fama`).** Tabs por juego controladas por `?juego=<id>` (por defecto `ark`; valor inválido cae a `ark`), `ScoreTable` accesible (caption, `scope="col"`), banner `MyBestBanner` (con usuario) o aviso de invitado con botón a `/acceso`.
9. **Acceso (`/acceso`).** `AuthCard` y `AuthForm` (cliente): tabs "Iniciar sesión" / "Crear cuenta" (el campo correo solo aparece en registro), validación visual de campos vacíos, correo con formato inválido y contraseña menor a 6 caracteres con `role="alert"`; el envío válido no autentica ni navega. Botones Google/GitHub inertes. "Jugar como invitado" navega a `/`.
10. **Jugador (`/juegos/[id]/jugar`).** `PlayerShell` (cliente) con cabecera, `Hud` (puntuación, vidas, nivel, jugador), `GameScreen` (marco CRT con canvas vacío, overlay "CARGANDO CARTUCHO…" durante 1,5 s al montar y overlay "PAUSA"), `Dpad` visual y botones "Pausa/Continuar" y "Salir" (a `/juegos/[id]`). Teclas `P` alterna pausa.
11. **Modal Fin del juego.** `GameOverModal` con puntuación final fija de ejemplo, botón "Guardar puntuación" que pasa a "PUNTUACIÓN GUARDADA" solo en estado local, "Jugar de nuevo" (cierra el modal y reinicia la carga) y "Volver al Vault" (a `/`). Se abre con un botón temporal **"Simular fin de juego"** en `PlayerShell`, marcado con comentario para retirarlo cuando existan juegos.
12. **Cierre.** `not-found.tsx` con estética arcade, revisión responsive (360, 768, 1280 px), foco por teclado y `prefers-reduced-motion`; ejecutar `npm run lint` y `npm run build`.

---

## Criterios de aceptación

- [ ] `npm run lint` y `npm run build` terminan sin errores.
- [ ] Existen las rutas `/`, `/salon-de-la-fama`, `/acceso`, `/juegos/[id]` y `/juegos/[id]/jugar`; cada una carga sin errores en la consola del navegador.
- [ ] `/juegos/xyz` y `/juegos/xyz/jugar` muestran `not-found`.
- [ ] La Biblioteca muestra 6 tarjetas, cada una con miniatura, categoría, título, texto corto, mejor puntuación y botón "Jugar".
- [ ] Escribir "tetris" en la búsqueda deja solo la tarjeta TETRIS; escribir "disparos" deja SPACE INVADERS y ASTEROIDS.
- [ ] Una combinación sin resultados muestra "NINGÚN CARTUCHO COINCIDE" y "Limpiar filtros" restaura las 6 tarjetas.
- [ ] Pulsar una tarjeta lleva a `/juegos/<id>` con título, descripción, controles, mejor puntuación y Top 10 de ese juego (10 filas).
- [ ] `/salon-de-la-fama?juego=tet` marca la tab TETRIS y muestra su tabla de 10 filas con columnas RANGO, JUGADOR, PUNTUACIÓN y FECHA; `?juego=xyz` muestra ARKANOID.
- [ ] Con `getMockUser()` en `null`, el navbar muestra "Iniciar Sesión" y el Salón de la Fama muestra el aviso de invitado; con un usuario, el navbar muestra alias, inicial y "Salir", y el Salón muestra "TU MEJOR MARCA".
- [ ] En `/acceso`, "Crear cuenta" muestra el campo correo y "Iniciar sesión" lo oculta; enviar vacío muestra un mensaje de error con `role="alert"`.
- [ ] En `/juegos/<id>/jugar` aparece "CARGANDO CARTUCHO…" al entrar, desaparece a los ~1,5 s, "Pausa" muestra el overlay "PAUSA" y la tecla `P` lo alterna.
- [ ] "Simular fin de juego" abre el modal "FIN DEL JUEGO"; "Guardar puntuación" lo cambia a "PUNTUACIÓN GUARDADA"; "Volver al Vault" navega a `/`.
- [ ] En 360 px de ancho no hay scroll horizontal, el navbar muestra el botón hamburguesa y el menú móvil abre y cierra con su botón de cierre y el scrim.
- [ ] Con `prefers-reduced-motion: reduce` no corren las animaciones de parpadeo ni de grid.
- [ ] No existe ninguna lógica de juego: ningún `setInterval`/`requestAnimationFrame` de juego ni dibujado en el `<canvas>`.

---

## Decisiones tomadas y descartadas

- **Sí:** rutas reales de App Router, una por pantalla. Dan URLs compartibles, botón atrás nativo y separación natural por `page.tsx`.
- **No:** replicar la SPA con estado `view` en un único componente cliente. Es fiel al HTML pero contradice las buenas prácticas pedidas.
- **Sí:** el detalle del juego es una página (`/juegos/[id]`) y no un overlay. Se puede enlazar, y el modal queda reservado a "Fin del juego".
- **Sí:** tabs del Salón de la Fama vía `?juego=`. Mantiene la página como Server Component y la tab seleccionada es compartible.
- **Sí:** Server Components por defecto; `"use client"` solo donde hay estado o eventos (`LibraryBrowser`, `AuthForm`, `MobileMenu`, `Navbar` si requiere `usePathname`, `PlayerShell`).
- **Sí:** Tailwind v4 con tokens en `@theme` de `globals.css`. Aprovecha el stack instalado; **No** CSS Modules ni copiar el CSS del prototipo tal cual.
- **Sí:** todo mock sin lógica real, con la sesión como función única (`getMockUser`) para poder ver ambas variantes de UI. **No** auth simulada con `localStorage`: añadiría persistencia que esta spec excluye.
- **Sí:** pantalla de juego maquetada (cargando, pausa, fin) con botón temporal "Simular fin de juego". **No** se porta el Snake de demostración: la instrucción es no implementar ningún juego.
- **Sí:** el `<canvas>` queda vacío como contenedor reservado. Los juegos futuros decidirán si usan canvas o `<iframe sandbox>` (el prototipo ya menciona `/games/<id>/index.html` y `postMessage`); esa decisión pertenece a la spec de juegos.
- **Sí:** datos de ranking deterministas (sin `Math.random`) para evitar errores de hidratación y resultados distintos entre renders.
- **Sí:** `/frontend-design` para la interfaz, por la regla de `CLAUDE.md`.
- **No:** reutilizar el bundle original en runtime ni extraer las fuentes `woff2` embebidas; se cargan desde Google Fonts con `next/font`.

---

## Riesgos identificados

| Riesgo | Mitigación |
|--------|-----------|
| Next.js 16 tiene cambios incompatibles respecto a lo habitual (`params`/`searchParams` asíncronos, otras convenciones) | El paso 1 obliga a leer `node_modules/next/dist/docs/` antes de escribir código. |
| El tailwind del proyecto usa `@tailwindcss/turbopack`; las animaciones y efectos personalizados pueden no encajar en utilidades | Definir keyframes y utilidades en `globals.css` y usar `@theme` para tokens; verificar con `npm run build`. |
| `Press Start 2P` es una fuente bitmap: tamaños y `line-height` mal ajustados rompen el layout en móvil | Revisar 360 px en el paso 12 y mantener `clamp()` en títulos como en el prototipo. |
| El botón "Simular fin de juego" queda olvidado cuando lleguen los juegos | Marcado con comentario y listado aquí; la spec de juegos debe retirarlo. |
| El temporizador de carga de 1,5 s provoca diferencias de hidratación | Se inicia dentro de `useEffect` en el cliente; el render inicial es el mismo en servidor y cliente. |
| Contraste insuficiente de textos grises y neón sobre el fondo oscuro | Usar los colores ya definidos en el prototipo (`#b9b9d2`, `#8e8eab`) y revisar contraste en el paso 12. |

---

## Qué **no** está en esta spec

- Ningún juego (ni siquiera el Snake de demostración), puntuación real o `postMessage` de juegos.
- Autenticación real, OAuth, sesiones o backend.
- Persistencia de puntuaciones y ranking global real.
- Carga de juegos por `<iframe sandbox>`.
- Tests automatizados.
- Internacionalización.

Cada uno de estos puntos, si se aborda, va en su propia spec.
