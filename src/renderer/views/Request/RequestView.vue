<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { PATH_CREATE_REQUEST } from "@/configs/constants/path.const";
import AuthLayout from "@/renderer/components/layouts/AuthLayout/AuthLayout.vue";

const { t } = useI18n();
const router = useRouter();

function handleOpenCreateRequestPage() {
  router.push(PATH_CREATE_REQUEST.path);
}
</script>

<template>
  <AuthLayout>
    <div class="d-flex flex-column align-items-center justify-content-center gap-2 h-100">
      <span class="fs-1 text-secondary">
        <i class="bi bi-filetype-json"></i>
      </span>
      <span class="fs-6 text-secondary user-select-none">
        {{ t("TXT_NO_REQUEST_SELECTED") }}
      </span>
      <div class="d-flex align-items-center justify-content-center gap-2 mt-2">
        <button
          class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
          @click="handleOpenCreateRequestPage"
        >
          <i class="bi bi-plus-lg"></i>
          <span class="fs-6">{{ t("TXT_ADD_REQUEST") }}</span>
        </button>
        <button class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2">
          <i class="bi bi-download"></i>
          <span class="fs-6">{{ t("TXT_IMPORT_REQUEST") }}</span>
        </button>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped lang="scss"></style>
