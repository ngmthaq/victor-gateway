import { BrowserWindow, Menu, Tray } from "electron";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";
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
          mainWindow.webContents.send(ELECTRON_EVENTS.quit);
        },
      },
    ]),
  );

  tray.on("click", () => {
    mainWindow.show();
  });
}
