/// <reference path="./env.d.ts" />
import type { Preview } from "@storybook/react-vite";
import CssBaseline from "../src/components/CssBaseline";
import "../src/styles/tokens.scss";

/** Strip `() =>` / `() => (` wrappers so Docs "Show code" shows bare JSX for function stories. */
const stripEmptyArrowWrapper = (src: string) => {
  const trimmed = src.trim();
  if (/^\(\)\s*=>\s*\(/.test(trimmed) && trimmed.endsWith(")")) {
    return trimmed.replace(/^\(\)\s*=>\s*\(\s*/, "").replace(/\s*\)$/, "");
  }
  if (/^\(\)\s*=>\s*</.test(trimmed)) {
    return trimmed.replace(/^\(\)\s*=>\s*/, "");
  }
  return src;
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <CssBaseline />
        <Story />
      </>
    ),
  ],
  parameters: {
    controls: {
      expanded: false,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      source: {
        transform: (src: string) => stripEmptyArrowWrapper(src),
      },
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Docs",
          [
            "Tabs overview",
            "Design system integration",
            "Badge",
            "Tab",
            "Tabs",
            "TabPanel",
          ],
          "Components",
          "Package",
          "*",
        ],
      },
    },
  },
};

export default preview;
