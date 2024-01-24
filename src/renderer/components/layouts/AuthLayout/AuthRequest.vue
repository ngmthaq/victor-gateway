<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const requests = ref<string[]>(["Request 1", "Request 2", "Request 3"]);
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
        :title="request"
        class="custom-group-item py-1 px-2 list-group-item list-group-item-action limit-1-line"
      >
        {{ request }}
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
