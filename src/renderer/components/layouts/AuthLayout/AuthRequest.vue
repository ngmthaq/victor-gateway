<script setup lang="ts">
import { API_HTTP_STATUS } from "@/configs/constants/api.const";
import type { RequestWithResponse } from "@/configs/types/database";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const requests = ref<RequestWithResponse[]>([]);
</script>

<template>
  <div class="requests">
    <form class="d-flex align-items-center justify-content-center gap-1">
      <input
        type="text"
        class="form-control form-control-sm form-control-no-box-shadow"
        :placeholder="t('TXT_SEARCH')"
      />
      <button class="btn btn-sm" type="button" :title="t('TXT_ADD_REQUEST')">
        <i class="bi bi-plus-lg"></i>
      </button>
      <button class="btn btn-sm" type="button" :title="t('TXT_IMPORT_REQUEST')">
        <i class="bi bi-download"></i>
      </button>
      <button class="btn btn-sm" type="button" :title="t('TXT_EXPORT_REQUEST')">
        <i class="bi bi-upload"></i>
      </button>
    </form>
    <div class="list-group pt-2 rounded-0" v-if="requests.length > 0">
      <a
        v-for="(request, index) in requests"
        :key="index"
        :title="request.name"
        class="py-1 px-2 list-group-item list-group-item-action custom-group-item"
      >
        <span class="text-success" v-if="request.response && request.response.status === API_HTTP_STATUS.OK">
          <i class="bi bi-check-circle"></i>
        </span>
        <span class="text-danger" v-else-if="request.response && request.response.status !== API_HTTP_STATUS.OK">
          <i class="bi bi-exclamation-circle"></i>
        </span>
        <span class="text-primary" v-else>
          <i class="bi bi-arrow-repeat"></i>
        </span>
        <span class="limit-1-line">{{ request.name }}</span>
      </a>
    </div>
    <div class="no-data" v-else>
      {{ t("TXT_NO_DATA") }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-group-item {
  font-size: 12px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  cursor: pointer;
}

.no-data {
  font-size: 12px;
  user-select: none;
  text-align: center;
  margin-top: 16px;
  width: 100%;
}
</style>
