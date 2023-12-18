<script setup lang="ts">
import { Modal } from "bootstrap";
import { ref, watch, onMounted } from "vue";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const ID = "setting-dialog";
const modal = ref<Modal | null>(null);

const handleClose = () => {
  emit("close");
};

watch(
  () => props.open,
  (value) => {
    if (modal.value) {
      if (value) {
        modal.value.show();
      } else {
        modal.value.hide();
      }
    }
  },
);

onMounted(() => {
  modal.value = new Modal(document.getElementById(ID), { backdrop: "static", keyboard: false });
});
</script>

<template>
  <section :id="ID" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="handleClose">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
