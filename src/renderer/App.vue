<script setup lang="ts">
import { RouterView } from "vue-router";
import CircularLoading from "./components/common/CircularLoading.vue";
import NotificationStack from "./components/common/NotificationStack.vue";
import RequestNotification from "./components/common/RequestNotification.vue";
</script>

<template>
  <CircularLoading />
  <RequestNotification />
  <NotificationStack />
  <RouterView />
</template>

<style scoped lang="scss"></style>
