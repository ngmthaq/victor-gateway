import { EventBus, eventBus } from "@/vue/plugins/bus.plugin";

/**
 * Custom hook to handle EventBus
 *
 * @returns {EventBus}
 */
export function useEventBus(): EventBus {
  return eventBus;
}
