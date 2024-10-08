<template>
  <main>
    <div class="mb-12">
      <div class="flex items-center gap-3">
        <BaseButton
          to="/clients/create"
          text="Kunde anlegen"
          variant="yellow"
        />
        <BaseButton
          to="/clients/import"
          text="Kunden importieren"
          variant="outline"
        />
      </div>
    </div>
    <div class="w-full">
      <BaseNote v-if="!clients?.length">
        <p>
          Du hast noch keine Kunden angelegt. Klicke auf "Kunde anlegen" um
          einen neuen Kunden zu erstellen.
        </p>
      </BaseNote>
      <div v-else>
        <div class="mb-2">
          <span class="text-sm font-bold text-secondary-100"
            >{{ clients?.length }} Kunden</span
          >
        </div>
        <div class="max-w-full overflow-x-auto rounded-lg shadow-lg">
          <table
            class="min-w-full overflow-hidden rounded-lg dark:text-gray-400"
          >
            <thead class="bg-blue-90 text-white">
              <tr>
                <th class="py-5 pl-6 text-left">
                  <UCheckbox
                    v-model="selectAll"
                    :checked="selectAll"
                    @click="toggleSelectAll"
                  />
                </th>
                <th class="px-6 py-5 text-left">Kunde</th>
                <th class="px-6 py-5 text-left">Straße</th>
                <th class="px-6 py-5 text-left">PLZ</th>
                <th class="px-6 py-5 text-left">Ort</th>
                <th class="px-6 py-5 text-left">Steuernummer</th>
                <th class="px-6 py-5 text-left">Handlung</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="client in clients"
                :key="client._id"
                class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
              >
                <td class="py-3 pl-6">
                  <UCheckbox
                    :checked="isSelectedClient(client._id)"
                    @click="toggleSelection(client._id)"
                  />
                </td>
                <td class="px-6 py-3">{{ client.company }}</td>
                <td class="px-6 py-3">{{ client.street }}</td>
                <td class="px-6 py-3">{{ client.zip }}</td>
                <td class="px-6 py-3">{{ client.city }}</td>
                <td class="px-6 py-3">{{ client.taxId }}</td>
                <td class="px-6 py-3">
                  <span class="flex gap-2">
                    <NuxtLink :to="`/clients/${client._id}`">
                      <UIcon
                        class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                        name="i-heroicons-eye"
                      />
                    </NuxtLink>
                    <UIcon
                      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                      name="i-heroicons-trash"
                      @click="deleteClient(client._id)"
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import consola from "consola";
const authStore = useAuthStore();

definePageMeta({
  title: "Kunden",
});

const { data: clients, refresh } = await useFetch(`/api/clients`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});

/**
 * Actions
 */
const selectedClients = ref<string[]>([]);
const selectAll = ref(false);

function isSelectedClient(clientId: string) {
  return selectedClients.value.includes(clientId);
}

function toggleSelection(clientId: string) {
  if (isSelectedClient(clientId)) {
    selectedClients.value = selectedClients.value.filter(
      (id) => id !== clientId
    );
  } else {
    selectedClients.value = [...selectedClients.value, clientId];
  }
}

function toggleSelectAll() {
  if (selectAll.value) {
    selectedClients.value = [];
  } else {
    selectedClients.value = clients.value.map((client: any) => client._id);
  }
  selectAll.value = !selectAll.value;
}

async function deleteClient(clientId) {
  console.log(clientId);
  const response = await $fetch(`/api/clients/delete/${clientId}`, {
    method: "POST",
    body: { clientId },
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  });
  consola.log(response);
  refresh();
}
</script>
