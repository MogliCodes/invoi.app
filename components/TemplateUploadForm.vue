<template>
  <div class="p-8">
    <h3 class="mb-2 font-syne text-xl font-bold text-secondary-100 underline">
      Template Uploader
    </h3>
    <p class="mb-4 text-sm text-gray-600">
      In order to be able to create single page and multi page PDFs you need to
      upload adequate templates. At least you need to provide a template for the
      first page, subsequent pages and the last page.
    </p>
    <form class="flex flex-col gap-5" action="" @submit.prevent>
      <div>
        <label for="">Template Name</label>
        <BaseInput v-model="templateName" />
      </div>
      <div>
        <label for="">Tags</label>
        <USelectMenu
          v-model="selectedTemplateTag"
          class="cursor-pointer"
          size="xl"
          color="white"
          :options="templateTags"
          value-attribute="tag"
          option-attribute="name"
        >
          <template #label>
            {{ selectedTemplateTag }}
          </template>
        </USelectMenu>
      </div>
      <div>
        <label class="block" for="">First page</label>
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

const templateName = ref("");
type TemplateTag = {
  name: string;
  tag: string;
};
const templateTags: Array<TemplateTag> = [
  { name: "First page", tag: "first-page" },
  { name: "Subsequent pages", tag: "subsequent-pages" },
  { name: "Last page", tag: "last-page" },
  { name: "Single page", tag: "single-page" },
];
const selectedTemplateTag: Ref<string> = ref("first-page");

const emit = defineEmits(["upload-template"]);

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
      TemplateName: templateName.value,
      TemplateTags: [selectedTemplateTag.value],
    },
  });
  if (res.status === 200) {
    emit("upload-template");
    alertStore.setAlert("success", res.message);
    setTimeout(() => {
      alertStore.resetAlert();
    }, 5000);
  }
};
</script>
