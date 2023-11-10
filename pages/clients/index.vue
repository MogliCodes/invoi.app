<template>
  <div class="container mx-auto flex flex-col items-start">
    <div class="mb-12">
      <BaseHeadline class="mb-4" type="h1" text="Clients" />
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
          <span class="text-secondary-100 text-sm font-bold"
            >{{ clients?.length }} Clients</span
          >
        </div>
        <table class="min-w-full overflow-hidden rounded-lg">
          <thead
            class="border-x-2 border-t-2 border-yellow-dark bg-blue-80 text-white"
          >
            <th class="text-left px-6 py-5">Company</th>
            <th class="text-left px-6 py-5">Street</th>
            <th class="text-left px-6 py-5">Zip</th>
            <th class="text-left px-6 py-5">City</th>
            <th class="text-left px-6 py-5">Tax ID</th>
          </thead>
          <tbody>
            <tr
              v-for="client in clients"
              :key="client.id"
              class="card rounded border-2 p-4 even:bg-[rgba(0,0,0,0.05)]"
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

const authStore = useAuthStore();
const { data: clients } = useFetch(`http://localhost:8000/api/client`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    ClientId: authStore.userId,
  },
});
</script>
