import { BrowserWindow, Menu, Tray } from "electron";
import pkg from "~/package.json";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
import { getLogo } from "./logo";

/**
 * Create tray icon and tray menu
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/tray
 * @param {BrowserWindow} mainWindow
 */
export function createWindowTray(mainWindow: BrowserWindow) {
  const logo = getLogo();
  const tray = new Tray(logo);

  tray.on("click", () => {
    mainWindow.show();
  });

  tray.setIgnoreDoubleClickEvents(true);
  tray.setTitle(pkg.productName);
  tray.setToolTip(pkg.productName);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Open Application",
        click: () => {
          mainWindow.show();
        },
      },
      {
        label: "Exit Application",
        click: () => {
          mainWindow.webContents.send(ELECTRON_EVENTS.quit);
        },
      },
    ]),
  );
}
