<script setup lang="ts">
import type { Todo } from "@/services/models/todo.model";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { useNotification } from "@/hooks/common/useNotification";
import { usePromise } from "@/hooks/common/usePromise";
import { getTodo } from "@/services/remotes/todo.remote";
import { randomNumber } from "@/plugins/number.plugins";
import { PATH_ABOUT } from "@/configs/constants/path.const";
import BaseLayout from "@/components/layouts/BaseLayout.vue";

const { t } = useI18n();
const notification = useNotification();
const [status, data, error, fetch, reset] = usePromise<Todo>(getTodo);

const id = ref<number>(1);

const handleClick = () => {
  id.value = randomNumber(1, 100);
  fetch({ id: id.value });
};

const handleReset = () => {
  reset(true);
};

const handleNotice = () => {
  notification.append({ message: "Test Test Test Test Test", variant: "warning" });
};
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
    <br />
    <br />
    <RouterLink :to="PATH_ABOUT.path">About</RouterLink>
  </BaseLayout>
</template>

<style scoped lang="scss"></style>
