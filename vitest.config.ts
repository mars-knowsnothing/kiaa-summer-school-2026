import path from "node:path";
import {fileURLToPath} from "node:url";
import {defineConfig} from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(root, "src")
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}", "src/**/*.{test,spec}.{ts,tsx}"],
    passWithNoTests: true
  }
});
