import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import * as PATH_CONST from "@/configs/constants/path.const";
import NotFoundView from "@/renderer/views/NotFound/NotFoundView.vue";
import { productName } from "~/package.json";
import { LOCAL_STORAGE_KEYS } from "@/configs/constants/app.const";
import { Setting } from "@/configs/types/database";

/**
 * Not found (404) path
 */
const PATH_NOT_FOUND: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  component: NotFoundView,
};

/**
 * Vue router configurations
 */
const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [...Object.values(PATH_CONST), PATH_NOT_FOUND],
});

/**
 * Router Hook: Before change route
 */
router.beforeEach(async (to, from, next) => {
  document.title = productName.trim();

  const setting = await window.electron.db.query<Setting>("SettingRepo", "getSetting");
  if (!setting && to.path !== PATH_CONST.PATH_ACTIVE.path) {
    return next(PATH_CONST.PATH_ACTIVE.path);
  }

  const username = window.sessionStorage.getItem(LOCAL_STORAGE_KEYS.username);
  const password = window.sessionStorage.getItem(LOCAL_STORAGE_KEYS.password);
  const isAuthenticated = setting && setting.username === username && setting.password === password;
  if (!isAuthenticated && to.path !== PATH_CONST.PATH_LOGIN.path) {
    window.sessionStorage.clear();
    return next(PATH_CONST.PATH_LOGIN.path);
  }

  return next();
});

export { router };
