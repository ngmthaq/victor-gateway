import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import { createWindowTray } from "./tray";
import { getLogo } from "./logo";
import "dotenv/config";

// Security warnings and recommendations are printed to the developer console.
// They only show up when the binary's name is Electron,
// indicating that a developer is currently looking at the console.
// You can force-enable or force-disable these warnings by setting
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const mainWindowConfigs = {
  isForgeQuit: false,
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

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
  if (process.env.NODE_ENV === "development") mainWindow.webContents.openDevTools({ mode: "undocked" });
  mainWindow.maximize();
  mainWindow.on("close", (event) => {
    if (mainWindowConfigs.isForgeQuit === false) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  return mainWindow;
}

// You can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
function handleOpenMainWindow(mainWindow: BrowserWindow) {
  createWindowTray(mainWindow);
}

// ipcMain listen events from preload/renderer
function ipcMainListener(mainWindow: BrowserWindow) {
  ipcMain.on("electron:quit", () => {
    mainWindowConfigs.isForgeQuit = true;
    app.quit();
  });

  ipcMain.on("electron:minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("electron:maximize", () => {
    mainWindow.maximize();
  });

  ipcMain.on("electron:unmaximize", () => {
    mainWindow.unmaximize();
  });

  ipcMain.on("electron:close", () => {
    mainWindow.close();
  });

  ipcMain.handle("electron:isMaximized", () => {
    return mainWindow.isMaximized();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  const mainWindow = createWindow();
  handleOpenMainWindow(mainWindow);
  ipcMainListener(mainWindow);
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
