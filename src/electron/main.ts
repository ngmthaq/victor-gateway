import path from "node:path";
import { app, BrowserWindow } from "electron";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { mainWindowConfigs } from "./configs";
import { ipcMainListener } from "./ipcMain";
import { createWindowTray } from "./tray";
import { getLogo } from "./logo";
import "./env";

// IS_DEV
const IS_DEV = process.env.NODE_ENV === "development";

// Security warnings and recommendations are printed to the developer console.
// They only show up when the binary's name is Electron,
// indicating that a developer is currently looking at the console.
// You can force-enable or force-disable these warnings by setting
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) app.quit();

// Create the browser window.
function createWindow() {
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

// Bootstraping application
function bootstrap() {
  const mainWindow = createWindow();
  createWindowTray(mainWindow);
  ipcMainListener(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  if (IS_DEV) {
    installExtension(VUEJS_DEVTOOLS).then(bootstrap).catch(console.error);
  } else {
    bootstrap();
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
