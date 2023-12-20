// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import type { ElectronEventCallbackType, ElectronEventNameType } from "@/configs/types/window";
import { contextBridge, ipcRenderer } from "electron";
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
contextBridge.exposeInMainWorld("electron", {
  env: env,
  versions: versions,
  frame: frame,
  addEventListener: addEventListener,
});
