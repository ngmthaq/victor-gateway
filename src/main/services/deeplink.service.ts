import path from "node:path";
import { app } from "electron";
import { name } from "~/package.json";
import { runtimeConfigs } from "./runtime.service";

/**
 * Update protocol to handle deeplink
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app#main-process-mainjs
 * @returns {void}
 */
export function handleProtocol(): void {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(name, process.execPath, [path.resolve(process.argv[1])]);
    }
  } else {
    app.setAsDefaultProtocolClient(name);
  }
}

/**
 * Someone tried to run a second instance, we should focus our window.
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app#windows-and-linux-code
 * @returns {void}
 */
export function handleMainWindowInstance(): void {
  const isGetLockKey = app.requestSingleInstanceLock();
  if (!isGetLockKey) {
    app.quit();
  } else {
    app.on("second-instance", () => {
      if (runtimeConfigs.mainWindow) {
        if (runtimeConfigs.mainWindow.isMinimized()) runtimeConfigs.mainWindow.restore();
        if (!runtimeConfigs.mainWindow.isVisible()) runtimeConfigs.mainWindow.show();
        runtimeConfigs.mainWindow.focus();
      }
    });
  }
}
