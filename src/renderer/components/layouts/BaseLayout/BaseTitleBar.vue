<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { ELEMENT_SIZES } from "@/configs/constants/app.const";
import { productName } from "~/package.json";
import { ELECTRON_EVENTS } from "@/configs/constants/event.const";

const emit = defineEmits<{
  (event: "clickSetting"): void;
  (event: "clickVersion"): void;
  (event: "closeAll"): void;
}>();

const { t } = useI18n();

const IS_DEV = window.electron.env.mode() === "development";
const IS_MAC = window.electron.platform === "darwin";
const isAtMaxWidth = screen.availWidth - window.innerWidth === 0;
const screenPixelRatio = (window.outerWidth - 8) / window.innerWidth;
const isAtDefaultZoom = screenPixelRatio > 0.92 && screenPixelRatio <= 1.1;

const isMaximized = ref<boolean>(isAtMaxWidth && isAtDefaultZoom);

function handleOpenDevtools() {
  window.electron.frame.openDevtools();
}

function handleClickSetting() {
  emit("clickSetting");
}

async function handleClickHelp() {
  emit("closeAll");
  console.log("Go to help center page");
}

function handleMinimize() {
  window.electron.frame.minimize();
}

function handleMaximize() {
  window.electron.frame.maximize();
  handleWindowResize();
}

function handleUnmaximize() {
  window.electron.frame.unmaximize();
  handleWindowResize();
}

function handleClose() {
  window.electron.frame.close();
}

function handleWindowResize() {
  const isAtMaxWidth = screen.availWidth - window.innerWidth === 0;
  const screenPixelRatio = (window.outerWidth - 8) / window.innerWidth;
  const isAtDefaultZoom = screenPixelRatio > 0.92 && screenPixelRatio <= 1.1;
  isMaximized.value = isAtMaxWidth && isAtDefaultZoom;
}

function handleConfirmClose() {
  window.electron.frame.close();
}

function handleReload() {
  window.location.reload();
}

function handleHistoryBack() {
  window.history.back();
  emit("closeAll");
}

function handleHistoryForward() {
  window.history.forward();
  emit("closeAll");
}

function handleClickVersion() {
  emit("clickVersion");
}

onMounted(() => {
  window.addEventListener("resize", handleWindowResize);
  window.electron.addEventListener(ELECTRON_EVENTS.openHelpCenter, handleClickHelp);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleWindowResize);
  window.electron.removeEventListener(ELECTRON_EVENTS.openHelpCenter, handleClickHelp);
});
</script>

<template>
  <section
    id="custom-window-title-bar"
    :style="{ height: `${ELEMENT_SIZES.titleBarHeight}px`, flexDirection: IS_MAC ? 'row-reverse' : 'row' }"
  >
    <div class="title-bar">
      {{ productName }}
    </div>
    <div class="left-bar">
      <div class="logo" v-if="!IS_MAC">
        <img src="@/assets/img/titlebar-icon.png" alt="title-bar-logo" />
      </div>
      <div class="menu" :style="{ marginRight: IS_MAC ? '10px' : '0px' }">
        <div class="menu-item" @click="handleClickSetting">
          <span>{{ t("TXT_SETTING") }}</span>
        </div>
        <div class="menu-item" @click="handleClickVersion">
          <span>{{ t("TXT_VERSIONS") }}</span>
        </div>
        <div class="menu-item dropdown">
          <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            {{ t("TXT_HISTORY") }}
          </span>
          <ul class="dropdown-menu custom-dropdown-menu">
            <li class="dropdown-item custom-dropdown-item" @click="handleHistoryForward">
              {{ t("TXT_HISTORY_FORWARD") }}
            </li>
            <li class="dropdown-item custom-dropdown-item" @click="handleHistoryBack">
              {{ t("TXT_HISTORY_BACK") }}
            </li>
          </ul>
        </div>
        <div class="menu-item dropdown">
          <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            {{ t("TXT_VIEW") }}
          </span>
          <ul class="dropdown-menu custom-dropdown-menu">
            <li class="dropdown-item custom-dropdown-item" @click="handleOpenDevtools" v-if="IS_DEV">
              {{ t("TXT_OPEN_DEVTOOLS") }}
            </li>
            <li class="dropdown-item custom-dropdown-item" @click="handleReload">
              {{ t("TXT_RELOAD") }}
            </li>
            <li class="dropdown-item custom-dropdown-item" @click="handleMinimize">
              {{ t("TXT_MINIMIZE") }}
            </li>
            <li class="dropdown-item custom-dropdown-item" @click="handleConfirmClose">
              {{ t("TXT_EXIT") }}
            </li>
          </ul>
        </div>
        <div class="menu-item disabled" @click="handleClickHelp">
          <span>{{ t("TXT_HELP") }}</span>
        </div>
      </div>
    </div>
    <div class="middle-bar"></div>
    <div class="right-bar" v-if="!IS_MAC">
      <div :title="t('TXT_MINIMIZE')" class="action-button minimize" @click="handleMinimize">
        <i class="bi bi-dash-lg"></i>
      </div>
      <div :title="t('TXT_UNMAXIMIZE')" class="action-button unmaximize" v-if="isMaximized" @click="handleUnmaximize">
        <i class="bi bi-copy"></i>
      </div>
      <div :title="t('TXT_MAXIMIZE')" class="action-button maximize" v-else @click="handleMaximize">
        <i class="bi bi-square"></i>
      </div>
      <div :title="t('TXT_CLOSE')" class="action-button close" @click="handleClose">
        <i class="bi bi-x-lg"></i>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
#custom-window-title-bar {
  width: 100%;
  background-color: $black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $zindex-common-titlebar;

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

    & .custom-dropdown-menu {
      padding: 0;
      border-radius: 2px;
      min-width: 120px;

      & .custom-dropdown-item {
        font-size: 12px;
        padding: 4px 8px;
      }
    }

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
        border-radius: 4px;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;

        &.disabled {
          cursor: not-allowed;
          background-color: transparent !important;
          opacity: 0.6;
        }

        & span {
          display: inline-block;
          padding: 4px 8px;
        }

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
      }

      &.unmaximize {
        font-size: 10px;
        position: relative;
        transform: rotate(180deg);
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
