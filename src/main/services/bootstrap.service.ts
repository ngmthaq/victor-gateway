import { createWindow } from "./window.service";
import { ipcMainListener } from "./listener.service";
import { createWindowTray } from "./tray.service";
import { runtimeConfigs } from "./runtime.service";

/**
 * Bootstraping application
 */
export function bootstrap() {
  const mainWindow = createWindow();
  runtimeConfigs.mainWindow = mainWindow;
  createWindowTray(mainWindow);
  ipcMainListener(mainWindow);
}
