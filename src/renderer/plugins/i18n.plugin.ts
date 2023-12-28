import type { Locale } from "vue-i18n";
import { createI18n } from "vue-i18n";
import { LANGUAGE_CONFIGS, LOCAL_STORAGE_KEYS } from "@/configs/constants/app.const";
import vi from "@/configs/languages/vi.json";
import en from "@/configs/languages/en.json";
import { getLocalStorage } from "./storage.plugin";

/**
 * I18n configurations
 */
export const i18n = createI18n({
  legacy: false,
  locale: LANGUAGE_CONFIGS.defaultLanguage,
  messages: { vi, en },
});

/**
 * Get current language
 */
(async () => {
  const currentLanguage = await getLocalStorage<Locale>(LOCAL_STORAGE_KEYS.language);
  const language: any = currentLanguage || LANGUAGE_CONFIGS.defaultLanguage;
  document.querySelector("html").setAttribute("lang", language);
  i18n.global.locale.value = language;
})();
