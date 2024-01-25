<script setup lang="ts">
import type { RequestCollections } from "@/configs/types/database";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { API_HTTP_STATUS } from "@/configs/constants/api.const";
import { PATH_CREATE_REQUEST } from "@/configs/constants/path.const";
import { convertMillisecondsToFormat } from "@/renderer/plugins/datetime.plugin";

const { t } = useI18n();
const router = useRouter();

const requestCollections = ref<RequestCollections>([]);

function handleOpenCreateRequestPage() {
  router.push(PATH_CREATE_REQUEST.path);
}
</script>

<template>
  <div class="requests h-100">
    <form class="d-flex align-items-center justify-content-center gap-1 custom-form">
      <input
        type="search"
        class="form-control form-control-sm form-control-no-box-shadow"
        :placeholder="t('TXT_SEARCH')"
      />
      <button class="btn btn-sm" type="button" :title="t('TXT_ADD_REQUEST')" @click="handleOpenCreateRequestPage">
        <i class="bi bi-plus-lg"></i>
      </button>
      <button class="btn btn-sm" type="button" :title="t('TXT_IMPORT_REQUEST')">
        <i class="bi bi-download"></i>
      </button>
      <button class="btn btn-sm" type="button" :title="t('TXT_EXPORT_REQUEST')">
        <i class="bi bi-upload"></i>
      </button>
      <button class="btn btn-sm" type="button" :title="t('TXT_REFRESH_REQUEST_LIST')">
        <i class="bi bi-arrow-clockwise"></i>
      </button>
    </form>
    <div v-if="requestCollections.length > 0" class="request-container">
      <div v-for="requestCollection in requestCollections" :key="requestCollection.date">
        <span class="datetime-collection">{{ convertMillisecondsToFormat(requestCollection.date) }}</span>
        <div class="list-group rounded-0 custom-list-group">
          <a
            v-for="request in requestCollection.requests"
            :key="request.uid"
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
      </div>
    </div>
    <div class="no-data" v-else>
      {{ t("TXT_NO_DATA") }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-list-group {
  margin-right: 4px;
}

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

.datetime-collection {
  font-size: 10px;
  color: $secondary;
  user-select: none;
}

.custom-form {
  height: 32px;
}

.request-container {
  margin-top: 4px;
  height: calc(100% - 32px - 4px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px $gray-800;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: $gray-600;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $gray-400;
  }
}
</style>
