import { existsSync } from "node:fs";
import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const root = import.meta.dirname;
const distReady =
  existsSync(resolve(root, "../dist/index.js")) &&
  existsSync(resolve(root, "../dist/style.css")) &&
  existsSync(resolve(root, "../dist/context/activeTabContext.js"));

const config: StorybookConfig = {
  stories: [
    // Interview brief stays at src root as originally placed.
    "../src/Introduction.mdx",
    "../src/docs/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ...(distReady
      ? [
          "../smoke/DistPackage.stories.tsx",
        ]
      : []),
  ],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [
              remarkGfm,
            ],
          },
        },
      },
    },
    "@storybook/addon-a11y",
    "storybook-addon-pseudo-states",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    // Curated MDX only — do not auto-generate docs pages from CSF.
    autodocs: false,
  },
  async viteFinal(config) {
    const base = process.env.STORYBOOK_BASE_PATH;
    if (base) {
      config.base = base;
    }
    return config;
  },
};

export default config;
