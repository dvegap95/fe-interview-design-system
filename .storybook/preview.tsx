/// <reference path="./env.d.ts" />
import type { Preview } from "@storybook/react-vite";
import CssBaseline from "../src/components/CssBaseline";
import "../src/styles/tokens.scss";

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
