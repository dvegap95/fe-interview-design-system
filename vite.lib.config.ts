import { resolve } from "node:path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const root = import.meta.dirname;

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: resolve(root, "tsconfig.lib.json"),
      include: [
        "src/lib",
        "src/components",
        "src/context",
        "src/utils",
        "src/types/baseComponentTypes.ts",
        "src/types/styles.d.ts",
      ],
      exclude: [
        "src/**/__tests__",
        "src/**/__storybook__",
        "src/**/*.test.*",
        "src/**/*.stories.*",
      ],
      staticImport: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(root, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    copyPublicDir: false,
    cssCodeSplit: false,
    lib: {
      // TODO: generalize in case of augmentation (e.g. glob src/lib/context/*.ts + package exports "./context/*")
      entry: {
        index: resolve(root, "src/lib/index.ts"),
        "context/sizeContext": resolve(root, "src/lib/context/sizeContext.ts"),
        "context/activeTabContext": resolve(root, "src/lib/context/activeTabContext.ts"),
        "context/tabVariantContext": resolve(root, "src/lib/context/tabVariantContext.ts"),
      },
      formats: [
        "es",
      ],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: "style",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
      ],
    },
  },
});
