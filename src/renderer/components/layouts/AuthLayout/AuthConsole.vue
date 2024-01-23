<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "@/renderer/hooks/common/useTheme";

const { t } = useI18n();
const { theme } = useTheme();

const outputs = ref<string[]>([]);
</script>

<template>
  <div id="auth-console">
    <div class="auth-console-header" :class="`${theme}`">
      <span :class="`${theme}`"><i class="bi bi-window-fullscreen"></i></span>
      <span :class="`${theme}`">{{ t("TXT_CONSOLE") }} </span>
    </div>
    <div class="auth-console-body">
      <template v-if="outputs.length > 0">
        <div v-for="(output, index) in outputs" :key="index">
          <code>{{ ">" }} {{ output }}</code>
        </div>
      </template>
      <template v-else>
        <code>{{ ">" }} {{ t("TXT_NO_DATA") }}</code>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
#auth-console {
  height: 200px;
  width: 100%;

  & .auth-console {
    &-header {
      height: 26px;
      width: 100%;

      & span {
        display: inline-block;
        font-size: 12px;
        padding: 4px;
        border-radius: 2px;
        font-weight: bold;
      }

      &.light {
        border-top: 1px solid $gray-600;
        background-color: $gray-200;
      }

      &.dark {
        border-top: 1px solid $gray-300;
        background-color: $gray-800;
      }
    }

    &-body {
      height: calc(100% - 26px);
      width: 100%;
      overflow-y: scroll;
    }
  }

  & code {
    font-size: 12px;
  }
}
</style>
