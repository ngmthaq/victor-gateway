import type { ElectronEnvModeType } from "@/configs/types/electron";
import { ipcRenderer } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";

export const env = {
  mode: function (): ElectronEnvModeType {
    return process.env.NODE_ENV as ElectronEnvModeType;
  },

  all: async function (): Promise<Record<string, string>> {
    return ipcRenderer.invoke(ELECTRON_EVENTS.getEnv);
  },

  get: async function (key: string): Promise<string | undefined> {
    const envList: Record<string, string> = await env.all();
    return envList[key];
  },
};
