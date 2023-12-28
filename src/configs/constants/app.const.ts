/**
 * Language configurations
 *
 * @see https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
 */
export const LANGUAGE_CONFIGS = {
  defaultLanguage: "vi",
  availableLanguages: [
    { code: "vi", title: "Tiếng Việt" },
    { code: "en", title: "English" },
  ],
};

/**
 * LocalStorage Key Constants
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
export const LOCAL_STORAGE_KEYS = {
  accessToken: "local:accessToken",
  language: "cookies:language",
  notificationPermission: "cookies:notificationPermission",
  theme: "cookies:theme",
};

/**
 * SessionStorage Key Constants
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 */
export const SESSION_STORAGE_KEYS = {
  accessToken: "session:accessToken",
};

/**
 * Element size constants
 */
export const ELEMENT_SIZES = {
  titleBarHeight: 40,
};
