/**
 * Path constants for Vue-Router
 *
 * @see https://router.vuejs.org/guide/
 */

import type { RouteRecordRaw } from "vue-router";
import ActiveViewVue from "@/renderer/views/Active/ActiveView.vue";
import LoginViewVue from "@/renderer/views/Login/LoginView.vue";
import RequestViewVue from "@/renderer/views/Request/RequestView.vue";
import EnvironmentViewVue from "@/renderer/views/Environment/EnvironmentView.vue";

export const PATH_ACTIVE: RouteRecordRaw = {
  path: "/active",
  component: ActiveViewVue,
};

export const PATH_LOGIN: RouteRecordRaw = {
  path: "/login",
  component: LoginViewVue,
};

export const PATH_REQUEST: RouteRecordRaw = {
  path: "/request",
  component: RequestViewVue,
};

export const PATH_ENVIRONMENT: RouteRecordRaw = {
  path: "/environment",
  component: EnvironmentViewVue,
};
