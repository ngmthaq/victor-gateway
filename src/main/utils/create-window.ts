import path from "path";
import { BrowserWindow } from "electron";
import { getLogo } from "./get-logo";
import { mainWindowConfigs } from "./runtime-configs";

// Create the browser window.
export function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: getLogo(32, 32),
    minWidth: 1366,
    minHeight: 768,
    width: 1366,
    height: 768,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  else mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  mainWindow.on("close", (event) => {
    if (mainWindowConfigs.forceQuit === false) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  return mainWindow;
}
