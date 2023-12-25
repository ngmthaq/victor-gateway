<script setup lang="ts">
import { Modal } from "bootstrap";
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { LANGUAGE_CONFIGS, COOKIES_STORAGE_KEYS } from "@/configs/constants/app.const";
import { SYSTEM_THEME_MODE_TYPE } from "@/configs/types/components";
import { getCookieStorage, setCookieStorage } from "@/renderer/plugins/storage.plugin";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const { t, locale } = useI18n();
const ID = "titlebar-setting-dialog";
const modal = ref<Modal | null>(null);
const language = ref<string>(locale.value);
const theme = ref<SYSTEM_THEME_MODE_TYPE>(getCookieStorage(COOKIES_STORAGE_KEYS.theme) || "dark");

function handleClose() {
  language.value = locale.value;
  theme.value = getCookieStorage(COOKIES_STORAGE_KEYS.theme) || "dark";
  emit("close");
}

function handleToggleOpenModal(open: boolean) {
  if (modal.value) {
    if (open) {
      modal.value.show();
    } else {
      modal.value.hide();
    }
  }
}

function handleSubmit() {
  setCookieStorage(COOKIES_STORAGE_KEYS.language, language.value);
  setCookieStorage(COOKIES_STORAGE_KEYS.theme, theme.value);
  locale.value = language.value;
  document.getElementById("body").setAttribute("data-bs-theme", theme.value);
}

watch(
  () => props.open,
  (value) => handleToggleOpenModal(value),
);

onMounted(() => {
  modal.value = new Modal(document.getElementById(ID));
  document.getElementById(ID).addEventListener("hidden.bs.modal", handleClose);
});

onBeforeUnmount(() => {
  document.getElementById(ID).removeEventListener("hidden.bs.modal", handleClose);
});
</script>

<template>
  <section :id="ID" class="modal modal-titlebar" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content rounded-1 shadow">
        <div class="modal-body p-4">
          <h5 class="mb-4 text-center">{{ t("TXT_SYSTEM_SETTING") }}</h5>
          <div class="mb-4">
            <label for="system-language" class="form-label">{{ t("TXT_SYSTEM_LANGUAGE") }}:</label>
            <select class="form-select rounded-1" v-model="language">
              <option
                v-for="lang in LANGUAGE_CONFIGS.availableLanguages"
                :key="lang.code"
                :value="lang.code"
                :selected="lang.code === language"
              >
                {{ lang.title }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="system-theme-mode" class="form-label">{{ t("TXT_SYSTEM_THEME") }}:</label>
            <div class="d-flex align-items-center justify-content-between gap-4">
              <div class="form-check w-100 p-0">
                <input
                  v-model="theme"
                  :checked="theme === 'dark'"
                  class="form-check-input d-none system-theme-mode-radio"
                  type="radio"
                  name="system-theme-mode"
                  id="system-theme-mode-dark"
                  value="dark"
                />
                <label class="custom-form-check-label dark" for="system-theme-mode-dark">
                  {{ t("TXT_SYSTEM_THEME_DARK") }}
                </label>
              </div>
              <div class="form-check w-100 p-0">
                <input
                  v-model="theme"
                  :checked="theme === 'light'"
                  class="form-check-input d-none system-theme-mode-radio"
                  type="radio"
                  name="system-theme-mode"
                  id="system-theme-mode-light"
                  value="light"
                />
                <label class="custom-form-check-label light" for="system-theme-mode-light">
                  {{ t("TXT_SYSTEM_THEME_LIGHT") }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <button
            type="button"
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
            @click="handleSubmit"
          >
            <strong>{{ t("TXT_SAVE_SETTING") }}</strong>
          </button>
          <button
            type="button"
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0"
            data-bs-dismiss="modal"
          >
            {{ t("TXT_CLOSE") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
input.system-theme-mode-radio:checked ~ .custom-form-check-label {
  border: 4px solid $primary;
}

.custom-form-check-label {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100px;
  border: 1px solid grey;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;

  &.dark {
    background-color: $gray-900;
    color: $gray-100;
  }

  &.light {
    background-color: $light;
    color: $gray-900;
  }
}
</style>
