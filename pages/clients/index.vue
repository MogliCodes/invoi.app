<template>
  <div class="container mx-auto flex flex-col items-start">
    <div class="mb-12">
      <div class="flex items-center gap-3">
        <BaseButton
          to="/clients/create"
          text="Create client"
          variant="yellow"
        />
        <BaseButton
          to="/clients/import"
          text="Import clients"
          variant="outline"
        />
      </div>
    </div>
    <div class="w-full">
      <div v-if="!clients?.length" class="flex flex-col items-start gap-4">
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
            <tr>
              <th class="py-5 pl-6 text-left">
                <UCheckbox
                  v-model="selectAll"
                  :checked="selectAll"
                  @click="toggleSelectAll"
                />
              </th>
              <th class="px-6 py-5 text-left">Company</th>
              <th class="px-6 py-5 text-left">Street</th>
              <th class="px-6 py-5 text-left">Zip</th>
              <th class="px-6 py-5 text-left">City</th>
              <th class="px-6 py-5 text-left">Tax ID</th>
              <th class="px-6 py-5 text-left">Action</th>
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
                    @click="initiateDeletion(client._id)"
                  />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <BulkActions
          :bulk-action-options="['Choose an action', 'Delete']"
          resource="clients"
          @execute-bulk-action="initiateBulkAction"
        />
        <BulkActionModal
          v-if="showBulkActionModal"
          :selected-items="selectedClients"
          resource="clients"
          :is-open="showBulkActionModal"
          @discard-action="showBulkActionModal = false"
          @execute-action="executeBulkAction"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
const authStore = useAuthStore();
const alertStore = useAlertStore();

definePageMeta({
  title: "Clients",
});

const { data: clients, refresh: refreshClients } = await useFetch(
  `/api/clients`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

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

const showBulkActionModal = ref(false);
function initiateDeletion() {
  console.log("Initiate deletion");
  showBulkActionModal.value = true;
}

async function initiateBulkAction(action: string) {
  console.log("Bulk action", action);
  if (action === "Delete") {
    initiateDeletion();
  }
}

async function executeBulkAction({
  action,
  ids,
}: {
  action: string;
  ids: string[];
}) {
  console.log("Execute bulk action", action, ids);
  try {
    await $fetch(`/api/clients/bulk`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userid: authStore.userId,
      },
      body: JSON.stringify({ ids }),
    });
    showBulkActionModal.value = false;
    refreshClients();
    alertStore.setAlert("success", "Clients deleted successfully");
    setTimeout(() => {
      alertStore.resetAlert();
    }, 3000);
  } catch (error) {
    console.error(error);
  }
}
</script>
