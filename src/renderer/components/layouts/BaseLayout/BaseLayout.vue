<script setup lang="ts">
import { ELEMENT_SIZES } from "@/configs/constants/app.const";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
import BaseTitleBar from "./BaseTitleBar.vue";
import BaseSettingDialog from "./BaseSettingDialog.vue";
import BaseVersionDialog from "./BaseVersionDialog.vue";

const isOpenSettingDialog = ref<boolean>(false);
const isOpenVersionDialog = ref<boolean>(false);

async function handleOpenSettingDialog() {
  isOpenSettingDialog.value = true;
  isOpenVersionDialog.value = false;
}

async function handleOpenVersionsDialog() {
  isOpenSettingDialog.value = false;
  isOpenVersionDialog.value = true;
}

function handleCloseSettingDialog() {
  isOpenSettingDialog.value = false;
}

function handleCloseVersionsDialog() {
  isOpenVersionDialog.value = false;
}

function handleCloseAll() {
  isOpenSettingDialog.value = false;
  isOpenVersionDialog.value = false;
}

onMounted(() => {
  window.electron.addEventListener(ELECTRON_EVENTS.openSetting, handleOpenSettingDialog);
  window.electron.addEventListener(ELECTRON_EVENTS.showVersion, handleOpenVersionsDialog);
});

onBeforeUnmount(() => {
  window.electron.removeEventListener(ELECTRON_EVENTS.openSetting, handleOpenSettingDialog);
  window.electron.removeEventListener(ELECTRON_EVENTS.showVersion, handleOpenVersionsDialog);
});
</script>

<template>
  <section id="base-layout">
    <section id="base-layout-titlebar">
      <BaseSettingDialog :open="isOpenSettingDialog" @close="handleCloseSettingDialog" />
      <BaseVersionDialog :open="isOpenVersionDialog" @close="handleCloseVersionsDialog" />
      <BaseTitleBar
        @click-setting="handleOpenSettingDialog"
        @click-version="handleOpenVersionsDialog"
        @close-all="handleCloseAll"
      />
    </section>
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
  position: relative;
}
</style>
