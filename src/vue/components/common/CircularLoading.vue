<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from "vue";
import { APP_EVENTS } from "@/configs/constants/app.const";
import { useEventBus } from "@/hooks/common/useEventBus";

const eventBus = useEventBus();
const isLoading = ref<boolean>(false);

const handleOpenLoading = (open: boolean) => {
  isLoading.value = open;
};

onBeforeMount(() => {
  eventBus.on(APP_EVENTS.eventBus.openCircularLoading, handleOpenLoading);
});

onUnmounted(() => {
  eventBus.off(APP_EVENTS.eventBus.openCircularLoading, handleOpenLoading);
});
</script>

<template>
  <Transition>
    <section id="circular-loading" class="circular-loading" v-show="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </section>
  </Transition>
</template>

<style scoped lang="scss">
.circular-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $z-index-common-loading;
  background-color: rgba($color: $black, $alpha: 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
