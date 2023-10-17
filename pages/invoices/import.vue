<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-10" type="h1" text="Import invoice data" />
    <form action="">
      <div class="mb-4">
        <label for="">Upload a .csv file</label>
        <input ref="fileInput" class="block" type="file" />
      </div>
      <BaseButtonGroup>
        <BaseButton text="Upload CSV file" @click="handleFileUpload" />
        <BaseButton text="Upload PDF file" @click="handlePdfUpload" />
      </BaseButtonGroup>
    </form>
  </div>
</template>
<script setup lang="ts">
const fileInput: Ref<HTMLInputElement | null> = ref(null);
async function handleFileUpload() {
  if (!fileInput.value) return;
  const file = fileInput.value?.files?.[0];
  if (file) {
    const formData = new FormData();
    formData.append("csvFile", file);
    await $fetch("http://localhost:8000/api/invoice/import", {
      method: "POST",
      body: formData,
    });
  }
}
async function handlePdfUpload() {
  if (!fileInput.value) return;
  const file = fileInput.value?.files?.[0];
  if (file) {
    const formData = new FormData();
    formData.append("pdfFile", file);
    await $fetch("http://localhost:8000/api/invoice/import/pdf", {
      method: "POST",
      body: formData,
    });
  }
}
</script>
