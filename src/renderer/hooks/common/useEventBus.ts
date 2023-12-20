import { EventBus, eventBus } from "@/renderer/plugins/bus.plugin";

/**
 * Custom hook to handle EventBus
 *
 * @returns {EventBus}
 */
export function useEventBus(): EventBus {
  return eventBus;
}
