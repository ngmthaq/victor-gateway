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
  history: createWebHashHistory(),
  routes: [...Object.values(PATH_CONST), PATH_NOT_FOUND],
});

/**
 * Router Hook: Before change route
 */
router.beforeEach(async (to, from, next) => {
  // Update title
  document.title = productName.trim();

  // Check setting configs
  const setting = await window.electron.db.query<Setting>("SettingRepo", "getSetting");
  if (!setting) window.sessionStorage.clear();

  // Get auth data
  let username = window.sessionStorage.getItem(LOCAL_STORAGE_KEYS.username);
  let password = window.sessionStorage.getItem(LOCAL_STORAGE_KEYS.password);
  if (username === null || password === null) {
    window.sessionStorage.clear();
    username = null;
    password = null;
  }

  // Check activated
  const iActivated = Boolean(setting);
  if (!iActivated && to.path !== PATH_CONST.PATH_ACTIVE.path) {
    console.info("Force redirect to " + PATH_CONST.PATH_ACTIVE.path);
    return next(PATH_CONST.PATH_ACTIVE.path);
  }

  // Check authenticated
  const isAuthenticated = Boolean(setting) && setting.username === username && setting.password === password;
  if (!isAuthenticated && to.path !== PATH_CONST.PATH_LOGIN.path && to.path !== PATH_CONST.PATH_ACTIVE.path) {
    console.info("Force redirect to " + PATH_CONST.PATH_LOGIN.path);
    return next(PATH_CONST.PATH_LOGIN.path);
  }

  // Next
  console.info("Getting " + to.path);
  return next();
});

export { router };
