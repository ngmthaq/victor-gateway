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
  theme: "theme",
  language: "language",
  accessToken: "accessToken",
  notificationPermission: "notificationPermission",
};

/**
 * Element size constants
 */
export const ELEMENT_SIZES = {
  titleBarHeight: 40,
};
