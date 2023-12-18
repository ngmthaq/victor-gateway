<script setup lang="ts">
import { ELEMENT_SIZES } from "@/configs/constants/app.const";
import { ref } from "vue";
import BaseTitleBar from "./BaseTitleBar.vue";
import BaseSettingDialog from "./BaseSettingDialog.vue";

const isOpenSettingDialog = ref<boolean>(false);

const handleOpenSettingDialog = () => {
  isOpenSettingDialog.value = true;
};

const handleCloseSettingDialog = () => {
  isOpenSettingDialog.value = false;
};
</script>

<template>
  <section id="base-layout">
    <BaseTitleBar @click-setting="handleOpenSettingDialog" />
    <BaseSettingDialog :open="isOpenSettingDialog" @close="handleCloseSettingDialog" />
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
