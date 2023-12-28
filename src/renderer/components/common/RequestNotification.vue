<script lang="ts" setup>
import type { NotificationPermissionType } from "@/configs/types/components";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Modal } from "bootstrap";
import { LOCAL_STORAGE_KEYS } from "@/configs/constants/app.const";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/renderer/plugins/storage.plugin";

const { t } = useI18n();

const ID = "request-notification";
const NOTIFICATION_PERMISSION_KEY = LOCAL_STORAGE_KEYS.notificationPermission;
const RECHECK_PERMISSION_TIME = 14 * 24 * 60 * 60 * 1000; // 14 days (milliseconds)

const modal = ref<Modal | null>(null);

async function handleAccept() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    handleSetPermission(true);
  } else {
    handleDeny();
  }
}

function handleDeny() {
  handleSetPermission(false);
}

function handleSetPermission(granted: boolean) {
  const newNotificationPermission: NotificationPermissionType = {
    time: Date.now(),
    granted: granted,
  };
  setLocalStorage(NOTIFICATION_PERMISSION_KEY, newNotificationPermission);
}

onMounted(() => {
  if ("Notification" in window) {
    modal.value = new Modal("#" + ID, { keyboard: false, backdrop: "static" });
    const permission = getLocalStorage<NotificationPermissionType>(NOTIFICATION_PERMISSION_KEY);
    if (permission) {
      if (Date.now() - permission.time > RECHECK_PERMISSION_TIME) {
        if (Notification.permission === "granted") {
          handleSetPermission(true);
        } else if (Notification.permission === "default") {
          removeLocalStorage(NOTIFICATION_PERMISSION_KEY);
          modal.value.show();
        }
      }
    } else {
      if (Notification.permission === "granted") {
        handleSetPermission(true);
      } else if (Notification.permission === "default") {
        modal.value.show();
      }
    }
  }
});
</script>

<template>
  <section :id="ID" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex align-items-center justify-content-start">
            <div>
              <img alt="logo" src="@/assets/img/icon.png" style="width: 40px; height: auto; margin: 0 24px 0 8px" />
            </div>
            <div>
              <h4>{{ t("TXT_REQUEST_NOTIFICATION_TITLE") }}</h4>
              <p class="m-0">{{ t("TXT_REQUEST_NOTIFICATION_CONTENT") }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer p-1">
          <div class="d-flex align-items-center justify-content-between gap-2 w-100">
            <button type="button" class="btn btn-secondary w-100" data-bs-dismiss="modal" @click="handleDeny">
              {{ t("TXT_LATER") }}
            </button>
            <button type="button" class="btn btn-primary w-100" data-bs-dismiss="modal" @click="handleAccept">
              {{ t("TXT_ACCEPT") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
