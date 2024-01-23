<script setup lang="ts">
import type { Setting } from "@/configs/types/database";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { PATH_REQUEST } from "@/configs/constants/path.const";
import { LOCAL_STORAGE_KEYS } from "@/configs/constants/app.const";
import { useCircularLoading } from "@/renderer/hooks/common/useCircularLoading";
import { useNotification } from "@/renderer/hooks/common/useNotification";
import BaseLayout from "@/renderer/components/layouts/BaseLayout/BaseLayout.vue";

// Types
type ErrorMessageType = { username: string; password: string };

// Hooks
const { t } = useI18n();
const { openAppNotification } = useNotification();
const loading = useCircularLoading();
const router = useRouter();

// State
const isShowPassword = ref<boolean>(false);
const username = ref<string>("");
const password = ref<string>("");
const errorMessages = ref<ErrorMessageType>({ username: "", password: "" });

function handleToggleShowPassword() {
  isShowPassword.value = !isShowPassword.value;
}

async function handleSubmit(event: Event) {
  try {
    event.preventDefault();
    if (handleFormValidation()) {
      loading.open();
      const setting = await window.electron.db.query<Setting>("SettingRepo", "getSetting");
      if (setting.username === username.value && setting.password === btoa(password.value)) {
        window.sessionStorage.setItem(LOCAL_STORAGE_KEYS.username, username.value);
        window.sessionStorage.setItem(LOCAL_STORAGE_KEYS.password, btoa(password.value));
        router.replace(PATH_REQUEST.path);
      } else {
        errorMessages.value.username = "";
        errorMessages.value.password = "TXT_WRONG_USERNAME_PASSWORD";
      }
      loading.close();
    }
  } catch (error) {
    console.error(error);
    openAppNotification({ message: "TXT_COMMON_ERROR", variant: "danger" });
    loading.close();
  }
}

function handleFormValidation() {
  let isValidated = true;

  errorMessages.value.username = "";
  errorMessages.value.password = "";

  if (username.value.trim() === "") {
    isValidated = false;
    errorMessages.value.username = "TXT_REQUIRED_FIELD";
  }

  if (password.value.trim() === "") {
    isValidated = false;
    errorMessages.value.password = "TXT_REQUIRED_FIELD";
  } else if (password.value.trim().length < 8) {
    isValidated = false;
    errorMessages.value.password = "TXT_MIN_PASSWORD";
  }

  return isValidated;
}
</script>

<template>
  <BaseLayout>
    <div class="wrapper">
      <form class="form" @submit="handleSubmit">
        <div class="mb-3">
          <h3 class="text-center">{{ t("TXT_LOGIN") }}</h3>
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">{{ t("TXT_USERNAME_LABEL") }}</label>
          <input
            type="text"
            class="form-control"
            id="username"
            maxlength="48"
            :placeholder="t('TXT_USERNAME_PLACEHOLDER')"
            v-model="username"
          />
          <small class="text-danger" v-if="errorMessages.username">{{ t(errorMessages.username) }}</small>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">{{ t("TXT_PASSWORD_LABEL") }}</label>
          <div class="input-group">
            <input
              class="form-control"
              id="password"
              maxlength="48"
              :type="isShowPassword ? 'text' : 'password'"
              :placeholder="t('TXT_PASSWORD_PLACEHOLDER')"
              v-model="password"
            />
            <span class="input-group-text p-0">
              <button type="button" class="btn rounded-0" @click="handleToggleShowPassword">
                <i class="bi bi-eye-slash" v-if="isShowPassword"></i>
                <i class="bi bi-eye-fill" v-else></i>
              </button>
            </span>
          </div>
          <small class="text-danger" v-if="errorMessages.password">{{ t(errorMessages.password) }}</small>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary w-100 text-uppercase">{{ t("TXT_LOGIN") }}</button>
        </div>
      </form>
    </div>
  </BaseLayout>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  & .form {
    min-width: 500px;
    padding: 32px 16px;
    border-radius: 4px;
  }
}
</style>
