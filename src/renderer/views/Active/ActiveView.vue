<script setup lang="ts">
import type { Setting } from "@/configs/types/database";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { PATH_LOGIN } from "@/configs/constants/path.const";
import { E2EE } from "@/renderer/plugins/encrypt.plugin";
import { delay } from "@/renderer/plugins/common.plugin";
import { useNotification } from "@/renderer/hooks/common/useNotification";
import { useCircularLoading } from "@/renderer/hooks/common/useCircularLoading";
import BaseLayout from "@/renderer/components/layouts/BaseLayout/BaseLayout.vue";
import ConfirmDialog from "@/renderer/components/common/ConfirmDialog.vue";

// Types
type ErrorMessageType = { username: string; password: string; passwordConfirmation: string };

// Hooks
const { t } = useI18n();
const { openAppNotification } = useNotification();
const router = useRouter();
const loading = useCircularLoading();

// State
const isOpenConfirmDialog = ref<boolean>(false);
const isCopied = ref<boolean>(false);
const isShowPassword = ref<boolean>(false);
const isShowPasswordConfirmation = ref<boolean>(false);
const isInternetMode = ref<boolean>(false);
const username = ref<string>("");
const password = ref<string>("");
const passwordConfirmation = ref<string>("");
const personalKey = ref<string>(E2EE.generatePersonalKey());
const errorMessages = ref<ErrorMessageType>({ username: "", password: "", passwordConfirmation: "" });

function handleToggleShowPassword() {
  isShowPassword.value = !isShowPassword.value;
}

function handleToggleShowPasswordConfirmation() {
  isShowPasswordConfirmation.value = !isShowPasswordConfirmation.value;
}

function handleCopyPersonalKey() {
  navigator.clipboard.writeText(personalKey.value);
  isCopied.value = true;
}

function handleSubmit(event: Event) {
  event.preventDefault();
  if (handleFormValidation()) {
    isOpenConfirmDialog.value = true;
  }
}

function handleCloseConfirmDialog() {
  isOpenConfirmDialog.value = false;
}

async function handleFinishSetup() {
  try {
    const payload: Setting = {
      username: username.value,
      password: btoa(password.value),
      personalKey: personalKey.value,
      isInternet: isInternetMode.value,
    };
    loading.open();
    await delay(3);
    await window.electron.db.query("SettingRepo", "insertSetting", payload);
    isOpenConfirmDialog.value = false;
    openAppNotification({ message: "TXT_ACTIVATE_SUCCESSFULLY", variant: "success" });
    router.replace(PATH_LOGIN.path);
  } catch (error) {
    console.error(error);
    openAppNotification({ message: "TXT_COMMON_ERROR", variant: "danger" });
  } finally {
    loading.close();
  }
}

function handleFormValidation() {
  let isValidated = true;

  errorMessages.value.username = "";
  errorMessages.value.password = "";
  errorMessages.value.passwordConfirmation = "";

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

  if (password.value !== passwordConfirmation.value) {
    isValidated = false;
    errorMessages.value.passwordConfirmation = "TXT_PASSWORD_CONFIRMATION_NOT_MATCH";
  }

  return isValidated;
}

watch(isCopied, (value) => {
  if (value === true) {
    setTimeout(() => {
      isCopied.value = false;
    }, 5000);
  }
});
</script>

<template>
  <BaseLayout>
    <div class="wrapper">
      <form class="form" @submit="handleSubmit">
        <div class="mb-3">
          <h3 class="text-center">{{ t("TXT_ACTIVATE") }}</h3>
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
          <label for="password" class="form-label">{{ t("TXT_PASSWORD_CONFIRMATION_LABEL") }}</label>
          <div class="input-group">
            <input
              class="form-control"
              id="password"
              maxlength="48"
              :type="isShowPasswordConfirmation ? 'text' : 'password'"
              :placeholder="t('TXT_PASSWORD_CONFIRMATION_LABEL')"
              v-model="passwordConfirmation"
            />
            <span class="input-group-text p-0">
              <button type="button" class="btn rounded-0" @click="handleToggleShowPasswordConfirmation">
                <i class="bi bi-eye-slash" v-if="isShowPasswordConfirmation"></i>
                <i class="bi bi-eye-fill" v-else></i>
              </button>
            </span>
          </div>
          <small class="text-danger" v-if="errorMessages.passwordConfirmation">
            {{ t(errorMessages.passwordConfirmation) }}
          </small>
        </div>
        <div class="mb-3">
          <label for="personal-key" class="form-label">{{ t("TXT_PERSONAL_KEY_LABEL") }}</label>
          <div class="input-group">
            <input disabled class="form-control" id="personal-key" maxlength="48" type="text" :value="personalKey" />
            <span class="input-group-text p-0">
              <button type="button" class="btn rounded-0" @click="handleCopyPersonalKey">
                <i class="bi bi-clipboard-check text-success" v-if="isCopied"></i>
                <i class="bi bi-copy" v-else></i>
              </button>
            </span>
          </div>
          <small class="text-secondary">{{ t("TXT_COPY_PERSONAL_KEY_MSG") }}</small>
        </div>
        <div class="mb-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="internet-mode-checkbox"
              v-model="isInternetMode"
            />
            <label class="form-check-label" for="internet-mode-checkbox">{{ t("TXT_INTERNET_MODE_LABEL") }}</label>
          </div>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary w-100 text-uppercase">{{ t("TXT_CONFIRM") }}</button>
        </div>
      </form>
    </div>
    <ConfirmDialog
      id="peronal-key-copied-confirmation"
      :open="isOpenConfirmDialog"
      :message="t('TXT_COPY_PERSONAL_KEY_MSG')"
      @accept="handleFinishSetup"
      @deny="handleCloseConfirmDialog"
    />
  </BaseLayout>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  & .form {
    min-width: 580px;
    padding: 32px 16px;
    border-radius: 4px;
  }
}
</style>
