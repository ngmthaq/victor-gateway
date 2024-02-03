<script setup lang="ts">
import type { AppActionType, AppTableHeaderType } from "@/configs/types/components";
import { computed } from "vue";
import { convertSearchParamStringToArray } from "@/renderer/plugins/str.plugin";
import { useI18n } from "vue-i18n";

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

const { t } = useI18n();

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

function handleChangeRow(event: Event, index: number) {
  const element = event.target as HTMLInputElement;
  emits("change", element.name, element.value, index);
}

function handleClickAction(key: ActionKeyType, index: number) {
  if (key === "delete") emits("delete", index);
}
</script>

<template>
  <table class="table table-bordered" style="table-layout: fixed">
    <thead>
      <tr>
        <th scope="col" v-for="(header, index) in headers" :key="index">
          {{ header.title || t(header.i18n) }}
        </th>
        <th style="width: 120px; text-align: center" scope="col">
          {{ t("TXT_ACTIONS") }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rIndex) in params" :key="rIndex">
        <td scope="col" v-for="(header, hIndex) in headers" :key="hIndex">
          <input
            type="text"
            class="normalize-input"
            :name="(header as any).key"
            :value="(row as any)[(header as any).key]"
            @input="(e) => handleChangeRow(e, rIndex)"
          />
        </td>
        <td style="text-align: center" scope="col">
          <div class="d-flex align-items-center justify-content-center gap-1 w-100 h-100">
            <button
              class="btn btn-sm p-0 border-0"
              v-for="(action, index) in actions"
              :key="index"
              :title="action.title || t(action.i18n)"
              @click="() => handleClickAction(action.key as any, rIndex)"
            >
              <i :class="`${action.icon}`"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="btn-table-footer" :colspan="3" :title="t('TXT_ADD_NEW_ROW')" @click="handleAddRow">
          <i class="bi bi-plus-circle-dotted fs-6"></i>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped lang="scss">
th {
  font-size: 12px;
  user-select: none;
}

td {
  font-size: 12px;
  user-select: none;
  vertical-align: middle;

  &:hover .normalize-input {
    background-color: rgba($color: $secondary, $alpha: 0.1);
  }
}

.normalize-input {
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 2px;
}

.btn-table-footer {
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    background-color: rgba($color: $secondary, $alpha: 0.2);
  }
}
</style>
