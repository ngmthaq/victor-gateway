<template>
  <section id="request-cookies" class="request-cookies" v-show="isOpen">
    <p>{{ t("TXT_REQUEST_COOKIES_CONTENT") }}</p>
    <button type="button" class="btn btn-light" @click="handleClick">{{ t("TXT_UNDERSTAND") }}</button>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { COOKIES_STORAGE_KEYS } from "@/configs/constants/app.const";
import { getCookieStorage, setCookieStorage } from "@/plugins/storage.plugin";

const { t } = useI18n();
const COOKIE_PERMISSION_KEY = COOKIES_STORAGE_KEYS.cookiesPermission;
const isOpen = ref<boolean>(Boolean(getCookieStorage(COOKIE_PERMISSION_KEY)) === false);

const handleClick = () => {
  isOpen.value = false;
  setCookieStorage(COOKIE_PERMISSION_KEY, true);
};
</script>

<style scoped lang="scss">
.request-cookies {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: $dark;
  padding: 8px 16px;

  & p {
    color: $light;
    padding-right: 64px;
    margin: 0;
  }

  & button {
    flex-shrink: 0;
  }
}
</style>
