import { ipcRenderer } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";

export const frame = {
  isMaximized: (): Promise<boolean> => {
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
};
