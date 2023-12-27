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
import { COOKIES_STORAGE_KEYS } from "@/configs/constants/app.const";
import { getCookieStorage } from "./storage.plugin";

/**
 * Setup bootstrap theme (dark | light)
 */
export function setTheme() {
  const theme = getCookieStorage<SystemThemeModeType>(COOKIES_STORAGE_KEYS.theme) || "dark";
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
