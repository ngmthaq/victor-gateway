<script setup lang="ts">
import type { SYSTEM_THEME_MODE_TYPE } from "@/configs/types/components";
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import { COOKIES_STORAGE_KEYS } from "@/configs/constants/app.const";
import CircularLoading from "./components/common/CircularLoading.vue";
import NotificationStack from "./components/common/NotificationStack.vue";
import RequestNotification from "./components/common/RequestNotification.vue";
import { getCookieStorage } from "./plugins/storage.plugin";

onBeforeMount(() => {
  const theme = getCookieStorage<SYSTEM_THEME_MODE_TYPE>(COOKIES_STORAGE_KEYS.theme) || "dark";
  document.getElementById("body").setAttribute("data-bs-theme", theme);
});
</script>

<template>
  <CircularLoading />
  <RequestNotification />
  <NotificationStack />
  <RouterView />
</template>

<style scoped lang="scss"></style>
