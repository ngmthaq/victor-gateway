import { contextBridge } from "electron";
import { electronPreload } from "@/preload";

/**
 * Electron Context Bridge
 */
contextBridge.exposeInMainWorld("electron", electronPreload);
