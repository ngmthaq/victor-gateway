export type ElectronEventNameType = "";
export type ElectronEventCallbackType = (event: IpcRendererEvent, ...args: any[]) => Promise<void>;
export type ElectronEnvModeType = "production" | "development";
