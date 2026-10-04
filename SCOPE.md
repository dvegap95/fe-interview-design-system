# Scope and delivery

What this repository includes beyond a Storybook-only demo, and how the package is meant to be consumed.

## What’s in scope

| Piece | Why it’s here |
| --- | --- |
| **Badge, Tab, Tabs / ManagedTabs** | Core take-home surface: variants, badge composition via `Tab` `slots.end`, selection, keyboard, Storybook. |
| **TabPanel + `ActiveTabContextProvider`** | Optional companion for the usual accessible tabs↔panels wiring. The tab **list** stays first-class on its own (`Tabs` / `ManagedTabs`) when the host only needs the strip and owns how sections are presented. |
| **CSS tokens, `CssBaseline`, `className` / `data-*` hooks** | Design-system embeddability: theme without forking SCSS; structural escape hatches for a host DS. |
| **Library build (`pnpm build` → `dist/`)** | Delivered as a **component library**, not an SPA. Consumers install the package (or a packed artifact), import components + `style.css`, and get types / JSDoc for editor autocomplete. |
| **Smoke tests + Package/Dist Storybook stories** | Confidence that the **built** artifact works — same motivation as packing and consuming the library outside this repo. |

Storybook MDX / CSF is the primary showcase (brief allows Storybook; `Introduction.mdx` came from the starter). See Storybook **Docs** for API and integration detail; this file is only the “why these pieces exist” map.

## Delivery

Typical path for reviewers or a host app:

1. **Develop / review UI** — `pnpm storybook` (source stories + curated Docs).
2. **Build the package** — `pnpm build` writes `dist/` (JS, `style.css`, `.d.ts`).
3. **Verify the artifact** — `pnpm test:smoke` and/or `pnpm storybook:dist` (stories that import from `dist/`).
4. **Consume like a real dependency** — e.g. `pnpm pack` and install the `.tar.gz` in a separate app to check render, TypeScript autocomplete, and JSDoc on public APIs.

Public entry and subpath exports are declared in `package.json` (`exports`, peer deps on React 19). Contributor scripts and conventions: [DEV.md](./DEV.md).
