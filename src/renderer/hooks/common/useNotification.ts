import type { ToastType } from "@/configs/types/components";
import icon from "@/assets/img/icon.png";
import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";
import { productName } from "~/package.json";
import { useEventBus } from "./useEventBus";

/**
 * Custom hook to open snackbar (notification)
 *
 * @returns methods
 */
export function useNotification() {
  const eventBus = useEventBus();

  const openAppNotification = (toast: ToastType) => {
    eventBus.emit(EVENT_BUS_EVENTS.appendToast, toast);
  };

  const openSystemNotification = (message: string) => {
    return new Notification(productName, { body: message, icon: icon });
  };

  return { openAppNotification, openSystemNotification };
}
