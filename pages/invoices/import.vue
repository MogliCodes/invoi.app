<template>
  <section class="w-2/3">
    <BaseHeadline class="mb-10" type="h1" text="Data import" />
    <BaseHeadline class="mb-3" type="h2" text="Import your own data" />
    <BaseBox>
      <BaseHeadline class="mb-3" type="h3" text="CSV import" />
      <p>
        In order to be able to import your data successfully I must fulfill some
        criteria.
      </p>
      <form>
        <div class="mb-4">
          <label for="">Upload a .csv file</label>
          <input ref="fileInput" class="block" type="file" />
        </div>
        <BaseButtonGroup>
          <BaseButton
            text="Upload CSV file"
            @click.prevent="handleFileUpload"
          />
        </BaseButtonGroup>
      </form>
    </BaseBox>
    <BaseBox class="mt-6">
      <BaseHeadline class="mb-3" type="h3" text="PDF import" />
      <BaseButton text="Upload PDF file" @click="handlePdfUpload" />
    </BaseBox>
  </section>
</template>
<script setup lang="ts">
import { useAlertStore } from "~/stores/alert";
const alertStore = useAlertStore();
const fileInput: Ref<HTMLInputElement | null> = ref(null);
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;

async function handleFileUpload() {
  if (!fileInput.value) return;
  const file = fileInput.value?.files?.[0];
  if (file) {
    const formData = new FormData();
    formData.append("csvFile", file);
    const res = await $fetch(`${backendBaseUrl}/api/invoice/import`, {
      method: "POST",
      body: formData,
    });
    if (res.status === 200) {
      alertStore.setAlert("success", res.message);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
      navigateTo("/invoices");
    }
  }
}
async function handlePdfUpload() {
  if (!fileInput.value) return;
  const file = fileInput.value?.files?.[0];
  if (file) {
    const formData = new FormData();
    formData.append("pdfFile", file);
    await $fetch(`${backendBaseUrl}/api/invoice/import/pdf`, {
      method: "POST",
      body: formData,
    });
  }
}
</script>
