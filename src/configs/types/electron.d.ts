import { BrowserWindow } from "electron";

export type ElectronEventNameType = "";

export type ElectronEventCallbackType = (event: IpcRendererEvent, ...args: any[]) => Promise<void>;

export type ElectronEnvModeType = "production" | "development";

export type ElectronRuntimeConfigType = {
  forceQuit: boolean;
  mainWindow: BrowserWindow | null;
};
