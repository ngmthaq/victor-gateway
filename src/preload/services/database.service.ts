import { ipcRenderer } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";

export const db = {
  query: async function <T>(repo: string, action: string, ...params: any[]): Promise<T> {
    return ipcRenderer.invoke(ELECTRON_EVENTS.queryRepositories, repo, action, ...params);
  },
};
