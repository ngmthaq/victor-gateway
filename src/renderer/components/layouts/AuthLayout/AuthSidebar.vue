<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { PATH_REQUEST, PATH_ENVIRONMENT, PATH_LOGIN } from "@/configs/constants/path.const";
import { LOCAL_STORAGE_KEYS } from "@/configs/constants/app.const";
import AuthRequest from "./AuthRequest.vue";

type LeftButtonType = {
  path: string;
  title: string;
  icon: string;
  isActive: boolean;
};

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const leftButtons = ref<LeftButtonType[]>([
  {
    path: PATH_REQUEST.path,
    title: "TXT_REQUEST",
    icon: "bi bi-collection",
    isActive: route.path.startsWith(PATH_REQUEST.path),
  },
  {
    path: PATH_ENVIRONMENT.path,
    title: "TXT_ENVIRONMENT",
    icon: "bi bi-box",
    isActive: route.path.startsWith(PATH_ENVIRONMENT.path),
  },
]);

const username = sessionStorage.getItem(LOCAL_STORAGE_KEYS.username);

function handleChangePage(page: string) {
  router.push(page);
}

function handleLogout() {
  window.sessionStorage.clear();
  router.push(PATH_LOGIN.path);
}
</script>

<template>
  <div id="auth-sidebar">
    <div class="auth-sidebar-header">
      <div class="d-flex align-items-center justify-content-start w-75">
        <i class="bi bi-person-circle"></i>
        <span class="d-inline-block ms-2 limit-1-line">{{ username }}</span>
      </div>
      <button class="btn btn-sm" :title="t('TXT_LOGOUT')" @click="handleLogout">
        <i class="bi bi-box-arrow-right"></i>
      </button>
    </div>
    <div class="auth-sidebar-body">
      <div class="auth-sidebar-body-left">
        <button
          v-for="button in leftButtons"
          :key="button.path"
          :class="{ active: button.isActive }"
          @click="() => handleChangePage(button.path)"
          class="btn d-flex flex-column align-items-center justify-content-center"
        >
          <i :class="button.icon"></i>
          <span>{{ t(button.title) }}</span>
        </button>
      </div>
      <div class="auth-sidebar-body-right">
        <AuthRequest />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#auth-sidebar {
  height: 100%;
  width: 400px;
  border-right: 1px solid rgba($color: $gray-500, $alpha: 0.5);

  & .auth-sidebar {
    &-header {
      gap: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px;
      padding-left: 12px;
      border-bottom: 1px solid rgba($color: $gray-500, $alpha: 0.5);
      height: 34px;
      font-size: 14px;
      font-weight: bold;
    }

    &-body {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      height: calc(100% - 34px);

      &-left {
        width: 100px;
        padding: 4px;
        border-right: 1px solid rgba($color: $gray-500, $alpha: 0.5);
        height: 100%;

        & button {
          width: 100%;
          height: 60px;
          border-radius: 4px;
          margin-bottom: 4px;
          transition: all ease-in-out 0.1s;

          &.active {
            background-color: rgba($color: $gray-500, $alpha: 0.25);
            border: none;
          }

          & span {
            font-size: 10px;
            font-weight: bold;
          }
        }
      }

      &-right {
        width: calc(100% - 100px);
        padding: 4px;
      }
    }
  }
}
</style>
