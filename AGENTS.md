# AGENTS.md

React 18 + TypeScript + Vite portfolio SPA. shadcn/ui components, Tailwind v3, Framer Motion, React Router v6.

## Commands

- Install: `npm install` (npm is the only package manager / lockfile; don't add a bun lockfile)
- Dev: `npm run dev` — serves on **port 8080**, not Vite's default 5173
- Build: `npm run build` — runs `vite build` **then** `node scripts/generate-seo-files.js` (writes `dist/sitemap.xml` + `dist/robots.txt`). The script reads `VITE_SITE_URL`; default is the placeholder `https://portfolio.example.com`
- Test: `npm run test` (vitest watch), `npm run test:run` (CI mode). Single file: `npx vitest run src/lib/__tests__/foo.test.ts`
- Lint/format/typecheck: `npm run lint`, `npm run format`, `npm run type-check`
- The husky pre-commit hook (`.husky/pre-commit`) runs lint-staged (eslint+prettier) then `npm run type-check` — this lint+typecheck order is the verification gate
- Lighthouse CI: `npm run lighthouse` (strict budgets; expects preview server on 4173)

## Routing & code splitting — update these together when changing routes

All pages are lazy-loaded in `src/App.tsx`; add new routes ABOVE the catch-all `*` route. A single route change typically touches several files:

- `src/App.tsx` — route registration
- `src/lib/route-preloader.ts` — `routeLoaders` map (hover/idle preloading)
- `src/hooks/use-seo.ts` — `pageSEOConfig` (per-page meta tags)
- `src/lib/sitemap-generator.ts` (TS source) **and** `scripts/generate-seo-files.js` (build script) — sitemap route lists, kept in sync

## TypeScript & lint strictness

- tsconfig is very strict: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`. Indexed access yields `T | undefined`; optional props must be passed exactly or not at all.
- ESLint enforces jsx-a11y rules as **errors** (`alt-text`, `anchor-has-content`, `click-events-have-key-events`, …) and `@typescript-eslint/no-unused-vars` as error.
- Prettier: single quotes, `jsxSingleQuote`, semicolons, print width 80.

## Paths & env

- `@/*` aliases `src/*` (configured in tsconfig, vite, and vitest configs)
- Copy `.env.example` → `.env` for the EmailJS contact form (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`), read via `import.meta.env.VITE_*` in `src/pages/Contact.tsx`
- `VITE_SITE_URL` overrides the sitemap/robots hostname at build time

## Testing quirks

- `src/test/setup.ts` mocks IntersectionObserver, ResizeObserver, and matchMedia — add new global mocks there
- Tests are colocated in `__tests__/` directories and use `@/` imports
