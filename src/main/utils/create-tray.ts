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
      label: "Open application",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Open application setting",
      click: () => {
        mainWindow.webContents.send(ELECTRON_EVENTS.openSetting);
      },
    },
    {
      label: "Show application version",
      click: () => {
        mainWindow.webContents.send(ELECTRON_EVENTS.showVersion);
      },
    },
    {
      label: "Open help center",
      click: () => {
        mainWindow.webContents.send(ELECTRON_EVENTS.openHelpCenter);
      },
    },
    {
      label: "Exit application",
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
  tray.setTitle(productName);
  tray.setToolTip(productName);
  tray.setContextMenu(menu);
}
