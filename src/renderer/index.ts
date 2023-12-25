/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 */

import type { SystemThemeModeType } from "@/configs/types/components";
import { createApp } from "vue";
import { COOKIES_STORAGE_KEYS } from "@/configs/constants/app.const";
import { i18n } from "./plugins/i18n.plugin";
import { router } from "./plugins/router.plugin";
import { store } from "./plugins/pinia.plugin";
import { getCookieStorage } from "./plugins/storage.plugin";
import App from "./App.vue";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "./scss/main.scss";

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(store);
app.mount("#app");

const theme = getCookieStorage<SystemThemeModeType>(COOKIES_STORAGE_KEYS.theme) || "dark";
document.getElementById("body").setAttribute("data-bs-theme", theme);

if (window.electron.env.mode() === "development") {
  console.log(
    [
      `This app is running with`,
      `Chrome (v${window.electron.versions.chrome()}),`,
      `Node.js (v${window.electron.versions.node()}) and`,
      `Electron (v${window.electron.versions.electron()})`,
    ].join(" "),
  );
}
