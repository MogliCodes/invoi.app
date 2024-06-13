<template>
  <main class="flex flex-col gap-6">
    <section>
      <BaseButton to="/invoices/templates/upload" text="Upload template" />
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
              <td class="truncate px-6 py-3">{{ template._id }}</td>
              <td class="px-6 py-3">{{ template.name }}</td>
              <td class="px-6 py-3">
                {{ template.fileName }}
              </td>
              <td>
                <span class="rounded px-2 py-1 bg-green-400 text-green-900">{{
                  template.tags.split("-").join(" ")
                }}</span>
              </td>
              <td class="pr-4">
                <span class="flex justify-end gap-2">
                  <NuxtLink :to="`/invoices/templates/${template._id}`">
                    <UIcon
                      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                      name="i-heroicons-eye"
                    />
                  </NuxtLink>
                  <NuxtLink :to="`/invoices/templates/${template._id}/edit`">
                    <UIcon
                      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                      name="i-heroicons-pencil"
                    />
                  </NuxtLink>
                  <UIcon
                    class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                    name="i-heroicons-trash"
                    @click="initiateDelete(template._id)"
                  />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
  <UModal v-model="isOpen">
    <div class="flex flex-col items-center p-8 text-center">
      <div
        class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500"
      >
        <UIcon class="text-2xl text-red-900" name="i-heroicons-trash" />
      </div>
      <BaseHeadline class="mb-2" type="h3" text="Confirm delete" />
      <section v-if="currentTemplateId">
        <p class="mb-8">Are you sure you want to delete this entry?</p>
        <div class="mb-8 break-all bg-black p-1 text-gray-200">
          {{ currentTemplateId.toString() }}
        </div>
        <div class="flex justify-center gap-4">
          <BaseButton
            variant="outline"
            text="Discard"
            @click="isOpen = false"
          />
          <BaseButton variant="red" text="Delete" @click="deleteItem()" />
        </div>
      </section>
      <section v-else>
        <p class="mb-8">
          Are you sure you want to delete the entries with the following ids?
        </p>
        <div class="mb-8 break-all bg-black p-1 text-gray-200">
          {{ itemsToDelete.toString() }}
        </div>
        <div class="flex justify-center gap-4">
          <BaseButton
            variant="outline"
            text="Discard"
            @click="isOpen = false"
          />
          <BaseButton variant="red" text="Delete" @click="bulkDeleteInvoices" />
        </div>
      </section>
    </div>
  </UModal>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

type TemplateData = {
  data: {
    name: string;
  }[];
};

definePageMeta({
  title: "Templates",
});

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

const { data: customTemplates } = useLazyFetch("/api/invoices/templates/get", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    ClientId: authStore.userId,
  },
});

const currentTemplateId = ref<string | null>(null);
const isOpen = ref(false);
const itemsToDelete = ref<string[]>([]);
function initiateDelete(etag: string) {
  currentTemplateId.value = etag;
  isOpen.value = true;
}

async function deleteItem(): Promise<void> {
  if (!currentTemplateId.value) return;
  await $fetch("/api/invoices/templates/delete", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
      Etag: currentTemplateId.value,
    },
  });
}
</script>
