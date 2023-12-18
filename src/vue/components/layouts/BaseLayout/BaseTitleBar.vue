<script setup lang="ts">
import type { TitleBarMenuType } from "@/configs/types/components";
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { ELEMENT_SIZES } from "@/configs/constants/app.const";
import pkg from "~/package.json";

const emit = defineEmits<{
  (event: "clickSetting"): void;
  (event: "clickHelp"): void;
}>();

const { t } = useI18n();
const IS_DEV = window.electron.env.mode() === "development";
const OPEN_DEVTOOLS = 1;
const SETTING = 2;
const HELP = 3;
const EXIT = 4;

const handleClickMenuItem = (id: number) => {
  if (id === OPEN_DEVTOOLS) {
    window.electron.frame.openDevtools();
  } else if (id === SETTING) {
    emit("clickSetting");
  } else if (id === HELP) {
    emit("clickHelp");
  } else if (id === EXIT && confirm(t("TXT_ACCEPT_QUIT_APP"))) {
    window.electron.frame.close();
  }
};

const isAtMaxWidth = screen.availWidth - window.innerWidth === 0;
const screenPixelRatio = (window.outerWidth - 8) / window.innerWidth;
const isAtDefaultZoom = screenPixelRatio > 0.92 && screenPixelRatio <= 1.1;
const isMaximized = ref<boolean>(isAtMaxWidth && isAtDefaultZoom);

const menu = ref<TitleBarMenuType[]>([
  { id: OPEN_DEVTOOLS, onlyDev: true, title: "Devtools", handleClick: handleClickMenuItem },
  { id: SETTING, onlyDev: false, title: t("TXT_SETTING"), handleClick: handleClickMenuItem },
  { id: HELP, onlyDev: false, title: t("TXT_HELP"), handleClick: handleClickMenuItem },
  { id: EXIT, onlyDev: false, title: t("TXT_EXIT"), handleClick: handleClickMenuItem },
]);

const handleMinimize = () => {
  window.electron.frame.minimize();
};

const handleMaximize = () => {
  window.electron.frame.maximize();
  isMaximized.value = true;
};

const handleUnmaximize = () => {
  window.electron.frame.unmaximize();
  isMaximized.value = false;
};

const handleClose = () => {
  window.electron.frame.close();
};

const handleWindowResize = () => {
  const isAtMaxWidth = screen.availWidth - window.innerWidth === 0;
  const screenPixelRatio = (window.outerWidth - 8) / window.innerWidth;
  const isAtDefaultZoom = screenPixelRatio > 0.92 && screenPixelRatio <= 1.1;
  isMaximized.value = isAtMaxWidth && isAtDefaultZoom;
};

onMounted(() => {
  window.addEventListener("resize", handleWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleWindowResize);
});
</script>

<template>
  <section id="custom-window-title-bar" :style="{ height: `${ELEMENT_SIZES.titleBarHeight}px` }">
    <div class="title-bar">
      {{ pkg.productName }}
    </div>
    <div class="left-bar">
      <div class="logo">
        <img src="@/assets/img/icon.png" alt="title-bar-logo" />
      </div>
      <div class="menu">
        <template v-for="item in menu" :key="item.id">
          <div
            class="menu-item"
            v-if="!item.onlyDev || (item.onlyDev && IS_DEV)"
            @click="() => item.handleClick(item.id)"
          >
            {{ item.title }}
          </div>
        </template>
      </div>
    </div>
    <div class="middle-bar"></div>
    <div class="right-bar">
      <div class="action-button minimize" @click="handleMinimize">
        <i class="bi bi-dash-lg"></i>
      </div>
      <div class="action-button maximize unmaximize" v-if="isMaximized" @click="handleUnmaximize">
        <span><i class="bi bi-square"></i></span>
        <span><i class="bi bi-square-fill"></i></span>
      </div>
      <div class="action-button maximize" v-else @click="handleMaximize">
        <i class="bi bi-square"></i>
      </div>
      <div class="action-button close" @click="handleClose">
        <i class="bi bi-x-lg"></i>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
#custom-window-title-bar {
  width: 100%;
  background-color: $gray-900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $z-index-common-titlebar;

  & .title-bar {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: $gray-400;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
  }

  & .left-bar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    gap: 8px;

    & .logo {
      height: 100%;
      width: auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 8px;

      & img {
        height: 60%;
        width: auto;
        object-fit: contain;
        user-select: auto;
        pointer-events: none;
      }
    }

    & .menu {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 2px;

      & .menu-item {
        color: $gray-500;
        font-size: 12px;
        cursor: pointer;
        background-color: transparent;
        padding: 4px 8px;
        border-radius: 4px;
        user-select: none;
        min-width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: $gray-400;
          background-color: rgba($color: #fff, $alpha: 0.2);
        }
      }
    }
  }

  & .middle-bar {
    display: flex;
    width: 100%;
    color: $gray-400;
    font-size: 14px;
    user-select: none;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: transparent;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }

  & .right-bar {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
    height: inherit;
    gap: 2px;

    & .action-button {
      color: $gray-400;
      user-select: none;
      height: inherit;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        background-color: rgba($color: #fff, $alpha: 0.2);
      }

      &.minimize {
        font-size: 14px;
      }

      &.maximize {
        font-size: 10px;
        position: relative;

        &.unmaximize {
          font-size: 8px;
        }

        & span {
          position: absolute;

          &:first-child {
            transform: translate(2px, -2px);
          }
        }
      }

      &.close {
        font-size: 14px;

        &:hover {
          background-color: rgba($color: red, $alpha: 0.8);
        }
      }
    }
  }
}
</style>
