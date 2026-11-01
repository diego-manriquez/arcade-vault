## Arcade Vault

Es una plataforma para jugar online y competir por la mayor cantidad de puntos.

## Usa Spec Driven Design

Basado en /spec y /spec-impl

Siguiendo las buenas practicas recomendadas aquí:
https://github.com/Klerith/fernando-skills

## Skills usadas

```bash
npx skills@latest add Klerith/fernando-skills
```

## Variables de entorno (formulario de contacto)

El formulario de `/acerca-de` envía correos con [Resend](https://resend.com).

```bash
cp .env.example .env.local   # y completa los valores
```

| Variable | Descripción |
|----------|-------------|
| `RESEND_API_KEY` | API key de Resend (solo servidor). |
| `CONTACT_TO_EMAIL` | Destinatario de los mensajes. Con `onboarding@resend.dev`, debe ser el correo dueño de la cuenta de Resend. |
| `CONTACT_FROM_EMAIL` | Remitente, p. ej. `Arcade Vault <onboarding@resend.dev>`. Para un dominio propio, verifícalo antes en Resend. |

## Commands

```bash
npm run dev     # next dev
npm run build   # next build
npm run start   # next start (after build)
npm run lint    # eslint (flat config in eslint.config.mjs)
```