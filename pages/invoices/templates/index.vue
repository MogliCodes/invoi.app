<template>
  <main class="flex flex-col gap-6">
    <section>
      <div class="container mx-auto">
        <BaseHeadline class="mb-4 dark:text-white" type="h1" text="Templates" />
        <BaseButton to="/invoices/templates/upload" text="Upload template" />
      </div>
    </section>
    <section>
      <div class="container mx-auto">
        <table class="min-w-full overflow-hidden rounded-lg dark:text-gray-400">
          <thead class="bg-blue-90 text-white">
            <tr>
              <th class="px-6 py-5 text-left">ID</th>
              <th class="px-6 py-5 text-left">Title</th>
              <th class="px-6 py-5 text-left">Filename</th>
              <th class="px-6 py-5 text-left">Tag</th>
              <th class="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="template in customTemplates"
              :key="template._id"
              class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            >
              <td class="truncate px-6 py-3">{{ template.etag }}</td>
              <td class="px-6 py-3">{{ template.name }}</td>
              <td class="px-6 py-3">
                {{ template.fileName }}
              </td>
              <td>
                <span class="rounded px-2 py-1 bg-green-400 text-green-900">{{
                  template.tags
                }}</span>
              </td>
              <td class="pr-4">
                <span class="flex justify-end gap-2">
                  <NuxtLink :to="`/invoices/${template.etag}`">
                    <UIcon
                      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                      name="i-heroicons-eye"
                    />
                  </NuxtLink>
                  <UIcon
                    class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                    name="i-heroicons-pencil"
                  />
                  <UIcon
                    class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                    name="i-heroicons-trash"
                  />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

type TemplateData = {
  data: {
    name: string;
  }[];
};

const authStore = useAuthStore();

const { data: templates } = await useFetch(
  "http://localhost:8000/restapi/storage/bucket"
);

const selectedTemplate = ref("Select a template");

const selectedTemplateData = computed(() => {
  return actualTemplates?.find(
    (template) => template.name === selectedTemplate.value
  );
});

// @ts-ignore
const actualTemplates = templates?.value?.data.filter(
  (template) => template.name.includes(".html") && !template.name.includes("/")
);

const { data: customTemplates } = useFetch("/api/invoices/templates/get", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    ClientId: authStore.userId,
  },
});
</script>
