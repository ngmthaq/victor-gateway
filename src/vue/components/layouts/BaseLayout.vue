<script setup lang="ts">
import BaseTitleBar from "./BaseTitleBar.vue";
</script>

<template>
  <section id="base-layout">
    <BaseTitleBar />
    <section id="base-layout-content">
      <slot></slot>
    </section>
  </section>
</template>

<style scoped lang="scss"></style>
