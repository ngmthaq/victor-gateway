import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/vue", import.meta.url)),
      "vue-i18n": "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/vue/assets/scss/_theme.scss';
          @import './src/vue/assets/scss/_variables.scss';
          @import './src/vue/assets/scss/_mixins.scss';
        `,
      },
    },
  },
});
