<script setup lang="ts">
import BaseLayout from "../BaseLayout/BaseLayout.vue";
import AuthConsole from "./AuthConsole.vue";
import AuthSidebar from "./AuthSidebar.vue";
</script>

<template>
  <BaseLayout>
    <div id="auth-layout">
      <div id="auth-layout-wrapper">
        <AuthSidebar />
        <div id="auth-layout-slot">
          <slot></slot>
        </div>
      </div>
      <AuthConsole />
    </div>
  </BaseLayout>
</template>

<style scoped lang="scss">
#auth-layout {
  height: 100%;
  width: 100%;

  & #auth-layout-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 200px);
    width: 100%;

    & #auth-layout-slot {
      height: 100%;
      width: calc(100% - 400px);
    }
  }
}
</style>
