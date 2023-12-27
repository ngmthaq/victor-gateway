import { BrowserWindow, Menu, Tray, app, dialog } from "electron";
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

  tray.on("click", () => {
    mainWindow.show();
  });

  tray.setIgnoreDoubleClickEvents(true);
  tray.setTitle(productName);
  tray.setToolTip(productName);
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
    ]),
  );
}
