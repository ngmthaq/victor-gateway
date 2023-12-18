import type { ElectronEventCallbackType, ElectronEventNameType } from "@/configs/types/window";
import { ipcRenderer } from "electron";
import { frame } from "./preload.frame";
import { env } from "./preload.env";
import { versions } from "./preload.versions";

/**
 * Electron Event Listener
 *
 * @param eventName
 * @param callback
 */
const addEventListener = (eventName: ElectronEventNameType, callback: ElectronEventCallbackType) => {
  ipcRenderer.on(eventName, callback);
};

/**
 * Electron Context Bridge
 */
export const electronContextBridge = {
  env: env,
  versions: versions,
  frame: frame,
  addEventListener: addEventListener,
};
