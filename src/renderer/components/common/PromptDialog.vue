<script setup lang="ts">
import { Modal } from "bootstrap";
import { VNodeRef } from "vue";
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  open: boolean;
  id: string;
  title?: string;
  value?: string;
  label: string;
}>();

const emit = defineEmits<{
  (event: "accept", value: string): void;
  (event: "deny", value: string): void;
}>();

const { t } = useI18n();

const modal = ref<Modal | null>(null);
const inputValue = ref<string>(props.value || "");
const inputElement = ref<VNodeRef | null>(null);

function handleClose() {
  emit("deny", inputValue.value);
  inputValue.value = "";
}

function handleSubmit() {
  emit("accept", inputValue.value);
  inputValue.value = "";
}

function handleToggleOpenModal(open: boolean) {
  if (modal.value) {
    if (open) {
      modal.value.show();
      if (inputElement.value) inputElement.value.focus();
    } else {
      modal.value.hide();
    }
  }
}

watch(
  () => props.open,
  (value) => handleToggleOpenModal(value),
);

onMounted(() => {
  modal.value = new Modal(document.getElementById(props.id), { keyboard: false, backdrop: "static" });
});
</script>

<template>
  <section :id="props.id" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content rounded-1 shadow">
        <div class="modal-body p-4">
          <h5 class="mb-4 text-center">{{ props.title || t("TXT_NOTICE") }}</h5>
          <label :for="`${props.id}-prompt-input`" class="d-block mb-2">{{ props.label }}</label>
          <div class="mb-1">
            <input
              type="text"
              class="form-control w-100"
              ref="inputElement"
              v-model="inputValue"
              :id="`${props.id}-prompt-input`"
              :placeholder="t('TXT_COMMON_PLACEHOLDER')"
            />
          </div>
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <button
            type="button"
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
            @click="handleSubmit"
          >
            <strong>{{ t("TXT_CONFIRM") }}</strong>
          </button>
          <button
            type="button"
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0"
            @click="handleClose"
          >
            {{ t("TXT_EXIT") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
