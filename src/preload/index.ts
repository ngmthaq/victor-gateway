// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import type { ElectronEventCallbackType } from "@/configs/types/electron";
import { contextBridge, ipcRenderer } from "electron";
import { localStorage } from "./utils/local-storage";
import { versions } from "./utils/export-versions";
import { frame } from "./utils/frame-events";
import { env } from "./utils/export-env";

/**
 * Electron Add Event Listener
 *
 * @param eventName
 * @param callback
 */
const addEventListener = (eventName: string, callback: ElectronEventCallbackType) => {
  ipcRenderer.on(eventName, callback);
};

/**
 * Electron Remove Event Listener
 *
 * @param eventName
 * @param callback
 */
const removeEventListener = (eventName: string, callback: ElectronEventCallbackType) => {
  ipcRenderer.off(eventName, callback);
};

/**
 * Electron Preload Object
 */
export const electronPreload = {
  env: env,
  frame: frame,
  versions: versions,
  localStorage: localStorage,
  platform: process.platform,
  addEventListener: addEventListener,
  removeEventListener: removeEventListener,
};

/**
 * Electron Context Bridge
 */
contextBridge.exposeInMainWorld("electron", electronPreload);
