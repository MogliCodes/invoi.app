<template>
  <section v-if="template && status === 'success'">
    <BaseHeadline type="h1" :text="template.name" />
    <pre
      v-if="templateHtml && htmlStatus === 'success'"
      class="max-h-40 overflow-hidden overflow-y-scroll rounded-lg bg-black p-4 text-white"
    >
      {{ templateHtml.templateData }}
    </pre>
    <div class="" v-html="templateHtml.templateData"></div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
const authStore = useAuthStore();
const route = useRoute();

const { data: template, status } = await useFetch(
  `/api/templates/${route.params.id}/get`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
    },
  }
);

const { data: templateHtml, status: htmlStatus } = await useFetch(
  `/api/templates/${route.params.id}/get/html`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
    },
  }
);
</script>
