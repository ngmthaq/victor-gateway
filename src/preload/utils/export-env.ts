import { ipcRenderer } from "electron";
import { ELECTRON_EVENTS } from "../../configs/constants/event.const";

export const env = {
  mode: () => process.env.NODE_ENV,

  all: async (): Promise<Record<string, string>> => {
    return ipcRenderer.invoke(ELECTRON_EVENTS.getEnv);
  },

  get: async (key: string): Promise<string | undefined> => {
    const envList: Record<string, string> = await env.all();
    return envList[key];
  },
};
