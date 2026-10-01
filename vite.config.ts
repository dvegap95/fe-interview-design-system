import { resolve } from "node:path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    include: ["src/**/__tests__/*.test.{js,ts,tsx}"],
    globals: true, //https://vitest.dev/guide/migration.html#globals-as-a-default
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
