import { BrowserWindow, Menu, Tray, app, dialog } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
import { productName } from "~/package.json";
import { runtimeConfigs } from "./runtime.service";
import { getLogo } from "./logo.service";

/**
 * Create tray icon and tray menu
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/tray
 * @param {BrowserWindow} mainWindow
 */
export function createWindowTray(mainWindow: BrowserWindow) {
  const logo = getLogo();
  const tray = new Tray(logo);
  const menu = Menu.buildFromTemplate([
    {
      label: productName.trim() + " is running",
      enabled: false,
    },
    { type: "separator" },
    {
      label: "Open " + productName.trim(),
      click: () => {
        mainWindow.show();
      },
    },
    { type: "separator" },
    {
      label: "Open Setting",
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send(ELECTRON_EVENTS.openSetting);
      },
    },
    {
      label: "Go to Help Center",
      enabled: false,
      click: () => {
        mainWindow.webContents.send(ELECTRON_EVENTS.openHelpCenter);
      },
    },
    { type: "separator" },
    {
      label: "About " + productName.trim(),
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send(ELECTRON_EVENTS.showVersion);
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        mainWindow.show();
        dialog
          .showMessageBox(mainWindow, {
            type: "question",
            title: productName,
            message: "Are you sure you want to exit the application?",
            buttons: ["Yes", "No"],
          })
          .then((result) => {
            if (result.response !== 0) return;
            runtimeConfigs.forceQuit = true;
            app.quit();
          });
      },
    },
  ]);

  tray.on("double-click", () => {
    mainWindow.show();
  });

  tray.setIgnoreDoubleClickEvents(true);
  tray.setToolTip(productName);
  tray.setContextMenu(menu);
}
