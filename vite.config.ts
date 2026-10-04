import { resolve } from "node:path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    include: [
      "src/**/__tests__/*.test.{js,ts,tsx}",
      "smoke/**/*.test.{js,ts,tsx}",
    ],
    globals: true,
    environment: "jsdom",
    setupFiles: [
      resolve(import.meta.dirname, "src/setupTests.ts"),
    ],
  },
});
