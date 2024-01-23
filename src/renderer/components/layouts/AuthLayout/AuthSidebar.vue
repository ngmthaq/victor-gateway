<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PATH_REQUEST, PATH_ENVIRONMENT } from "@/configs/constants/path.const";

type LeftButtonType = {
  path: string;
  title: string;
  icon: string;
  isActive: boolean;
};

const route = useRoute();
const router = useRouter();

const leftButtons = ref<LeftButtonType[]>([
  {
    path: PATH_REQUEST.path,
    title: "Request",
    icon: "bi bi-collection",
    isActive: route.path === PATH_REQUEST.path,
  },
  {
    path: PATH_ENVIRONMENT.path,
    title: "Environment",
    icon: "bi bi-box",
    isActive: route.path === PATH_ENVIRONMENT.path,
  },
]);

function handleChangePage(page: string) {
  router.push(page);
}
</script>

<template>
  <div id="auth-sidebar">
    <div class="auth-sidebar-header">
      <i class="bi bi-person-circle"></i>
      <span>thangnm</span>
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
          <span>{{ button.title }}</span>
        </button>
      </div>
      <div class="auth-sidebar-body-right"></div>
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
      padding: 4px;
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
        width: 80px;
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
        width: calc(100% - 80px);
        padding: 4px;
      }
    }
  }
}
</style>
