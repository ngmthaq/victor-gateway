import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { LOCAL_STORAGE_KEYS } from "@/configs/constants/app.const";
import { SystemThemeModeType } from "@/configs/types/components";
import { getLocalStorage } from "@/renderer/plugins/storage.plugin";
import { useEventBus } from "./useEventBus";
import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";

/**
 * Handle theme
 */
export function useTheme() {
  const eventBus = useEventBus();

  const theme = ref<SystemThemeModeType>("dark");

  function handleChangeThemeMode(mode: SystemThemeModeType) {
    theme.value = mode;
  }

  onBeforeMount(() => {
    eventBus.on<SystemThemeModeType>(EVENT_BUS_EVENTS.changeThemeMode, handleChangeThemeMode);
  });

  onMounted(async () => {
    const currentTheme = await getLocalStorage<SystemThemeModeType>(LOCAL_STORAGE_KEYS.theme);
    theme.value = currentTheme || "dark";
  });

  onBeforeUnmount(() => {
    eventBus.off<SystemThemeModeType>(EVENT_BUS_EVENTS.changeThemeMode, handleChangeThemeMode);
  });

  return { theme };
}
