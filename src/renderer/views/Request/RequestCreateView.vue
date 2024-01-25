<script setup lang="ts">
import AuthLayout from "@/renderer/components/layouts/AuthLayout/AuthLayout.vue";
import RequestFormComponent from "./RequestFormComponent.vue";
</script>

<template>
  <AuthLayout>
    <RequestFormComponent />
  </AuthLayout>
</template>

<style scoped lang="scss">
.custom-selection {
  flex: unset !important;
  width: 120px !important;
}
</style>
