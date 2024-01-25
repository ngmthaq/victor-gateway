<script setup lang="ts">
import type { Request, Setting } from "@/configs/types/database";
import { ref, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { PATH_LOGIN } from "@/configs/constants/path.const";
import { generateUUID } from "@/renderer/plugins/str.plugin";
import { E2EE } from "@/renderer/plugins/encrypt.plugin";
import { useCircularLoading } from "@/renderer/hooks/common/useCircularLoading";

type RequestNavType = {
  id: number;
  title: string;
  i18n: string;
};

const loading = useCircularLoading();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const setting = ref<Setting | null>(null);

const request = ref<Request>({
  uid: generateUUID(),
  masterKey: E2EE.generateMasterKey(),
  name: "",
  url: "",
  method: "GET",
  headers: {},
  data: {},
  timeout: 0,
  createdAt: 0,
  updatedAt: 0,
});

const requestNavs = ref<RequestNavType[]>([
  {
    id: 1,
    title: "Params",
    i18n: "",
  },
  {
    id: 2,
    title: "FormData",
    i18n: "",
  },
  {
    id: 3,
    title: "Headers",
    i18n: "",
  },
  {
    id: 4,
    title: "",
    i18n: "TXT_SETTING",
  },
]);

onBeforeMount(async () => {
  try {
    if (!route.query.tab) router.replace({ query: { tab: requestNavs.value[0].id } });
    loading.open();
    const accountSetting = await window.electron.db.query<Setting>("SettingRepo", "getSetting");
    setting.value = accountSetting;
  } catch (error) {
    console.error(error);
    window.sessionStorage.clear();
    router.push(PATH_LOGIN.path);
  } finally {
    loading.close();
  }
});
</script>

<template>
  <div class="container-fluid py-3">
    <div class="row">
      <div class="col-6">
        <div class="mb-3 d-flex align-items-end justify-content-start gap-2">
          <div class="header">{{ t("TXT_REQUEST") }}:</div>
          <input
            type="text"
            class="form-control form-control-sm custom-request-name"
            maxlength="32"
            :placeholder="t('TXT_REQUEST_NAME_PLACEHOLDER')"
            v-model="request.name"
          />
        </div>
      </div>
      <div class="col-12">
        <div class="input-group input-group-sm">
          <select class="form-select form-select-sm custom-selection" v-model="request.method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="https://example.com.vn"
            v-model="request.url"
          />
          <button class="btn btn-sm btn-primary save-button">{{ t("TXT_SAVE") }}</button>
          <button
            type="button"
            class="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            v-if="setting && setting.isInternet"
          />
          <ul class="dropdown-menu dropdown-menu-end p-1" v-if="setting && setting.isInternet">
            <li>
              <button class="btn btn-sm btn-outline-secondary w-100">{{ t("TXT_SAVE_AND_FETCH") }}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ul class="nav nav-underline">
          <li class="nav-item" v-for="nav in requestNavs" :key="nav.id">
            <RouterLink
              replace
              class="nav-link custom-nav-link"
              :to="{ query: { tab: nav.id } }"
              :class="{ active: route.query.tab === nav.id.toString() }"
            >
              {{ nav.title || t(nav.i18n) }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  font-size: 14px;
  font-weight: bold;
  color: $secondary;
  flex-shrink: 0;
}

.custom-selection {
  flex: unset !important;
  width: 120px !important;
}

.custom-request-name {
  border: none;
  outline: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
  min-height: unset !important;
  border-radius: 0px;
  border-bottom: 1px solid $secondary;
  font-size: 14px;

  &::placeholder {
    font-size: 14px;
  }
}

.custom-nav-link {
  font-size: 12px;
  cursor: pointer;
  font-weight: 400 !important;
}

.save-button {
  width: 80px;
}
</style>
