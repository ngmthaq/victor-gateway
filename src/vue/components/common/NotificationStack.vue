<script setup lang="ts">
import type { ToastConfigs } from "@/configs/types/components";
import { onBeforeMount, onUnmounted, onUpdated, ref, watch } from "vue";
import { Toast } from "bootstrap";
import { APP_EVENTS } from "@/configs/constants/app.const";
import { useEventBus } from "@/hooks/common/useEventBus";
import { randomStr } from "@/plugins/str.plugin";
import { getCurrentMilliseconds } from "@/plugins/datetime.plugin";

const TOAST_DELAY = 6000;
const TOAST_MAX = 5;
const eventBus = useEventBus();
const newToast = ref<ToastConfigs>();
const toasts = ref<ToastConfigs[]>([]);

const handleAppendToast = (toast: ToastConfigs) => {
  newToast.value = toast;
};

watch(
  () => newToast.value,
  (toast) => {
    if (toast) {
      const openedToasts = toasts.value.filter((toast) => toast.status === "opened");
      if (openedToasts.length >= TOAST_MAX) {
        const element = document.getElementById(openedToasts[0].id as string) as Element;
        const bootstrapToast = new Toast(element, { delay: TOAST_DELAY });
        const index = toasts.value.findIndex((toast) => toast.id === openedToasts[0].id);
        toasts.value[index].status = "closed";
        bootstrapToast.hide();
      }

      toast.status = "idle";
      toast.id = "toast_" + getCurrentMilliseconds() + "_" + randomStr(16);
      toasts.value = [...toasts.value, toast];
    }
  },
);

onBeforeMount(() => {
  eventBus.on(APP_EVENTS.eventBus.appendToast, handleAppendToast);
});

onUnmounted(() => {
  eventBus.off(APP_EVENTS.eventBus.appendToast, handleAppendToast);
});

onUpdated(() => {
  toasts.value.forEach((toast) => {
    if (toast.status === "idle") {
      const element = document.getElementById(toast.id as string) as Element;
      const bootstrapToast = new Toast(element, { delay: TOAST_DELAY });
      bootstrapToast.show();
      toast.status = "opened";
      element.addEventListener("hidden.bs.toast", () => {
        toast.status = "closed";
      });
    }
  });
});
</script>

<template>
  <section id="notification-stack" class="toast-container position-fixed bottom-0 end-0">
    <template v-for="toast in toasts" :key="toast.id">
      <div
        class="toast align-items-center border-0 ms-0 me-1 my-1"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        :id="toast.id"
        :class="`text-bg-${toast.variant}`"
      >
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center justify-content-start">
            <i v-if="toast.variant === 'success'" class="bi bi-check2-circle"></i>
            <i v-else-if="toast.variant === 'danger'" class="bi bi-x-circle"></i>
            <i v-else-if="toast.variant === 'warning'" class="bi bi-exclamation-circle"></i>
            <i v-else-if="toast.variant === 'info'" class="bi bi-info-circle"></i>
            <i v-else class="bi bi-bell"></i>
            <p class="p-0 m-0 ms-2">{{ toast.message }}</p>
          </div>
          <button
            type="button"
            class="btn btn-sm me-2 m-auto"
            data-bs-dismiss="toast"
            :class="`text-bg-${toast.variant}`"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss"></style>
