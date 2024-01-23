import { getCurrentISO8601 } from "@/renderer/plugins/datetime.plugin";
import { useEventBus } from "./useEventBus";
import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";

/**
 * Handle send app console message
 *
 * @returns methods
 */
export function useAppConsole() {
  const eventBus = useEventBus();

  function send(message: string) {
    const time = getCurrentISO8601();
    const finalMessage = `[${time}] ${message}`;
    eventBus.emit<string>(EVENT_BUS_EVENTS.pushConsole, finalMessage);
  }

  return { send };
}
