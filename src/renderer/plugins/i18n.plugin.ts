import type { Locale } from "vue-i18n";
import { createI18n } from "vue-i18n";
import { LANGUAGE_CONFIGS, LOCAL_STORAGE_KEYS } from "@/configs/constants/app.const";
import vi from "@/configs/languages/vi.json";
import en from "@/configs/languages/en.json";
import { getLocalStorage } from "./storage.plugin";

/**
 * Current language
 */
const language = getLocalStorage<Locale>(LOCAL_STORAGE_KEYS.language) || LANGUAGE_CONFIGS.defaultLanguage;
document.querySelector("html").setAttribute("lang", language);

/**
 * I18n configurations
 */
export const i18n = createI18n({
  legacy: false,
  locale: language,
  fallbackLocale: LANGUAGE_CONFIGS.defaultLanguage,
  messages: { vi, en },
});
