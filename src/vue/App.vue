<script setup lang="ts">
import { RouterView } from "vue-router";
import CircularLoading from "./components/common/CircularLoading.vue";
import NotificationStack from "./components/common/NotificationStack.vue";
import RequestNotification from "./components/common/RequestNotification.vue";
import RequestCookies from "./components/common/RequestCookies.vue";
</script>

<template>
  <RequestCookies />
  <CircularLoading />
  <RequestNotification />
  <NotificationStack />
  <RouterView />
</template>

<style scoped lang="scss"></style>
