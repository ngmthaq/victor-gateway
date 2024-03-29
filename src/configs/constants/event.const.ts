/**
 * Event bus event name constants
 *
 * @see https://hackernoon.com/writing-an-event-bus-for-react
 */
export const EVENT_BUS_EVENTS = {
  openCircularLoading: "eventBus:openCircularLoading",
  appendToast: "eventBus:appendToast",
  changeInternetStatus: "eventBus:changeInternetStatus",
  changeThemeMode: "eventBus:changeThemeMode",
  changeLanguage: "eventBus:changeLanguage",
  pushConsole: "eventBus:pushConsole",
};

/**
 * Custom Electron event name constants
 *
 * @see https://www.electronjs.org/docs/latest/api/ipc-renderer#methods
 */
export const ELECTRON_EVENTS = {
  minimize: "electron:minimize",
  maximize: "electron:maximize",
  unmaximize: "electron:unmaximize",
  close: "electron:close",
  openDevtools: "electron:openDevtools",
  isMaximized: "electron:isMaximized",
  getEnv: "electron:getEnv",
  openSetting: "electron:openSetting",
  showVersion: "electron:showVersion",
  openHelpCenter: "electron:openHelpCenter",
  getLocalStorage: "electron:getLocalStorage",
  setLocalStorage: "electron:setLocalStorage",
  removeLocalStorage: "electron:removeLocalStorage",
  clearLocalStorage: "electron:clearLocalStorage",
  queryRepositories: "electron:queryRepositories",
};
