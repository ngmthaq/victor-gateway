import { BrowserWindow, Menu, Tray } from "electron";
import { getLogo } from "./logo";

export function createWindowTray(mainWindow: BrowserWindow) {
  const logo = getLogo();
  const tray = new Tray(logo);

  tray.setIgnoreDoubleClickEvents(true);

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
          mainWindow.webContents.send("electron:quit");
        },
      },
    ]),
  );

  tray.on("click", () => {
    mainWindow.show();
  });
}
