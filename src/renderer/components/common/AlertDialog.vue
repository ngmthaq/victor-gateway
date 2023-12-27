<script setup lang="ts">
import { Modal } from "bootstrap";
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  open: boolean;
  id: string;
  title?: string;
  message: string;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const { t } = useI18n();

const modal = ref<Modal | null>(null);

function handleClose() {
  emit("close");
}

function handleToggleOpenModal(open: boolean) {
  if (modal.value) {
    if (open) {
      modal.value.show();
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
          <div class="mb-1 text-center">{{ props.message }}</div>
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <button
            type="button"
            class="btn btn-lg btn-link fs-6 text-decoration-none col-12 py-3 m-0 rounded-0"
            @click="handleClose"
          >
            {{ t("TXT_OK") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
