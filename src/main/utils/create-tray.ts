import { BrowserWindow, Menu, Tray, app, dialog } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
import { productName } from "~/package.json";
import { runtimeConfigs } from "./runtime-configs";
import { getLogo } from "./get-logo";

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
      label: "Open",
      click: () => {
        mainWindow.show();
      },
    },
    { type: "separator" },
    {
      label: "Setting",
      click: () => {
        mainWindow.webContents.send(ELECTRON_EVENTS.openSetting);
      },
    },
    {
      label: "Help Center",
      click: () => {
        mainWindow.webContents.send(ELECTRON_EVENTS.openHelpCenter);
      },
    },
    { type: "separator" },
    {
      label: "Version",
      click: () => {
        mainWindow.webContents.send(ELECTRON_EVENTS.showVersion);
      },
    },
    { type: "separator" },
    {
      label: "Exit",
      click: () => {
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

  tray.on("click", () => {
    mainWindow.show();
  });

  tray.setIgnoreDoubleClickEvents(true);
  tray.setToolTip(productName);
  tray.setContextMenu(menu);
}
