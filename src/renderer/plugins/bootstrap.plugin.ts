import type { SystemThemeModeType } from "@/configs/types/components";
import {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
} from "bootstrap";
import { LOCAL_STORAGE_KEYS } from "@/configs/constants/app.const";
import { getLocalStorage } from "./storage.plugin";

/**
 * Setup bootstrap theme (dark | light)
 */
export async function setTheme() {
  const currentTheme = await getLocalStorage<SystemThemeModeType>(LOCAL_STORAGE_KEYS.theme);
  const theme = currentTheme || "dark";
  document.getElementById("body").setAttribute("data-bs-theme", theme);
}

/**
 * Bootstrap Classes
 */
export const bootstrap = {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
};
