import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
import { ipcRenderer } from "electron";

export const localStorage = {
  get: (key: string) => ipcRenderer.invoke(ELECTRON_EVENTS.getLocalStorage, key),
  set: (key: string, value: any) => ipcRenderer.invoke(ELECTRON_EVENTS.setLocalStorage, key, value),
  remove: (key: string) => ipcRenderer.invoke(ELECTRON_EVENTS.removeLocalStorage, key),
};
