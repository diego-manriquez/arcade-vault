# SPEC 03 — Página "Acerca de" y formulario de contacto con Resend

> **Status:** Approved
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-10-31
> **Objective:** Añadir la página "Acerca de" en `/acerca-de` con el diseño de `references/home-about` y hacer que su formulario de contacto envíe un correo real al equipo mediante Resend desde una Server Action.

---

## Por qué existe esta spec

El SPEC 02 dejó fuera la página "Acerca de" y su enlace de navegación. Esta spec los incorpora y, a diferencia de la referencia (donde el envío solo cambiaba un estado local y mostraba el terminal de éxito), añade el primer **código de servidor** del proyecto: una Server Action que valida el mensaje y lo envía por correo con [Resend](https://resend.com).

Esta spec **revierte parcialmente** dos exclusiones del SPEC 02: el enlace "Acerca de" en navbar y menú móvil, y el criterio "No existe la ruta `/about`" (la ruta nueva es `/acerca-de`).

### Cómo leer la referencia

Los archivos de `references/home-about` tienen nombres cruzados (ver tabla del SPEC 02). Para esta spec importan:

| Archivo en la carpeta | Contenido real | Uso en esta spec |
|-----------------------|----------------|------------------|
| `download (1)` | Código de la página About (`About` + `HighlightIcon`) | **Fuente del código**: estructura, textos, iconos y comportamiento del formulario. |
| `about.jsx` | CSS completo del prototipo, sección `/* ===== ABOUT PAGE ===== */` (líneas ~1071-1146) | **Fuente de estilos** (`.about-*`, `.highlight*`, `.about-divider`, `.contact-*`, `.terminal-success`, `.shake`, `.btn.press`). |
| `home.jsx` | Código del navbar con el enlace "Acerca de" | Referencia del enlace a restaurar. |

El CSS del gamepad que aparece después de la sección About en `about.jsx` **no** se porta.

---

## Scope

**In:**

- Ruta `/acerca-de` (`app/acerca-de/page.tsx`) con, en este orden:
  1. **Hero:** kicker "▸ ACERCA DE", título "ACERCA DE ARCADE VAULT", párrafo de misión y 3 destacados con icono pixel SVG (HEART magenta, BROWSER cyan, PLANT green).
  2. **Divisor** de píxeles parpadeantes (24 píxeles, decorativo, `aria-hidden`).
  3. **Contacto:** kicker "▸ CONTACTO", título "CONTÁCTANOS", texto, 3 indicadores ("RESPUESTA EN 24-48H", "SUGERENCIAS BIENVENIDAS", "SIN SPAM, JAMÁS") y el formulario.
- Formulario con campos NOMBRE, CORREO ELECTRÓNICO y MENSAJE, botón "▶ ENVIAR MENSAJE", animación `shake` ante error de validación y terminal de éxito "VAULT-OS // TERMINAL" con "ENVIAR OTRO MENSAJE", como en la referencia.
- **Envío real por Resend** desde una Server Action (`'use server'`) invocada con `useActionState`:
  - Valida en servidor: los tres campos obligatorios, formato de correo, longitudes máximas.
  - Envía un único correo al equipo con `Reply-To` = correo del visitante.
  - El terminal de éxito solo aparece cuando Resend confirma el envío.
- Protección anti-spam: campo honeypot oculto + validación en servidor.
- Estado de error de envío visible (`role="alert"`) que conserva lo escrito para reintentar.
- Variables de entorno `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`, documentadas en un `.env.example` versionado.
- Enlace **"Acerca de"** en `Navbar` y `MobileMenu` (vía `nav-items.ts`), activo en `/acerca-de`.
- Estilos de la sección About portados a `app/globals.css` (con `prefers-reduced-motion` para el parpadeo de píxeles y el caret).
- Reutilizar `Reveal` (SPEC 02) para la aparición al hacer scroll.
- Responsive (360, 768, 1280 px), foco visible, etiquetas `<label htmlFor>` asociadas a cada campo.
- Usar `/frontend-design` para construir la interfaz (regla de `CLAUDE.md`), tomando la referencia como especificación visual.

**Out of scope (para futuras specs):**

- Dominio propio verificado en Resend: se usa `onboarding@resend.dev` como remitente; cambiar a un dominio propio es solo editar `CONTACT_FROM_EMAIL`.
- Correo de confirmación al visitante (con `onboarding@resend.dev` Resend solo permite enviar a la cuenta propietaria).
- Persistir los mensajes (base de datos, bandeja en la app) o panel de administración.
- Rate limit por IP, CAPTCHA o cualquier servicio anti-spam externo.
- Plantilla HTML del correo (React Email): el correo es texto plano.
- Adjuntos en el formulario.
- Enlaces a "Acerca de" desde el footer o el Home.
- Internacionalización.
- Tests automatizados (no hay runner).

---

## Modelo de datos

No se persiste nada. Se añaden tipos del formulario y de la respuesta de la acción:

```ts
// lib/contact.ts
export const CONTACT_LIMITS = { name: 60, email: 254, message: 2000 } as const;

export interface ContactInput {
  name: string;      // trim, 1..60
  email: string;     // trim, formato válido, ≤254
  message: string;   // trim, 1..2000
}

export type ContactField = keyof ContactInput;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }                        // nombre para "GRACIAS, {NOMBRE}"
  | { status: "error"; message: string;                        // texto para role="alert"
      fieldErrors?: Partial<Record<ContactField, string>>;
      values: ContactInput };                                  // se reponen en el formulario
```

Convenciones:

- `lib/contact.ts` exporta `CONTACT_LIMITS`, los tipos y `validateContact(raw): { ok: true; data } | { ok: false; fieldErrors }`, función pura usada por cliente (feedback inmediato) y servidor (autoridad).
- El nombre y el asunto se limpian de saltos de línea (`\r`, `\n`) antes de usarse en el asunto del correo, para evitar inyección de cabeceras.
- El honeypot es un campo `website` oculto (`tabIndex={-1}`, `autoComplete="off"`, fuera de pantalla). Si llega con valor, la acción responde `success` **sin enviar** nada, para no dar pistas al bot.
- Asunto del correo: `[Arcade Vault] Mensaje de {nombre}`. Cuerpo en texto plano con nombre, correo y mensaje.
- Variables de entorno (solo servidor, nunca `NEXT_PUBLIC_`):

```
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=diegodev.manriquez@gmail.com
CONTACT_FROM_EMAIL=Arcade Vault <onboarding@resend.dev>
```

Estructura de archivos (solo lo nuevo o modificado):

```
app/
  acerca-de/
    page.tsx               NUEVO: página (Server Component, metadata)
    actions.ts             NUEVO: Server Action sendContactMessage
  globals.css              + estilos ABOUT PAGE
components/
  about/   AboutHero.tsx, HighlightIcon.tsx, PixelDivider.tsx,
           ContactSection.tsx, ContactForm.tsx (cliente), TerminalSuccess.tsx
  layout/  nav-items.ts (+ "Acerca de")
lib/       contact.ts
.env.example               NUEVO (versionado)
.gitignore                 + excepción !.env.example
package.json               + dependencia resend
```

---

## Plan de implementación

1. **Leer la guía de Next.js.** Revisar `node_modules/next/dist/docs/` (Server Actions / `'use server'`, formularios con `useActionState`, variables de entorno, metadata) según `AGENTS.md`. Sin cambios de código.
2. **Dependencia y entorno.** Instalar `resend`, crear `.env.example` con las 3 variables, añadir `!.env.example` a `.gitignore` (hoy `.env*` lo ignoraría) y documentar en `README.md` cómo crear `.env.local`. `npm run build` compila.
3. **Lógica de contacto.** Crear `lib/contact.ts` (`CONTACT_LIMITS`, tipos, `validateContact`). Sin UI; compila.
4. **Server Action.** Crear `app/acerca-de/actions.ts` con `sendContactMessage(prev, formData): Promise<ContactState>`: honeypot, `validateContact`, comprobación de variables de entorno, envío con Resend (`from`, `to`, `replyTo`, `subject`, `text`) y mapeo de errores a `ContactState`. Los detalles del error de Resend se registran con `console.error` en servidor y **no** se devuelven al cliente. Compila.
5. **Estilos.** Invocar `/frontend-design`. Portar a `globals.css` la sección ABOUT PAGE de la referencia (`.about-*`, `.highlight*`, `.about-divider`, `.div-*`, `pxblink`, `.contact-*`, `.shake`, `.terminal-success`, `.term-*`, `.btn.press`), más `.contact-form .field-error` y el estilo del honeypot oculto; añadir `prefers-reduced-motion`. Sin UI nueva; compila.
6. **Hero y divisor.** `HighlightIcon` (HEART, BROWSER, PLANT), `AboutHero` y `PixelDivider`, montados en `app/acerca-de/page.tsx` con `Reveal` y metadata de la página. Se ve la parte "Acerca de" en `/acerca-de`.
7. **Sección de contacto estática.** `ContactSection` con kicker, título, texto, 3 indicadores y el formulario (`ContactForm`) aún sin acción: campos con `<label htmlFor>`, botón y atributos `maxLength`. Se ve el formulario completo.
8. **Formulario conectado.** `ContactForm` (cliente) con `useActionState(sendContactMessage, { status: "idle" })`: validación inmediata con `validateContact` antes de enviar (vacío o correo inválido → `shake` + mensajes por campo, sin llamar al servidor), estado "ENVIANDO…" con botón deshabilitado (`useFormStatus` / `pending`), reposición de valores tras un error y `role="alert"` para el error general. Con `RESEND_API_KEY` válida llega el correo.
9. **Terminal de éxito.** `TerminalSuccess` con el texto exacto de la referencia (`> MENSAJE RECIBIDO. TE RESPONDEREMOS PRONTO. GRACIAS, {NOMBRE EN MAYÚSCULAS}.`), foco movido al terminal al aparecer (`aria-live="polite"`) y botón "ENVIAR OTRO MENSAJE" que limpia el formulario.
10. **Navegación.** Añadir "Acerca de" a `nav-items.ts` (`/acerca-de`, activo con `startsWith("/acerca-de")`); `Navbar` y `MobileMenu` ya iteran `NAV_ITEMS`. Cierre: revisión visual lado a lado con la referencia en 360, 768 y 1280 px, foco por teclado y `prefers-reduced-motion`; envío real de prueba; `npm run lint` y `npm run build`.

---

## Criterios de aceptación

- [ ] `npm run lint` y `npm run build` terminan sin errores.
- [ ] `/acerca-de` carga sin errores ni advertencias de hidratación en la consola del navegador.
- [ ] La página muestra, en orden: hero "ACERCA DE ARCADE VAULT" con 3 destacados, divisor de píxeles y sección "CONTÁCTANOS" con 3 indicadores y el formulario.
- [ ] Textos, colores, tamaños, espaciados y animaciones coinciden con la referencia al compararlos lado a lado en 1280 px y 360 px (solo difiere la fuente de texto, Courier Prime).
- [ ] El navbar y el menú móvil muestran "Acerca de" y el enlace queda activo en `/acerca-de`; ningún otro enlace pierde su estado activo.
- [ ] Enviar el formulario vacío, o con un correo sin formato válido, dispara la animación `shake`, muestra el mensaje bajo cada campo inválido y **no** llama al servidor (sin petición de red).
- [ ] Con `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` válidos, enviar nombre, correo y mensaje correctos hace llegar **un** correo a `CONTACT_TO_EMAIL` con asunto `[Arcade Vault] Mensaje de {nombre}`, el contenido completo en el cuerpo y `Reply-To` igual al correo del visitante.
- [ ] Tras el envío correcto aparece el terminal "VAULT-OS // TERMINAL" con "GRACIAS, {NOMBRE}." en mayúsculas, y "ENVIAR OTRO MENSAJE" devuelve el formulario vacío.
- [ ] Mientras la acción está pendiente, el botón muestra "ENVIANDO…" y está deshabilitado (no se puede enviar dos veces).
- [ ] Con `RESEND_API_KEY` ausente o inválida, el formulario muestra un mensaje de error con `role="alert"`, conserva nombre, correo y mensaje, **no** muestra el terminal de éxito, y el mensaje de error no contiene la clave ni el texto crudo de Resend.
- [ ] Enviar con el campo honeypot `website` relleno (manipulando el DOM) devuelve éxito en pantalla pero **no** genera ningún correo ni llamada a Resend.
- [ ] La Server Action rechaza (devuelve `error`) un mensaje de más de 2000 caracteres, un nombre de más de 60 y un nombre con saltos de línea no llega tal cual al asunto del correo.
- [ ] `RESEND_API_KEY` no aparece en el bundle del cliente (búsqueda en `.next/static` sin resultados) ni en ningún archivo versionado.
- [ ] `.env.example` está versionado y `.env.local` sigue ignorado por git.
- [ ] En 360 px de ancho no hay scroll horizontal y todos los campos son operables con teclado, con foco visible.
- [ ] Con `prefers-reduced-motion: reduce` no corren el parpadeo de píxeles del divisor, el caret del terminal ni la animación `shake`.

---

## Decisiones tomadas y descartadas

- **Sí:** ruta `/acerca-de`. Mantiene las rutas en español como `/biblioteca`, `/salon-de-la-fama` y `/acceso`. **No:** `/about`, que rompe la convención del proyecto.
- **Sí:** Server Action con `useActionState`. No expone un endpoint público documentado, evita `fetch` manual y encaja con App Router y React 19. **No:** Route Handler `POST /api/contacto`; solo tendría sentido si otro cliente (app móvil, sistema externo) tuviera que consumirlo.
- **Sí:** remitente `onboarding@resend.dev` y destinatario en variable de entorno. Funciona sin dominio verificado. **No:** exigir dominio propio ahora; pasar a uno es cambiar `CONTACT_FROM_EMAIL`.
- **Sí:** un solo correo al equipo con `Reply-To` del visitante, para responder directamente desde la bandeja. **No:** correo de confirmación al visitante: con `onboarding@resend.dev` Resend solo entrega a la cuenta propietaria y fallaría.
- **Sí:** honeypot + validación en servidor. No añade dependencias ni infraestructura. **No:** rate limit en memoria (no es fiable en serverless, cada instancia tiene su propia memoria) ni CAPTCHA; si el spam aparece, va en otra spec.
- **Sí:** el honeypot responde éxito sin enviar. El bot no aprende a esquivarlo.
- **Sí:** validar en cliente **y** servidor con la misma función `validateContact`. El cliente da feedback inmediato (y el `shake` de la referencia); el servidor es la autoridad.
- **Sí:** el terminal de éxito solo tras confirmación de Resend. La referencia lo mostraba siempre porque no enviaba nada; mentirle al visitante con un "MENSAJE RECIBIDO" falso sería peor que un error.
- **Sí:** el error de Resend se registra en servidor y el cliente recibe un mensaje genérico. Evita filtrar detalles de configuración.
- **Sí:** correo en texto plano. **No:** React Email / plantilla HTML; es un mensaje interno al equipo y evita escapar HTML del visitante.
- **Sí:** `<label htmlFor>` en los campos, aunque la referencia usa `<label>` sin asociar. Mejora de accesibilidad sin cambio visual.
- **Sí:** excepción `!.env.example` en `.gitignore`. Hoy `.env*` ignoraría también el ejemplo, y sin él nadie sabe qué variables definir.
- **Sí:** Server Component para la página; solo `ContactForm` y `Reveal` son cliente.
- **Sí:** `/frontend-design` para la interfaz, por la regla de `CLAUDE.md`.
- **No:** portar el CSS del gamepad que sigue a la sección About en `about.jsx`; pertenece a otra pantalla.

---

## Riesgos identificados

| Riesgo | Mitigación |
|--------|-----------|
| Con `onboarding@resend.dev`, Resend solo entrega al correo dueño de la cuenta; si `CONTACT_TO_EMAIL` es otro, el envío falla | Documentarlo en `.env.example` y `README.md`; el criterio de aceptación usa el correo de la cuenta de Resend. |
| `RESEND_API_KEY` ausente en el entorno (local o despliegue) | La acción comprueba las 3 variables antes de enviar y devuelve error genérico sin romper la página; el log de servidor indica cuál falta. |
| Filtrar la clave al bundle del cliente | Solo se lee en `actions.ts` (`'use server'`), sin prefijo `NEXT_PUBLIC_`; criterio de aceptación verifica `.next/static`. |
| Inyección de cabeceras vía nombre en el asunto | Se eliminan `\r` y `\n` del nombre antes de componer el asunto; el correo es texto plano. |
| Spam o abuso del formulario agota la cuota gratuita de Resend | Honeypot y límites de longitud ahora; rate limit/CAPTCHA queda para una spec posterior si aparece el problema. |
| Doble envío por doble clic | Botón deshabilitado mientras la acción está pendiente. |
| Next.js 16 tiene cambios incompatibles respecto a lo habitual (Server Actions, `useActionState`) | El paso 1 obliga a leer `node_modules/next/dist/docs/` antes de escribir código. |
| La versión de `resend` instalada cambia su API (`emails.send`, forma del resultado/`error`) | Fijar versión en `package.json` y consultar su documentación en el paso 4 antes de escribir la llamada. |
| Cambiar la fuente (JetBrains Mono → Courier Prime) altera anchos del terminal y los indicadores | Revisar 360 y 1280 px en el paso 10; ajustar `letter-spacing` y tamaños solo si algo se rompe. |

---

## Qué **no** está en esta spec

- Dominio propio verificado en Resend ni correo de confirmación al visitante.
- Persistencia de mensajes, bandeja o panel de administración.
- Rate limit, CAPTCHA o anti-spam externo.
- Plantilla HTML del correo (React Email).
- Adjuntos, enlaces a "Acerca de" desde el footer o el Home e internacionalización.
- Tests automatizados.

Cada uno de estos puntos, si se aborda, va en su propia spec.
