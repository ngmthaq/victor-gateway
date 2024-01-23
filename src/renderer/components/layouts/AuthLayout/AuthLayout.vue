<script setup lang="ts">
import { ref } from "vue";
import BaseLayout from "../BaseLayout/BaseLayout.vue";
import AuthConsole from "./AuthConsole.vue";
import AuthSidebar from "./AuthSidebar.vue";

const isOpenConsole = ref<boolean>(false);

function handleOpenConsole() {
  isOpenConsole.value = true;
}

function handleCloseConsole() {
  isOpenConsole.value = false;
}
</script>

<template>
  <BaseLayout>
    <div id="auth-layout">
      <div id="auth-layout-wrapper" :class="{ open: isOpenConsole }">
        <AuthSidebar />
        <div id="auth-layout-slot">
          <slot></slot>
        </div>
      </div>
      <AuthConsole :open="isOpenConsole" @open="handleOpenConsole" @close="handleCloseConsole" />
    </div>
  </BaseLayout>
</template>

<style scoped lang="scss">
#auth-layout {
  height: 100%;
  width: 100%;

  & #auth-layout-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 26px);
    transition: all ease-in-out 0.1s;

    &.open {
      height: calc(100% - 200px);
    }

    & #auth-layout-slot {
      height: 100%;
      width: calc(100% - 400px);
    }
  }
}
</style>
