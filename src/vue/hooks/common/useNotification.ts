import type { ToastConfigs } from "@/configs/types/components";
import { APP_EVENTS } from "@/configs/constants/app.const";
import { useEventBus } from "./useEventBus";

export const useNotification = () => {
  const eventBus = useEventBus();

  const append = (toast: ToastConfigs) => {
    eventBus.emit(APP_EVENTS.eventBus.appendToast, toast);
  };

  return { append };
};
