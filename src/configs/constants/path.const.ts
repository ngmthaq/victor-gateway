/**
 * Path constants for Vue-Router
 *
 * @see https://router.vuejs.org/guide/
 */

import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/renderer/views/Home/HomeView.vue";
import SettingView from "@/renderer/views/Setting/SettingView.vue";

export const PATH_HOME: RouteRecordRaw = {
  path: "/",
  component: HomeView,
};

export const PATH_SETTING: RouteRecordRaw = {
  path: "/setting",
  component: SettingView,
};
