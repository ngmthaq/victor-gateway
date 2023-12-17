import type { ToastType } from "@/configs/types/components";
import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";
import { useEventBus } from "./useEventBus";

export const useNotification = () => {
  const eventBus = useEventBus();

  const append = (toast: ToastType) => {
    eventBus.emit(EVENT_BUS_EVENTS.appendToast, toast);
  };

  return { append };
};
