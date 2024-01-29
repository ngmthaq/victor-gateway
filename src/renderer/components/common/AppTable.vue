<script setup lang="ts">
import type { AppTableType } from "@/configs/types/components";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<AppTableType<unknown, unknown, unknown>>();

const emits = defineEmits<{
  (event: "addRow"): void;
  (event: "change", row: unknown, index: number): void;
  (event: "clickAction", key: string, row: unknown, index: number): void;
}>();

const { t } = useI18n();

const isHasCheckbox = computed<boolean>(() => Boolean(props.wCheckbox));
const isHasActions = computed<boolean>(() => Boolean(props.actions) && props.actions.length > 0);
const colspan = computed<number>(() => {
  let number = props.headers.length;
  if (isHasCheckbox.value) number++;
  if (isHasActions.value) number++;
  return number;
});

function handleAddRow() {
  emits("addRow");
}

function handleClickAction(key: string, row: unknown, index: number) {
  emits("clickAction", key, row, index);
}

function handleChange(row: unknown, index: number) {
  emits("change", row, index);
}
</script>

<template>
  <table class="table table-bordered" style="table-layout: fixed">
    <thead>
      <tr>
        <th style="width: 48px; text-align: center" scope="col" v-if="isHasCheckbox"></th>
        <th scope="col" v-for="(header, index) in props.headers" :key="index">
          {{ header.title || t(header.i18n) }}
        </th>
        <th style="width: 120px; text-align: center" scope="col" v-if="isHasActions">
          {{ t("TXT_ACTIONS") }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rIndex) in props.rows" :key="rIndex">
        <td style="text-align: center" scope="col" v-if="isHasCheckbox">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckIndeterminate"
            :disabled="Boolean(props.disable)"
          />
        </td>
        <td scope="col" v-for="(header, hIndex) in props.headers" :key="hIndex">
          <input
            type="text"
            class="normalize-input"
            :value="(row as any)[(header as any).key]"
            :disabled="Boolean(props.disable)"
            @input="(e) => handleChange({ ...(row as any), [(header as any).key]: (e.target as any).value }, rIndex)"
          />
        </td>
        <td style="text-align: center" scope="col" v-if="isHasActions">
          <div class="d-flex align-items-center justify-content-center gap-1 w-100 h-100">
            <button
              class="btn btn-sm p-0 border-0"
              v-for="(action, index) in props.actions"
              :key="index"
              :disabled="Boolean(props.disable)"
              :title="action.title || t(action.i18n)"
              @click="() => handleClickAction(action.key as any, row, index)"
            >
              <i :class="`${action.icon}`"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="Boolean(props.wAddRow)">
      <tr>
        <td class="btn-table-footer" :colspan="colspan" :title="t('TXT_ADD_NEW_ROW')" @click="handleAddRow">
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
  transition: all 0.1s linear;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 12px;
  padding: 2px 8px;
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
