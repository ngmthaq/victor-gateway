import type { ToastType } from "@/configs/types/components";
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

  return { append };
}
