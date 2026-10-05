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

If scoped tighter for the brief alone, the minimum would be **Badge / Tab / Tabs + Storybook**. `TabPanel`, the library pack surface, smoke tests, and dist stories are delivery confidence for a real component package. Keep them when evaluating as a design-system artifact.

## Disclaimer: disabled state

The current API supports `disabled` as the native button disabled state, and disabled tabs remain compatible with keyboard navigation. Because the brief does not include a disabled visual design, the `disabled` prop is treated as **out of scope** for this delivery. Future work could design the disabled state and implement the corresponding styles.

## Disclaimer: typography

Colors, spacing, and layout were checked against Figma (pixel-perfect pass). Typography can differ slightly between Figma and browsers; remaining type metrics were left as-is within that variance rather than chasing sub-pixel parity.

## Delivery

Typical path for reviewers or a host app:

1. **Develop / review UI** — `pnpm storybook` (source stories + curated Docs).
2. **Build the package** — `pnpm build` writes `dist/` (JS, `style.css`, `.d.ts`).
3. **Verify the artifact** — `pnpm test:smoke` and/or `pnpm storybook:dist` (stories that import from `dist/`).
4. **Consume like a real dependency** — e.g. `pnpm pack` and install the `.tar.gz` in a separate app to check render, TypeScript autocomplete, and JSDoc on public APIs.

Public entry and subpath exports are declared in `package.json` (`exports`, peer deps on React 19). Contributor scripts and conventions: [DEV.md](./DEV.md).
