<script setup lang="ts">
import { ELEMENT_SIZES } from "@/configs/constants/app.const";
import BaseTitleBar from "./BaseTitleBar.vue";
</script>

<template>
  <section id="base-layout">
    <BaseTitleBar />
    <section
      id="base-layout-content"
      :style="{
        height: `calc(100vh - ${ELEMENT_SIZES.titleBarHeight}px)`,
        marginTop: ` ${ELEMENT_SIZES.titleBarHeight}px`,
      }"
    >
      <slot></slot>
    </section>
  </section>
</template>

<style scoped lang="scss">
#base-layout-content {
  width: 100vw;
  overflow-y: scroll;
}
</style>
