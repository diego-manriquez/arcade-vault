# SPEC 02 — Página Home (landing) de Arcade Vault

> **Status:** Approved
> **Depends on:** SPEC 01
> **Date:** 2026-10-31
> **Objective:** Añadir la página Home (landing) en `/` con el diseño idéntico a `references/home-about`, mover la Biblioteca a `/biblioteca` y adaptar el navbar a la referencia, sin implementar la página About.

---

## Por qué existe esta spec

El SPEC 01 portó una versión anterior del prototipo donde la Biblioteca era la portada. La carpeta `references/home-about` es una iteración posterior: añade una landing con hero, secciones y llamadas a la acción, y un navbar con "Inicio" y contador de créditos. Esta spec incorpora solo el Home y lo que necesita (ruta, navbar, estilos); la página "Acerca de" se deja fuera.

### Cómo leer la referencia

Los archivos de `references/home-about` tienen nombres cruzados respecto a su contenido. Esta es la correspondencia real:

| Archivo en la carpeta | Contenido real | Uso en esta spec |
|-----------------------|----------------|------------------|
| `about.jsx` | CSS completo del prototipo (`styles.css`) | **Fuente de estilos** del Home y del navbar (`.home-*`, `.av-nav`, `.reveal`, etc.). |
| `nav.jsx` | Bundle HTML empaquetado (1,4 MB) con todos los `.jsx` | **Fuente del código** del Home (`home.jsx`) y de los datos de ejemplo. Se extrae sin ejecutarlo. |
| `home.jsx` | Código de `nav.jsx` (Navbar + menú móvil) | **Fuente del navbar**. |
| `download (1)` | Código de `about.jsx` (página About) | **No se usa**: About queda fuera. |
| `styles.css`, `arcade-vault-standalone.html` | `.DS_Store` e imagen WebP | Ignorados. |

---

## Scope

**In:**

- Ruta `/` con el Home: `app/page.tsx` pasa a ser la landing.
- Mover la Biblioteca actual a `/biblioteca` (`app/biblioteca/page.tsx`) sin cambiar su contenido.
- Secciones del Home idénticas a la referencia, en este orden:
  1. **Hero:** eyebrow "▸ INSERTA UNA MONEDA_", título en tres líneas ("EL ARCADE / CLÁSICO ESTÁ / DE VUELTA"), subtítulo, CTAs "▶ EXPLORAR JUEGOS" (a `/biblioteca`) y "✦ CREAR CUENTA" (a `/acceso`), indicador "DESLIZA ▼" y 8 siluetas pixel flotantes decorativas.
  2. **// 01 ¿POR QUÉ ARCADE VAULT?:** 4 tarjetas de características con icono pixel SVG (GAMEPAD, FREE, TROPHY, ROCKET) y colores cyan / yellow / magenta / green.
  3. **// 02 JUEGOS DISPONIBLES AHORA:** rail de 6 mini-tarjetas y botón "VER TODOS LOS JUEGOS →" (a `/biblioteca`).
  4. **Bloque de estadísticas:** "12+ JUEGOS", "MILES DE PARTIDAS", "GLOBAL RANKING".
  5. **// 03 ACTIVIDAD EN VIVO:** tarjeta "ÚLTIMAS PUNTUACIONES" (7 filas) y tarjeta "TOP JUGADORES · HOY" (5 filas con barra) con enlace "VER SALÓN →" (a `/salon-de-la-fama`).
  6. **// 04 PRECIOS:** tarjeta "PLAN ÚNICO · JUGADOR VAULT $0 / SIEMPRE" con lista de 6 ventajas, botón "EMPEZAR GRATIS →" (a `/acceso`), sello "FREE PLAY" y 3 preguntas frecuentes.
  7. **CTA final:** "¿LISTO PARA JUGAR?" y botón "INSERTAR MONEDA →" (a `/biblioteca`).
- Animación de aparición al hacer scroll (`.reveal` + `IntersectionObserver`) y animación `fade-in` de entrada, como en la referencia.
- Navbar y menú móvil según la referencia: enlaces **Inicio**, **Biblioteca**, **Salón de la Fama**, contador "CRÉDITOS · 03" con moneda, botón de sesión y hamburguesa. Sin el enlace "Acerca de".
- Enlaces de la app que hoy apuntan a `/` como "Biblioteca" (botones "Volver al Vault" y similares) pasan a `/biblioteca` cuando su destino sea la Biblioteca.
- Mini-tarjetas del Home con los **6 juegos y miniaturas SVG del proyecto** (`GAMES` y `GameThumb`), enlazadas a `/juegos/[id]`.
- Estilos del Home portados desde la referencia a `app/globals.css` (clases/tokens), manteniendo la fuente **Courier Prime** actual.
- Footer de la referencia ("© 2026 ARCADE VAULT · HECHO CON PIXELES Y NEÓN · v2.6.0") en `app/layout.tsx`.
- Responsive (360, 768, 1280 px), foco visible y `prefers-reduced-motion` (sin animaciones de reveal, parpadeo ni pulso).
- Usar `/frontend-design` para construir la interfaz (regla de `CLAUDE.md`), tomando la referencia como especificación visual.

**Out of scope (para futuras specs):**

- La página "Acerca de" (`about.jsx`), su formulario de contacto y el enlace "Acerca de" en navbar y menú móvil.
- Los juegos de la referencia (Bloque Buster, Caída, Serpentina, Glotón, Rocas, Ranaria, Duelo) y sus portadas CSS `cover-*`.
- Cargar JetBrains Mono: la fuente del texto sigue siendo Courier Prime.
- Datos reales de actividad, puntuaciones, número de juegos o contador de créditos: todo es contenido estático de ejemplo.
- Autenticación real, persistencia (`localStorage`), backend o analítica.
- Cualquier cambio en las pantallas de Salón de la Fama, Acceso, Detalle y Jugador más allá de corregir enlaces a la Biblioteca.
- Tests automatizados (no hay runner).

---

## Modelo de datos

Esta spec no introduce estructuras de datos persistentes. Reutiliza `Game`, `GAMES` y `getBestScore` del SPEC 01 y añade contenido estático tipado, solo de presentación:

```ts
// data/home.ts
export type Accent = "cyan" | "yellow" | "magenta" | "green";

export interface Feature {
  icon: "GAMEPAD" | "FREE" | "TROPHY" | "ROCKET";
  title: string;       // "JUEGOS CLÁSICOS"
  description: string;
  accent: Accent;
}

export interface Stat { value: string; unit: string; caption: string; }      // "12+" / "JUEGOS" / "Y CONTANDO"

export interface RecentScore {
  player: string;      // "NEONFOX"
  gameId: GameId;      // el juego del proyecto equivalente
  score: number;
  ago: string;         // "hace 2 min"
  accent: Accent;
}

export interface TopPlayer { rank: number; player: string; score: number; }

export interface FaqItem { question: string; answer: string; }
```

Convenciones:

- `data/home.ts` exporta `FEATURES`, `STATS`, `RECENT_SCORES`, `TOP_PLAYERS`, `PRICING_PERKS` y `FAQ`, con los textos de la referencia en español.
- `RECENT_SCORES` reasigna los juegos de la referencia a los del proyecto por afinidad: Caída → TETRIS, Glotón → PAC-MAN, Invasores → SPACE INVADERS, Rocas → ASTEROIDS, Bloque Buster → ARKANOID, Serpentina → SNAKE. "Ranaria" no tiene equivalente: esa fila se reasigna a ARKANOID. El nombre mostrado sale de `getGame(gameId).title`.
- Los números se formatean con `toLocaleString("es-ES")` y el `padStart(2, "0")` del rango, como la referencia.
- Los datos son deterministas (sin `Math.random`) para evitar errores de hidratación.

Estructura de archivos (solo lo nuevo o modificado):

```
app/
  page.tsx                   NUEVO contenido: Home
  biblioteca/page.tsx        Biblioteca (contenido actual de app/page.tsx)
  layout.tsx                 + Footer
  globals.css                + estilos del Home y del navbar de la referencia
components/
  home/    HomeHero.tsx, FloatingSilhouettes.tsx, FeatureGrid.tsx, FeatureIcon.tsx,
           GamesPreview.tsx, StatsBand.tsx, LiveActivity.tsx, Pricing.tsx,
           FinalCta.tsx, Reveal.tsx
  layout/  Navbar.tsx, MobileMenu.tsx, nav-items.ts (modificados), Footer.tsx (nuevo)
data/      home.ts
```

---

## Plan de implementación

1. **Leer la guía de Next.js.** Revisar `node_modules/next/dist/docs/` (App Router, Server/Client Components, `Link`, metadata) según `AGENTS.md`. Sin cambios de código.
2. **Extraer la referencia.** Leer el CSS (`references/home-about/about.jsx`) y el código del Home y del navbar (bundle de `nav.jsx`) para listar las clases `.home-*`, `.av-nav`, `.reveal`, `.fade-in`, `.btn.xl`, `.pulse` y keyframes que hay que portar. Sin cambios de código.
3. **Mover la Biblioteca a `/biblioteca`.** Crear `app/biblioteca/page.tsx` con el contenido actual de `app/page.tsx`; dejar `app/page.tsx` con un título provisional. Actualizar en `nav-items.ts` el enlace "Biblioteca" a `/biblioteca` (activo en `/biblioteca` y `/juegos*`) y las rutas "Volver al Vault" / "Biblioteca" de `app/juegos/[id]/page.tsx`, `GameOverModal.tsx`, `AuthCard.tsx` y `not-found.tsx`. Todas las pantallas siguen funcionando.
4. **Estilos de la referencia.** Invocar `/frontend-design`. Portar a `app/globals.css` los estilos del Home (hero, siluetas, secciones, tarjetas, stats, actividad, precios, CTA final), `.reveal` / `.fade-in`, los botones `xl` y `pulse`, y respetar los tokens existentes (Courier Prime, colores neón). Añadir `prefers-reduced-motion`. Sin UI nueva todavía; `npm run build` compila.
5. **Datos del Home.** Crear `data/home.ts` con los tipos y contenido estático descritos arriba. Compila.
6. **Hero.** `FloatingSilhouettes` (8 SVG) y `HomeHero` con eyebrow, título, subtítulo, CTAs e indicador "DESLIZA". Montado en `app/page.tsx`. Se ve el hero.
7. **Reveal.** `Reveal` (cliente) con `IntersectionObserver` que añade la clase `in` al entrar en pantalla (umbral 0,12); sin JS o con `prefers-reduced-motion` el contenido es visible desde el inicio. Se usa a partir del paso 8.
8. **Secciones 01 y 02.** `FeatureIcon`, `FeatureGrid` y `GamesPreview` (mini-tarjetas con `GameThumb`, categoría y título; cada una enlaza a `/juegos/[id]`; botón a `/biblioteca`).
9. **Estadísticas y actividad en vivo.** `StatsBand` y `LiveActivity` (últimas puntuaciones con animación de fila escalonada, top 5 con barras y medallas 1/2/3, enlace a `/salon-de-la-fama`).
10. **Precios y CTA final.** `Pricing` (tarjeta, lista, sello "FREE PLAY", FAQ) y `FinalCta`. El Home queda completo.
11. **Navbar y menú móvil.** Actualizar `Navbar.tsx`, `MobileMenu.tsx` y `nav-items.ts`: enlaces Inicio / Biblioteca / Salón de la Fama, contador "CRÉDITOS · 03" con moneda animada, estilo idéntico a la referencia, sin "Acerca de". Mantener el comportamiento de sesión del SPEC 01 (`getMockUser`).
12. **Footer.** Crear `Footer.tsx` y montarlo en `app/layout.tsx` (oculto en la ruta de juego, como el navbar).
13. **Cierre.** Revisión visual lado a lado contra la referencia en 360, 768 y 1280 px, foco por teclado y `prefers-reduced-motion`; ejecutar `npm run lint` y `npm run build`.

---

## Criterios de aceptación

- [ ] `npm run lint` y `npm run build` terminan sin errores.
- [ ] `/` muestra el Home y `/biblioteca` muestra la Biblioteca del SPEC 01 con sus 6 tarjetas, búsqueda y filtros funcionando.
- [ ] El Home contiene, en orden, hero, "// 01 ¿POR QUÉ ARCADE VAULT?" (4 tarjetas), "// 02 JUEGOS DISPONIBLES AHORA" (6 mini-tarjetas), bloque de estadísticas (3 bloques), "// 03 ACTIVIDAD EN VIVO" (7 + 5 filas), "// 04 PRECIOS" (1 tarjeta + 3 preguntas) y CTA final.
- [ ] "▶ EXPLORAR JUEGOS", "VER TODOS LOS JUEGOS →" e "INSERTAR MONEDA →" navegan a `/biblioteca`; "✦ CREAR CUENTA" y "EMPEZAR GRATIS →" navegan a `/acceso`; "VER SALÓN →" navega a `/salon-de-la-fama`.
- [ ] Cada mini-tarjeta del Home navega a `/juegos/<id>` del juego correspondiente.
- [ ] Textos, colores, tamaños, espaciados y animaciones del Home coinciden con la referencia al comparar ambos lado a lado en 1280 px y en 360 px (solo difieren la fuente de texto, los nombres/miniaturas de los juegos y el enlace "Acerca de" ausente).
- [ ] El navbar muestra Inicio, Biblioteca, Salón de la Fama y "CRÉDITOS · 03", y no existe ningún enlace "Acerca de" en navbar ni en el menú móvil.
- [ ] El enlace activo del navbar es "Inicio" en `/`, "Biblioteca" en `/biblioteca` y `/juegos/*`, y "Salón de la Fama" en `/salon-de-la-fama`.
- [ ] En 360 px de ancho no hay scroll horizontal, aparece el botón hamburguesa y el menú móvil abre y cierra con su botón y el scrim.
- [ ] Las secciones con `.reveal` aparecen al hacer scroll; con `prefers-reduced-motion: reduce` son visibles de inmediato y no corren el parpadeo, el pulso ni el grid animado.
- [ ] Los botones "Volver al Vault" del detalle, del modal de fin de juego, de `not-found` y del acceso como invitado llevan a `/biblioteca` o a `/` según corresponda, y ninguno devuelve un 404.
- [ ] No existe la ruta `/about` ni código de la página About en el repo.
- [ ] El footer aparece en todas las páginas excepto en `/juegos/<id>/jugar`.
- [ ] La consola del navegador no muestra errores ni advertencias de hidratación en `/`.

---

## Decisiones tomadas y descartadas

- **Sí:** Home en `/` y Biblioteca en `/biblioteca`. Es lo que hace la referencia (Inicio y Biblioteca son pantallas distintas) y la raíz del sitio debe ser la landing. **No:** dejar la Biblioteca en `/` y poner el Home en `/inicio`; evitaba tocar enlaces pero la portada no sería la landing.
- **Sí:** navbar de la referencia sin "Acerca de" (Inicio, Biblioteca, Salón, créditos). **No:** solo añadir "Inicio" al navbar actual, porque el diseño no sería idéntico.
- **Sí:** mini-tarjetas con los 6 juegos y `GameThumb` del proyecto. Los nombres y enlaces son reales y no hay ids huérfanos. **No:** reproducir los juegos y portadas CSS de la referencia (`cover-*`).
- **Sí:** mantener Courier Prime como fuente de texto. La app queda coherente y no se añade una segunda fuente de texto. **No:** cargar JetBrains Mono solo para el Home.
- **Sí:** reasignar los nombres de juego de "Actividad en vivo" a los del proyecto (ver Modelo de datos) para que el contenido sea coherente con el catálogo. *Decisión tomada al redactar; revisable al aprobar la spec.*
- **Sí:** incluir el footer de la referencia en `app/layout.tsx`, porque forma parte del diseño global del prototipo. *Decisión tomada al redactar; revisable al aprobar la spec.*
- **Sí:** el Home es un Server Component; solo `Reveal` (y navbar/menú móvil ya existentes) son cliente por usar `IntersectionObserver`/estado.
- **Sí:** estilos portados a `globals.css` con tokens, igual que en el SPEC 01. **No:** CSS Modules ni copiar el archivo CSS completo de la referencia (70 KB incluyen estilos de otras pantallas y de About).
- **Sí:** contenido de ejemplo estático y determinista (actividad, top, estadísticas, créditos). Los datos reales corresponden a la spec de backend.
- **Sí:** `/frontend-design` para la interfaz, por la regla de `CLAUDE.md`.
- **No:** ejecutar el bundle HTML de la referencia ni copiar sus fuentes `woff2`; se lee como código fuente.

---

## Riesgos identificados

| Riesgo | Mitigación |
|--------|-----------|
| Los archivos de la referencia tienen nombres cruzados y el código del Home solo existe dentro del bundle de `nav.jsx` | Tabla de correspondencia en esta spec; el paso 2 extrae y lee el código antes de portar. |
| Mover la Biblioteca a `/biblioteca` rompe enlaces que apuntan a `/` | El paso 3 lista y corrige cada enlace; el criterio de aceptación exige que ninguno devuelva 404. |
| Next.js 16 tiene cambios incompatibles con lo habitual | El paso 1 obliga a leer `node_modules/next/dist/docs/` antes de escribir código. |
| Cambiar la fuente de texto (JetBrains Mono → Courier Prime) altera anchos y saltos de línea respecto a la referencia | Revisar 360 y 1280 px en el paso 13; ajustar `letter-spacing` y tamaños solo si algo se rompe. |
| Contenido oculto hasta el scroll (`.reveal`) invisible sin JS o con `prefers-reduced-motion` | `Reveal` deja el contenido visible por defecto en esos casos (paso 7). |
| Las tarjetas "ACTIVIDAD EN VIVO" simulan datos reales y pueden confundirse con un ranking verdadero | Son contenido de ejemplo, igual que en la referencia; el backend real tiene su propia spec. |
| Estilos del Home chocan con clases existentes del SPEC 01 (`.btn`, `.pulse`, `.reveal`) | Prefijo `home-` para las clases nuevas y revisión de colisiones en `globals.css` en el paso 4. |

---

## Qué **no** está en esta spec

- La página "Acerca de", su formulario de contacto y su enlace de navegación.
- Los juegos, portadas y datos de ejemplo propios de la referencia.
- JetBrains Mono.
- Datos reales (actividad, ranking, estadísticas, créditos), autenticación, persistencia o backend.
- Cambios de diseño en Salón de la Fama, Acceso, Detalle o Jugador.
- Tests automatizados.

Cada uno de estos puntos, si se aborda, va en su propia spec.
