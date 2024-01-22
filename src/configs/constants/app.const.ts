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
 * @see https://github.com/sindresorhus/electron-store?tab=readme-ov-file#electron-store
 */
export const LOCAL_STORAGE_KEYS = {
  theme: "theme",
  language: "language",
  notificationPermission: "notificationPermission",
  username: "username",
  password: "password",
};

/**
 * Element size constants
 */
export const ELEMENT_SIZES = {
  titleBarHeight: 40,
};
