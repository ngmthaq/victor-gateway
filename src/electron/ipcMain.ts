import { BrowserWindow, app, ipcMain } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
import { mainWindowConfigs } from "./configs";

// ipcMain listen events from preload/renderer
export function ipcMainListener(mainWindow: BrowserWindow) {
  ipcMain.on(ELECTRON_EVENTS.quit, () => {
    mainWindowConfigs.isForgeQuit = true;
    app.quit();
  });

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
}
