import { configDefaults, defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    watch: {
      ignored: [
        "**/.pnpm-store/**",
        "**/playwright-report/**",
        "**/test-results/**",
      ],
    },
  },
  test: {
    exclude: [
      ...configDefaults.exclude,
      ".features-gen/**",
      ".pnpm-store/**",
      "playwright-report/**",
      "test-results/**",
    ],
    watchExclude: [".pnpm-store/**", "playwright-report/**", "test-results/**"],
  },
});
