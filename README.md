# Frontend Interview - Design System

Hey 👋

Accessible Tabs design-system package (Badge, Tab, Tabs, TabPanel) built for the Prima take-home. Primary showcase and docs: **Storybook**.

## Install and run

```bash
# Install dependencies (pnpm is the package manager for this repo)
pnpm install

# Storybook (docs + interactive stories)
pnpm storybook

# Optional: Vite app shell
pnpm dev
```

## Scope and delivery

This repo is a **component library** (build → `dist/`), not an SPA demo. What’s included and why (TabPanel as optional panels companion, pack/smoke/dist verification): [SCOPE.md](./SCOPE.md).

```bash
pnpm build          # library output
pnpm test:smoke     # tests against dist/
pnpm storybook:dist # Storybook stories that import the built package
pnpm pack           # optional .tar.gz for install in a host app
```

Contributor conventions (scripts, Plop templates, dumb-view + hook layout): [DEV.md](./DEV.md).

## Figma file

The figma file of the home test is available [here](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component?node-id=0-1&t=4pG7NN6HKxgxroDz-1).
