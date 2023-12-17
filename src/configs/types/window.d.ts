import { IpcRendererEvent } from "electron";

export type VersionsType = {
  node: () => string;
  chrome: () => string;
  electron: () => string;
};

export type EnvType = {
  get: (key: string) => string | undefined;
  mode: () => "development" | "production";
};

export type ElectronEventCallbackType = (event: IpcRendererEvent, ...args: any[]) => Promise<void>;

export type ElectronEventNameType = "electron:quit";

export type ElectronEventListenerType = (eventName: ElectronEventNameType, callback: ElectronEventCallbackType) => void;

export type ElectronFrameType = {
  isMaximized: () => boolean;
  minimize: () => void;
  maximize: () => void;
  unmaximize: () => void;
  openDevtools: () => void;
  close: () => void;
};

export type ElectronType = {
  versions: VersionsType;
  env: EnvType;
  frame: ElectronFrameType;
  addEventListener: ElectronEventListenerType;
};

declare global {
  interface Window {
    electron: ElectronType;
  }
}
