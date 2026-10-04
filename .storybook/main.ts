import { existsSync } from "node:fs";
import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const root = import.meta.dirname;
const distReady =
  existsSync(resolve(root, "../dist/index.js")) &&
  existsSync(resolve(root, "../dist/style.css")) &&
  existsSync(resolve(root, "../dist/context/activeTabContext.js"));

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ...(distReady
      ? [
          "../smoke/DistPackage.stories.tsx",
        ]
      : []),
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "storybook-addon-pseudo-states",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
