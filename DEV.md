# Contributor / DEV guide

Conventions for working in this repository. Consumer-facing docs live in Storybook (`pnpm storybook`) under **Docs**.

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm install` | Install deps (`pnpm` is the package manager; see `packageManager` in `package.json`). |
| `pnpm dev` | Vite app shell (`src/index.tsx`) — minimal host for local smoke, not the main showcase. |
| `pnpm storybook` | Primary UI / docs surface (curated MDX under `src/docs/`, CSF under each component). |
| `pnpm storybook:dist` | Build the library, then run Storybook so **Package/Dist build** stories exercise `dist/`. |
| `pnpm build` | Library build (`vite.lib.config.ts`) → `dist/` (JS + `style.css` + types). |
| `pnpm test` | Vitest unit/integration tests. |
| `pnpm test:smoke` | Build then run smoke tests against the package output. |
| `pnpm tsc` | Typecheck (`tsc -b`). |
| `pnpm check` / `pnpm check:fix` | Biome lint/format check / write. |
| `pnpm generate` / `pnpm generate:component` | Plop scaffold (see below). |

Node `>=24` (see `engines`).

## Scaffolding a component

```bash
pnpm generate:component
# prompts for PascalCase name, e.g. Button
```

Templates live in `.plop-templates/component/` and are wired by `plopfile.js`. The generator creates:

```text
src/components/Button/
  Button.tsx                 # dumb view — JSX + classNames + wiring only
  useButton.tsx              # behavior / state / effects (MVVM “view-model”)
  types.ts                   # public props + Use* props
  Button.module.scss         # styles (tokens via @/styles/_tokens.scss)
  index.tsx                  # barrel re-exports
  __tests__/Button.test.tsx
  __storybook__/Button.stories.tsx
```

After scaffolding, export the component from `src/lib/index.ts` if it should be part of the public package surface.

## MVVM-ish component shape

This repo keeps **presentation** and **behavior** split on purpose (same idea as a thin view + view-model):

- **`Component.tsx` (dumb view)** — resolve props/context for rendering, call the hook, return markup. Prefer no business branching beyond mapping hook output → DOM.
- **`useComponent.tsx` (hook)** — selection, keyboard, warnings, derived state, event handlers.
- **`types.ts`** — `ComponentProps` (extends shared `BaseComponentProps` where useful) and `UseComponentProps` (often `Omit<Props, "children">`).
- **`*.module.scss`** — visual styles; theme through CSS variables from `_tokens.scss`, not hard-coded brand one-offs in components when a token exists.
- **`cn`** (`src/utils/cn.ts`) — merge class names; also exported from the package root for hosts.

Contexts that cross components live under `src/context/` and are published as subpath exports (`./context/activeTabContext`, `./context/sizeContext`, `./context/tabVariantContext`).

## Storybook layout

| Area | Role |
| --- | --- |
| `src/Introduction.mdx` | Take-home brief + links into solution docs. |
| `src/docs/*.mdx` | Curated **Docs/** pages (overview, host DS integration, per-component API). |
| `src/components/*/__storybook__/` | Interactive CSF stories under **Components/**. |
| `smoke/` | Dist-package stories (run via `pnpm storybook:dist`). |

Sidebar order is controlled in `.storybook/preview.tsx` (`storySort`).

## Package surface

Public entry: `src/lib/index.ts` (built to `dist/`). Subpath exports and peer deps are declared in `package.json` `exports` / `peerDependencies`.

Why the library shape, TabPanel, smoke, and dist stories exist: [SCOPE.md](./SCOPE.md). When documenting host integration, prefer Storybook **Docs/Design system integration** over duplicating long setup in this file.

## Checks before sharing

```bash
pnpm check
pnpm tsc
pnpm test
pnpm build
```

Optional: `pnpm test:smoke` and a quick pass through Storybook Docs pages.
