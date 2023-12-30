import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["better-sqlite3", "sqlite3"],
    },
  },
  resolve: {
    browserField: false,
    mainFields: ["module", "jsnext:main", "jsnext"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
