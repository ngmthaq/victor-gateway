// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
import { ElectronEventCallbackType, ElectronEventNameType } from "@/configs/types/window";

contextBridge.exposeInMainWorld("electron", {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },

  env: {
    mode: () => process.env.NODE_ENV,
    get: (key: string): string | undefined => {
      const env: Record<string, string> = {};
      for (const key in process.env) {
        if (Object.prototype.hasOwnProperty.call(process.env, key)) {
          const value = process.env[key];
          if (key.startsWith("ELECTRON_PUBLIC_")) {
            env[key] = value;
          }
        }
      }
      return env[key];
    },
  },

  frame: {
    isMaximized: () => {
      return ipcRenderer.invoke(ELECTRON_EVENTS.isMaximized);
    },

    minimize: () => {
      ipcRenderer.send(ELECTRON_EVENTS.minimize);
    },

    maximize: () => {
      ipcRenderer.send(ELECTRON_EVENTS.maximize);
    },

    unmaximize: () => {
      ipcRenderer.send(ELECTRON_EVENTS.unmaximize);
    },

    openDevtools: () => {
      ipcRenderer.send(ELECTRON_EVENTS.openDevtools);
    },

    close: () => {
      ipcRenderer.send(ELECTRON_EVENTS.close);
    },
  },

  addEventListener: (eventName: ElectronEventNameType, callback: ElectronEventCallbackType) => {
    ipcRenderer.on(eventName, callback);
  },
});
