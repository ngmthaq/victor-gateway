import { createWindow } from "./create-window";
import { ipcMainListener } from "./event-listener";
import { createWindowTray } from "./create-tray";

// Bootstraping application
export function bootstrap() {
  const mainWindow = createWindow();
  createWindowTray(mainWindow);
  ipcMainListener(mainWindow);
}
