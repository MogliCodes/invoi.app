<template>
  <div class="container mx-auto flex flex-col items-start">
    <div class="mb-12">
      <BaseHeadline class="mb-4 dark:text-white" type="h1" text="Clients" />
      <BaseButton to="/clients/create" text="Create client" variant="yellow" />
    </div>
    <div class="w-full">
      <div
        v-if="!clients && !clients?.length"
        class="flex flex-col items-start gap-4"
      >
        <p>No clients created yet! Start creating your first contact.</p>
      </div>
      <div>
        <div class="mb-2">
          <span class="text-sm font-bold text-secondary-100"
            >{{ clients?.length }} Clients</span
          >
        </div>
        <table class="min-w-full overflow-hidden rounded-lg dark:text-gray-400">
          <thead class="bg-blue-90 text-white">
            <th class="px-6 py-5 text-left">Company</th>
            <th class="px-6 py-5 text-left">Street</th>
            <th class="px-6 py-5 text-left">Zip</th>
            <th class="px-6 py-5 text-left">City</th>
            <th class="px-6 py-5 text-left">Tax ID</th>
          </thead>
          <tbody>
            <tr
              v-for="client in clients"
              :key="client.id"
              class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            >
              <td class="px-6 py-3">{{ client.company }}</td>
              <td class="px-6 py-3">{{ client.street }}</td>
              <td class="px-6 py-3">{{ client.zip }}</td>
              <td class="px-6 py-3">{{ client.city }}</td>
              <td class="px-6 py-3">{{ client.taxId }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
const config = useRuntimeConfig();
const backendBaseUrl = config.public.backendBaseUrl;
const authStore = useAuthStore();
const { data: clients } = useFetch(`${backendBaseUrl}/api/client`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});
</script>
