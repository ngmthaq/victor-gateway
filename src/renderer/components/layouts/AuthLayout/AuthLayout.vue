<script setup lang="ts">
import BaseLayout from "../BaseLayout/BaseLayout.vue";
import AuthSidebar from "./AuthSidebar.vue";
</script>

<template>
  <BaseLayout>
    <div id="auth-layout">
      <AuthSidebar />
      <div id="auth-layout-slot">
        <slot></slot>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped lang="scss">
#auth-layout {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & #auth-layout-slot {
    height: 100%;
    width: calc(100% - 400px);
  }
}
</style>
