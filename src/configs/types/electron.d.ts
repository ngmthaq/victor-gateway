import { BrowserWindow } from "electron";
import Store from "electron-store";

export type ElectronEventCallbackType = (event: IpcRendererEvent, ...args: any[]) => Promise<void>;

export type ElectronEnvModeType = "production" | "development";

export type ElectronRuntimeConfigType = {
  forceQuit: boolean;
  mainWindow: BrowserWindow | null;
  localStorage: Store;
};
