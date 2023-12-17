import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";
import { useEventBus } from "./useEventBus";

export const useCircularLoading = () => {
  const eventBus = useEventBus();

  const open = () => {
    eventBus.emit(EVENT_BUS_EVENTS.openCircularLoading, true);
  };

  const close = () => {
    eventBus.emit(EVENT_BUS_EVENTS.openCircularLoading, false);
  };

  return { open, close };
};
