<template>
  <div class="p-8">
    <h3 class="mb-2 font-syne text-xl text-secondary-100 font-bold underline">
      Template Uploader
    </h3>
    <p class="text-gray-600 text-sm mb-4">
      In order to be able to create single page and multi page PDFs you need to
      upload adequate templates. At least you need to provide a template for the
      first page, subsequent pages and the last page.
    </p>
    <form @submit.prevent class="flex flex-col gap-5" action="">
      <div>
        <label for="">First page</label>
        <input ref="templateFirstPage" type="file" size="sm" />
      </div>
      <BaseButton text="Upload templates" @click="handleTemplateUpload" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";

const templateFirstPage: Ref<HTMLInputElement | null> = ref(null);
// const templateSubsequentPages = ref("");
// const templateLastPage = ref("");

const authStore = useAuthStore();
const alertStore = useAlertStore();
const handleTemplateUpload = async () => {
  const templateFileFirstPage = templateFirstPage.value?.files?.[0];
  if (!templateFileFirstPage) {
    return;
  }
  const formData = new FormData();
  formData.append("templateFirstPage", templateFileFirstPage);

  const res = await $fetch("/api/invoices/templates/upload", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      Userid: authStore.userId,
    },
  });
  if (res.status === 200) {
    alertStore.setAlert("success", res.message);
    setTimeout(() => {
      alertStore.resetAlert();
    }, 5000);
  }
};
</script>
