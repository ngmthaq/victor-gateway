import { BrowserWindow, ipcMain } from "electron";
import repositories from "@/database/repositories/all.repo";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
import { runtimeConfigs } from "./runtime.service";

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

  ipcMain.handle(ELECTRON_EVENTS.getLocalStorage, (_: any, key: string) => {
    return runtimeConfigs.localStorage.get(key);
  });

  ipcMain.handle(ELECTRON_EVENTS.setLocalStorage, (_: any, key: string, value: any) => {
    return runtimeConfigs.localStorage.set(key, value);
  });

  ipcMain.handle(ELECTRON_EVENTS.removeLocalStorage, (_: any, key: string) => {
    return runtimeConfigs.localStorage.delete(key);
  });

  ipcMain.handle(ELECTRON_EVENTS.clearLocalStorage, () => {
    return runtimeConfigs.localStorage.clear();
  });

  ipcMain.handle(ELECTRON_EVENTS.queryRepositories, async (_: any, repo: string, action: string, ...params: any[]) => {
    const Repositories: any = repositories;
    const result = await Repositories[repo][action](...params);
    console.log(">>> Query Repository:", { repo, action, params, result }, "\n");
    return result;
  });
}
