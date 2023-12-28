// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import type { ElectronEventCallbackType, ElectronEventNameType } from "@/configs/types/electron";
import { contextBridge, ipcRenderer } from "electron";
import { versions } from "./utils/export-versions";
import { frame } from "./utils/frame-events";
import { env } from "./utils/export-env";

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
 * Electron Preload Object
 */
export const electronPreload = {
  env: env,
  versions: versions,
  frame: frame,
  platform: process.platform,
  addEventListener: addEventListener,
};

/**
 * Electron Context Bridge
 */
contextBridge.exposeInMainWorld("electron", electronPreload);
