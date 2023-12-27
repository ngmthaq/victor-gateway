import type { InternetConnectionChangeCallbackType } from "@/configs/types/plugins";
import { onBeforeUnmount, onMounted } from "vue";
import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";
import { eventBus } from "./bus.plugin";

export function handleInternetConnection() {
  eventBus.emit<boolean>(EVENT_BUS_EVENTS.changeInternetStatus, window.navigator.onLine);
}

export function onChangeInternetStatus(callback: InternetConnectionChangeCallbackType) {
  onMounted(() => {
    eventBus.on<boolean>(EVENT_BUS_EVENTS.changeInternetStatus, callback);
  });

  onBeforeUnmount(() => {
    eventBus.off<boolean>(EVENT_BUS_EVENTS.changeInternetStatus, callback);
  });
}
