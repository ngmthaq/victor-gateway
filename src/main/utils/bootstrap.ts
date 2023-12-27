import { createWindow } from "./create-window";
import { ipcMainListener } from "./event-listener";
import { createWindowTray } from "./create-tray";
import { runtimeConfigs } from "./runtime-configs";

/**
 * Bootstraping application
 */
export function bootstrap() {
  const mainWindow = createWindow();
  runtimeConfigs.mainWindow = mainWindow;
  createWindowTray(mainWindow);
  ipcMainListener(mainWindow);
}
