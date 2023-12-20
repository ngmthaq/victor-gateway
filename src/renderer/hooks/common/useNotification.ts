import type { ToastType } from "@/configs/types/components";
import icon from "@/assets/img/icon.png";
import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";
import { useEventBus } from "./useEventBus";

/**
 * Custom hook to open snackbar (notification)
 *
 * @returns methods
 */
export function useNotification() {
  const eventBus = useEventBus();

  const append = (toast: ToastType) => {
    eventBus.emit(EVENT_BUS_EVENTS.appendToast, toast);
  };

  const openSystemNotification = (title: string, message: string) => {
    return new Notification(title, { body: message, icon: icon });
  };

  return { append, openSystemNotification };
}
