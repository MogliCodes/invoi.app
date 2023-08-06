<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-4" type="h1" text="Create a new invoice" />
    <div>
      <BaseHeadline class="mb-4" type="h3" text="Upload a custom template" />
      <div class="flex gap-4">
        <input ref="fileInput" type="file" />
        <BaseButton text="Upload file" @click="handleUpload" />
      </div>
    </div>
    <div>
      <BaseHeadline class="mb-4" type="h3" text="Choose a template" />
      <select id="" name=""></select>
    </div>
  </div>
</template>

<script setup lang="ts">
const fileInput = ref(null);

async function handleUpload() {
  const file = fileInput.value?.files?.[0];
  const formData = new FormData();
  formData.append("file", file);

  const res = await useFetch("http://localhost:8000/api/invoice/template", {
    method: "POST",
    body: formData,
  });
  console.log(res);
}
</script>
