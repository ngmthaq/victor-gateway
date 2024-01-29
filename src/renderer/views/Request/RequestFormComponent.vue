<script setup lang="ts">
import type { Request, Setting } from "@/configs/types/database";
import { ref, onBeforeMount } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { useI18n } from "vue-i18n";
import lodash from "lodash";
import { PATH_LOGIN } from "@/configs/constants/path.const";
import { generateUUID, convertSearchParamStringToArray } from "@/renderer/plugins/str.plugin";
import { E2EE } from "@/renderer/plugins/encrypt.plugin";
import { getCurrentMilliseconds } from "@/renderer/plugins/datetime.plugin";
import { useCircularLoading } from "@/renderer/hooks/common/useCircularLoading";
import ConfirmDialog from "@/renderer/components/common/ConfirmDialog.vue";
import RequestParamTableComponent from "./RequestParamTableComponent.vue";
import RequestFormDataTableComponent from "./RequestFormDataTableComponent.vue";
import RequestHeaderTableComponent from "./RequestHeaderTableComponent.vue";
import RequestSettingTableComponent from "./RequestSettingTableComponent.vue";
import { convertSearchParamArrayToString } from "../../plugins/str.plugin";

type RequestNavType = {
  id: number;
  title: string;
  i18n: string;
};

const props = defineProps<{
  requestData?: Request;
}>();

const emits = defineEmits<{
  (event: "save", request: Request): void;
  (event: "fetch", request: Request): void;
}>();

const loading = useCircularLoading();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const nextRoute = ref<string | null>(null);
const setting = ref<Setting | null>(null);

const originalRequest = ref<Request>({
  uid: props.requestData?.uid || generateUUID(),
  masterKey: props.requestData?.masterKey || E2EE.generateMasterKey(),
  name: props.requestData?.name || "",
  url: props.requestData?.url || "",
  method: props.requestData?.method || "GET",
  headers: props.requestData?.headers || {},
  data: props.requestData?.data || {},
  timeout: props.requestData?.timeout || 30000,
  createdAt: props.requestData?.createdAt || 0,
  updatedAt: props.requestData?.updatedAt || 0,
});

const request = ref<Request>(lodash.cloneDeep(originalRequest.value));

const requestNavs = ref<RequestNavType[]>([
  { id: 1, title: "Params", i18n: "" },
  { id: 2, title: "FormData", i18n: "" },
  { id: 3, title: "Headers", i18n: "" },
  { id: 4, title: "", i18n: "TXT_SETTING" },
]);

function handleNextRoute() {
  request.value = lodash.cloneDeep(originalRequest.value);
  router.push(nextRoute.value);
  nextRoute.value = null;
}

function handleStayRoute() {
  nextRoute.value = null;
}

function handleUpdateTimestamp() {
  request.value.createdAt = getCurrentMilliseconds();
  request.value.updatedAt = getCurrentMilliseconds();
}

function handleSave() {
  handleUpdateTimestamp();
  emits("save", request.value);
}

function handleFetch() {
  handleUpdateTimestamp();
  emits("fetch", request.value);
}

function handleAddParams(param: { key: string; value: string }) {
  const [url, searchParams] = request.value.url.split("?");
  const params = convertSearchParamStringToArray(searchParams);
  params.push(param);
  request.value.url = url + "?" + convertSearchParamArrayToString(params);
}

onBeforeRouteLeave((to, from, next) => {
  if (lodash.isEqual(originalRequest.value, request.value)) {
    next();
  } else {
    nextRoute.value = to.path;
  }
});

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
          <button class="btn btn-sm btn-primary save-button" @click="handleSave">{{ t("TXT_SAVE") }}</button>
          <button
            type="button"
            class="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            v-if="setting && setting.isInternet"
          />
          <ul class="dropdown-menu dropdown-menu-end p-1" v-if="setting && setting.isInternet">
            <li>
              <button class="btn btn-sm btn-outline-secondary w-100" @click="handleFetch">
                {{ t("TXT_SAVE_AND_FETCH") }}
              </button>
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
    <div class="row">
      <div class="col-12 py-2" v-show="route.query.tab === requestNavs[0].id.toString()">
        <RequestParamTableComponent :url="request.url" @add="handleAddParams" />
      </div>
      <div class="col-12 py-2" v-show="route.query.tab === requestNavs[1].id.toString()">
        <RequestFormDataTableComponent />
      </div>
      <div class="col-12 py-2" v-show="route.query.tab === requestNavs[2].id.toString()">
        <RequestHeaderTableComponent />
      </div>
      <div class="col-12 py-2" v-show="route.query.tab === requestNavs[3].id.toString()">
        <RequestSettingTableComponent />
      </div>
    </div>
    <ConfirmDialog
      id="confirm-before-leave-request-form"
      :open="Boolean(nextRoute)"
      :message="t('TXT_CONFIRM_BEFORE_ROUTE_LEAVE')"
      @accept="handleNextRoute"
      @deny="handleStayRoute"
    />
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
