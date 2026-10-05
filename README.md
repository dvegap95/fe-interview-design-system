# Frontend Interview - Design System

Hey 👋

Accessible Tabs design-system package (Badge, Tab, Tabs, TabPanel) built for the Prima take-home. Primary showcase and docs: **[Storybook](https://dvegap95.github.io/fe-interview-design-system/)**.

## Install and run

```bash
# Install dependencies (pnpm is the package manager for this repo)
pnpm install

# Storybook (docs + interactive stories)
pnpm storybook

# Optional: Vite app shell
pnpm dev
```

## Review path (~5 minutes)

Use the [hosted Storybook](https://dvegap95.github.io/fe-interview-design-system/) or run it locally (`pnpm storybook`):

1. **Docs → Tabs overview** — composition model, a11y, tokens, overflow
2. **Docs → Tabs** — playground (variants / sizes / `activation`)
3. **Docs → TabPanel** — Composition story (full tab ↔ panel wiring)
4. **Docs → Tabs → Overflow** — host-owned scrollport + opt-in auto-scroll
5. **Docs → Design system integration** — embedding in a host DS

What’s in the package and why: [SCOPE.md](./SCOPE.md). Contributor conventions: [DEV.md](./DEV.md).

## Decisions

- **Badge via `Tab` `slots.end`** — Badge variants live on `Badge`; Tab only composes trailing content so the list API stays Badge-agnostic.
- **Overflow is host-owned** — `Tabs` does not set `overflow-x` (it clips `:focus-visible` rings). Hosts style the scrollport; `autoScrollBehavior` is opt-in scroll-into-view.
- **Keyboard `activation`** — default `"manual"` (arrows move focus; Enter/Space select). `"automatic"` keeps focus on the active tab (selection follows focus).
- **Size / variant context** — `size` and tab `variant` resolve as `prop ?? nearest provider ?? default`. Parents push values with `SizeProvider` / `TabVariantProvider` (e.g. from `Tabs`); children can still override per instance. Same providers are public for host trees outside `Tabs`.
- **`size` (`sm` / `md`) over “mobile on/off”** — Figma’s handoff uses a mobile breakpoint flag; the API uses size tokens instead. That matches **container / density** control (host chooses `sm` in a narrow panel on desktop, or `md` on a large phone) better than baking in a device-centric philosophy.
- **Tests focus on behavior** — coverage targets selection, keyboard/activation, context resolution, and composition contracts rather than snapshotting markup or styles.

## Scope and delivery

This repo is a **component library** (build → `dist/`), not an SPA demo. Details: [SCOPE.md](./SCOPE.md).

```bash
pnpm build          # library output
pnpm test:smoke     # tests against dist/
pnpm storybook:dist # Storybook stories that import the built package
pnpm pack           # optional .tar.gz for install in a host app
```

## Figma file

The figma file of the home test is available [here](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component?node-id=0-1&t=4pG7NN6HKxgxroDz-1).
