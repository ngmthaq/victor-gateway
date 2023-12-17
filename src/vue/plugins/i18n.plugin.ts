import type { Locale } from "vue-i18n";
import { createI18n } from "vue-i18n";
import { LANGUAGE_CONFIGS, COOKIES_STORAGE_KEYS } from "@/configs/constants/app.const";
import vi from "@/configs/languages/vi.json";
import { getCookieStorage } from "./storage.plugin";

const language = getCookieStorage<Locale>(COOKIES_STORAGE_KEYS.language) || LANGUAGE_CONFIGS.defaultLanguage;

export const i18n = createI18n({
  legacy: false,
  locale: language,
  fallbackLocale: LANGUAGE_CONFIGS.defaultLanguage,
  messages: { vi },
});
