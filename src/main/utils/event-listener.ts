import { BrowserWindow, ipcMain } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";

/**
 * ipcMain event listener from preload/renderer
 *
 * @see https://www.electronjs.org/docs/latest/api/ipc-main#methods
 * @param {BrowserWindow} mainWindow
 */
export function ipcMainListener(mainWindow: BrowserWindow) {
  ipcMain.on(ELECTRON_EVENTS.minimize, () => {
    mainWindow.minimize();
  });

  ipcMain.on(ELECTRON_EVENTS.maximize, () => {
    mainWindow.maximize();
  });

  ipcMain.on(ELECTRON_EVENTS.unmaximize, () => {
    mainWindow.unmaximize();
  });

  ipcMain.on(ELECTRON_EVENTS.close, () => {
    mainWindow.close();
  });

  ipcMain.on(ELECTRON_EVENTS.openDevtools, () => {
    mainWindow.webContents.openDevTools({ mode: "undocked" });
  });

  ipcMain.handle(ELECTRON_EVENTS.isMaximized, () => {
    return mainWindow.isMaximized();
  });

  ipcMain.handle(ELECTRON_EVENTS.getEnv, () => {
    const env: Record<string, string> = {};
    for (const key in process.env) {
      if (Object.prototype.hasOwnProperty.call(process.env, key)) {
        const value = process.env[key];
        if (key.startsWith("ELECTRON_PUBLIC_")) {
          env[key] = value;
        }
      }
    }
    return env;
  });
}
