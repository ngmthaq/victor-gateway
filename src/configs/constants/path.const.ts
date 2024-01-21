/**
 * Path constants for Vue-Router
 *
 * @see https://router.vuejs.org/guide/
 */

import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/renderer/views/Home/HomeView.vue";
import ActiveView from "@/renderer/views/Active/ActiveView.vue";
import LoginViewVue from "@/renderer/views/Login/LoginView.vue";

export const PATH_HOME: RouteRecordRaw = {
  path: "/",
  component: HomeView,
};

export const PATH_ACTIVE: RouteRecordRaw = {
  path: "/active",
  component: ActiveView,
};

export const PATH_LOGIN: RouteRecordRaw = {
  path: "/login",
  component: LoginViewVue,
};
