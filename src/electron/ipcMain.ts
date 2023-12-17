import { BrowserWindow, app, ipcMain } from "electron";
import { mainWindowConfigs } from "./configs";

// ipcMain listen events from preload/renderer
export function ipcMainListener(mainWindow: BrowserWindow) {
  ipcMain.on("electron:quit", () => {
    mainWindowConfigs.isForgeQuit = true;
    app.quit();
  });

  ipcMain.on("electron:minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("electron:maximize", () => {
    mainWindow.maximize();
  });

  ipcMain.on("electron:unmaximize", () => {
    mainWindow.unmaximize();
  });

  ipcMain.on("electron:close", () => {
    mainWindow.close();
  });

  ipcMain.on("electron:openDevtools", () => {
    mainWindow.webContents.openDevTools({ mode: "undocked" });
  });

  ipcMain.handle("electron:isMaximized", () => {
    return mainWindow.isMaximized();
  });
}
