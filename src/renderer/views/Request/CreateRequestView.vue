<script setup lang="ts">
import AuthLayout from "@/renderer/components/layouts/AuthLayout/AuthLayout.vue";
</script>

<template>
  <AuthLayout>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="mb-3">
            <input type="email" class="form-control form-control-sm" placeholder="What is this request name?" />
          </div>
        </div>
        <div class="col-12">
          <div class="input-group input-group-sm mb-3">
            <select class="form-select form-select-sm custom-selection">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input type="text" class="form-control form-control-sm" placeholder="URL" />
            <button class="btn btn-sm btn-primary">Save</button>
            <button
              type="button"
              class="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul class="dropdown-menu dropdown-menu-end p-1">
              <li><button class="btn btn-sm btn-outline-secondary w-100">Save & Fetch</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped lang="scss">
.custom-selection {
  flex: unset !important;
  width: 120px !important;
}
</style>
