import { electronPreload } from "@/preload";

declare global {
  interface Window {
    electron: typeof electronPreload;
  }
}
