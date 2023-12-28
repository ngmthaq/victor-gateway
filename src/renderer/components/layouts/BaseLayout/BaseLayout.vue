<script setup lang="ts">
import { ELEMENT_SIZES } from "@/configs/constants/app.const";
import { ref } from "vue";
import BaseTitleBar from "./BaseTitleBar.vue";
import BaseSettingDialog from "./BaseSettingDialog.vue";
import BaseVersionDialog from "./BaseVersionDialog.vue";

const isMac = window.electron.platform === "darwin";
const titleBarHeight = isMac ? 0 : ELEMENT_SIZES.titleBarHeight;

const isOpenSettingDialog = ref<boolean>(false);
const isOpenVersionDialog = ref<boolean>(false);

function handleOpenSettingDialog() {
  isOpenSettingDialog.value = true;
  isOpenVersionDialog.value = false;
}

function handleCloseSettingDialog() {
  isOpenSettingDialog.value = false;
}

function handleOpenVersionsDialog() {
  isOpenSettingDialog.value = false;
  isOpenVersionDialog.value = true;
}

function handleCloseVersionsDialog() {
  isOpenVersionDialog.value = false;
}

function handleCloseAll() {
  isOpenSettingDialog.value = false;
  isOpenVersionDialog.value = false;
}
</script>

<template>
  <section id="base-layout">
    <section id="base-layout-titlebar">
      <BaseSettingDialog :open="isOpenSettingDialog" @close="handleCloseSettingDialog" />
      <BaseVersionDialog :open="isOpenVersionDialog" @close="handleCloseVersionsDialog" />
      <BaseTitleBar
        v-if="!isMac"
        @click-setting="handleOpenSettingDialog"
        @click-version="handleOpenVersionsDialog"
        @close-all="handleCloseAll"
      />
    </section>
    <section
      id="base-layout-content"
      :style="{
        height: `calc(100vh - ${titleBarHeight}px)`,
        marginTop: ` ${titleBarHeight}px`,
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
  position: relative;
}
</style>
