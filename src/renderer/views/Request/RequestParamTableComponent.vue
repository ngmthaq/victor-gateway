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
  (event: "change", key: string, value: string, index: number): void;
  (event: "delete", index: number): void;
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
  emits("add", { key: "key_" + params.value.length, value: "value_" + params.value.length });
}

function handleChangeRow(key: string, value: string, index: number) {
  emits("change", key, value, index);
}

function handleClickAction(key: ActionKeyType, index: number) {
  if (key === "delete") emits("delete", index);
}
</script>

<template>
  <AppTable
    w-add-row
    :headers="headers"
    :rows="params"
    :actions="actions"
    @add-row="handleAddRow"
    @change="handleChangeRow"
    @click-action="handleClickAction"
  />
</template>

<style scoped lang="scss"></style>
