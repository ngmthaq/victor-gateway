import { ipcRenderer } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";

export const localStorage = {
  get: (key: string) => ipcRenderer.invoke(ELECTRON_EVENTS.getLocalStorage, key),
  set: (key: string, value: any) => ipcRenderer.invoke(ELECTRON_EVENTS.setLocalStorage, key, value),
  remove: (key: string) => ipcRenderer.invoke(ELECTRON_EVENTS.removeLocalStorage, key),
  clear: () => ipcRenderer.invoke(ELECTRON_EVENTS.clearLocalStorage),
};
