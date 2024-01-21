<script setup lang="ts">
import type { Todo } from "@/renderer/services/models/todo.model";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { PATH_ACTIVE } from "@/configs/constants/path.const";
import { onChangeInternetStatus } from "@/renderer/plugins/navigator.plugin";
import { useNotification } from "@/renderer/hooks/common/useNotification";
import { usePromise } from "@/renderer/hooks/common/usePromise";
import { getTodo } from "@/renderer/services/remotes/todo.remote";
import { randomNumber } from "@/renderer/plugins/number.plugins";
import BaseLayout from "@/renderer/components/layouts/BaseLayout/BaseLayout.vue";
import PromptDialog from "@/renderer/components/common/PromptDialog.vue";

const { t } = useI18n();
const { openSystemNotification } = useNotification();
const [status, data, error, fetch, reset] = usePromise<Todo>(getTodo);

const id = ref<number>(1);
const text = ref<string>("");
const isOpenAlert = ref<boolean>(false);

function handleClick() {
  id.value = randomNumber(1, 100);
  fetch({ id: id.value });
}

function handleReset() {
  reset(true);
}

function handleNotice() {
  openSystemNotification("Test description");
}

function handleOpenAlert() {
  isOpenAlert.value = true;
}

function handleCloseAlert(value: string) {
  console.log("input value:", value);
  isOpenAlert.value = false;
}

onChangeInternetStatus((isOnline) => {
  console.log(isOnline);
});
</script>

<template>
  <BaseLayout>
    <h1>{{ t("TXT_HELLO") }}</h1>
    <p v-if="status === 'pending'">Loading</p>
    <p v-else-if="status === 'fulfilled'">Todo: {{ data?.title }}</p>
    <p v-else-if="status === 'rejected'">Error: {{ error?.message }}</p>
    <p v-else>Click "Change Todo" to get new todo</p>
    <button @click="handleClick">Change Todo</button>
    <button @click="handleReset">Clear</button>
    <button @click="handleNotice">Notice</button>
    <button @click="handleOpenAlert">Alert</button>
    <input type="text" v-model="text" />
    <br />
    <br />
    <RouterLink :to="PATH_ACTIVE.path">About</RouterLink>
    <PromptDialog
      id="confirm"
      label="What is your name?"
      :open="isOpenAlert"
      @accept="handleCloseAlert"
      @deny="handleCloseAlert"
    />
  </BaseLayout>
</template>

<style scoped lang="scss"></style>
