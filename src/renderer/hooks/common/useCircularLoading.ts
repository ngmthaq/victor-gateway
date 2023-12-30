import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";
import { useEventBus } from "./useEventBus";

/**
 * Custom hook to handle circular loading
 *
 * @returns methods
 */
export function useCircularLoading() {
  const eventBus = useEventBus();

  const open = () => {
    eventBus.emit(EVENT_BUS_EVENTS.openCircularLoading, true);
  };

  const close = () => {
    eventBus.emit(EVENT_BUS_EVENTS.openCircularLoading, false);
  };

  return { open, close };
}
