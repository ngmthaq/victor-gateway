<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";
import { useTheme } from "@/renderer/hooks/common/useTheme";
import { useEventBus } from "@/renderer/hooks/common/useEventBus";

const props = defineProps<{ open: boolean }>();

const emits = defineEmits<{
  (event: "open"): void;
  (event: "close"): void;
}>();

const eventBus = useEventBus();
const { t } = useI18n();
const { theme } = useTheme();

const outputs = ref<string[]>([]);

function handlePushConsole(message: string) {
  outputs.value.push(message);
}

function handleToggleOpen() {
  if (props.open) {
    emits("close");
  } else {
    emits("open");
  }
}

onBeforeMount(() => {
  eventBus.on(EVENT_BUS_EVENTS.pushConsole, handlePushConsole);
});

onBeforeUnmount(() => {
  eventBus.off(EVENT_BUS_EVENTS.pushConsole, handlePushConsole);
});
</script>

<template>
  <div id="auth-console" :class="{ open: props.open }">
    <div class="auth-console-header" :class="`${theme}`">
      <div>
        <span :class="`${theme}`"><i class="bi bi-window-fullscreen"></i></span>
        <span :class="`${theme}`">{{ t("TXT_CONSOLE") }} </span>
      </div>
      <div class="cursor-pointer" @click="handleToggleOpen">
        <i class="bi bi-caret-down-fill" v-if="props.open"></i>
        <i class="bi bi-caret-up-fill" v-else></i>
      </div>
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
  width: 100%;
  height: 26px;
  transition: all ease-in-out 0.1s;

  &.open {
    height: 200px;
  }

  & .auth-console {
    &-header {
      height: 26px;
      width: 100%;
      padding: 0 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

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
      padding: 0 8px;
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
