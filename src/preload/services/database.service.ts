import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
import { ipcRenderer } from "electron";

export const db = {
  query: async function <T>(repo: string, action: string, ...params: any[]): Promise<T> {
    return ipcRenderer.invoke(ELECTRON_EVENTS.queryRepositories, repo, action, ...params);
  },
};
