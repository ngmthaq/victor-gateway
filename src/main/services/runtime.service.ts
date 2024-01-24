import type { ElectronRuntimeConfigType } from "@/configs/types/electron";
import Store from "electron-store";

/**
 * Electron localStorage
 */
const localStorage = new Store();
if (process.env.NODE_ENV === "development") localStorage.clear();

/**
 * Runtime configurations
 */
export const runtimeConfigs: ElectronRuntimeConfigType = {
  forceQuit: false,
  mainWindow: null,
  localStorage: localStorage,
};
