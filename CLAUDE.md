# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Arcade Vault: a platform to play games online and compete for the highest score. Currently a fresh Create Next App scaffold (single commit, only `app/layout.tsx`, `app/page.tsx`, `app/globals.css`). The README says the project follows Spec Driven Design (`/spec` and `/spec-impl`), using skills from https://github.com/Klerith/fernando-skills (installed with `npx skills@latest add Klerith/fernando-skills`).

## Commands

```bash
npm run dev     # next dev
npm run build   # next build
npm run start   # next start (after build)
npm run lint    # eslint (flat config in eslint.config.mjs)
```

No test runner is configured.

## Stack notes

- Next.js 16.4.3, React 19.3.0, TypeScript, Tailwind CSS v4 (via `@tailwindcss/turbopack`), App Router in `app/` (no `src/` dir).
- `AGENTS.md` warns this Next.js version has breaking changes versus common training data: read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code, and heed deprecation notices.
