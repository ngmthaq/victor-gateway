/**
 * Path constants for Vue-Router
 *
 * @see https://router.vuejs.org/guide/
 */

import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/renderer/views/Home/HomeView.vue";
import AboutView from "@/renderer/views/About/AboutView.vue";

export const PATH_HOME: RouteRecordRaw = {
  path: "/",
  component: HomeView,
};

export const PATH_ABOUT: RouteRecordRaw = {
  path: "/about",
  component: AboutView,
};
