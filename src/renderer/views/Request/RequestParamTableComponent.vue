<script setup lang="ts">
import type { AppActionType, AppTableHeaderType } from "@/configs/types/components";
import { computed } from "vue";
import { convertSearchParamStringToArray } from "@/renderer/plugins/str.plugin";
import AppTable from "@/renderer/components/common/AppTable.vue";

type HeaderKeyType = "key" | "value";

type ActionKeyType = "delete";

type ParamRowType = { key: string; value: string };

const props = defineProps<{
  url: string;
}>();

const emits = defineEmits<{
  (event: "add", data: unknown): void;
  (event: "change", data: unknown): void;
  (event: "delete", data: unknown): void;
}>();

const headers: AppTableHeaderType<HeaderKeyType>[] = [
  { key: "key", i18n: "TXT_REQUEST_PARAM_KEY" },
  { key: "value", i18n: "TXT_REQUEST_PARAM_VALUE" },
];

const actions: AppActionType<ActionKeyType>[] = [
  {
    key: "delete",
    icon: "bi bi-trash",
    i18n: "TXT_DELETE",
  },
];

const params = computed<ParamRowType[]>(() => {
  const [, searchParams] = props.url.split("?");
  return convertSearchParamStringToArray(searchParams);
});

function handleAddRow() {
  emits("add", { key: "key_" + params.value.length, value: "" });
}
</script>

<template>
  <AppTable w-add-row :headers="headers" :rows="params" :actions="actions" @add-row="handleAddRow" />
</template>

<style scoped lang="scss"></style>
