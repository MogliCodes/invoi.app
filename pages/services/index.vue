<template>
  <div class="flex flex-col">
    <section class="mb-12">
      <div class="flex items-center gap-3">
        <BaseButton
          to="/services/create"
          text="Leistung anlegen"
          variant="yellow"
        />
      </div>
    </section>
    <section v-if="!services?.length">
      <BaseNote>
        <p>
          You have not created any services yet. Click on "Create services" to
          create a new service.
        </p>
      </BaseNote>
    </section>
    <section v-else>
      <div class="mb-2">
        <span class="text-sm font-bold text-secondary-100"
          >{{ services?.length }} Leistungen</span
        >
      </div>
      <BaseTable>
        <template #head>
          <th class="py-5 pl-6 text-left">
            <UCheckbox
              v-model="selectAll"
              :checked="selectAll"
              @click="toggleSelectAll(toRef(services))"
            />
          </th>
          <th class="py-5 pl-6 text-left">Name</th>
          <th class="px-6 py-5 text-left">Beschreibung</th>
          <th class="px-6 py-5 text-left">Preis</th>
          <th class="px-6 py-5 text-left">Handlung</th>
        </template>
        <template #body>
          <tr
            v-for="service in services"
            class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
          >
            <td class="py-3 pl-6">
              <UCheckbox
                :checked="isItemSelected(service._id)"
                @click="toggleSelection(service._id)"
              />
            </td>
            <td class="py-3 pl-6">{{ service.name }}</td>
            <td class="py-3 pl-6">{{ service.description }}</td>
            <td class="py-3 pl-6">
              {{ formatCurrencyAmount(formatCentToAmount(service?.price)) }}
            </td>
            <td class="px-6 py-3">
              <span class="flex gap-2">
                <UIcon
                  class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                  name="i-heroicons-trash"
                  @click="deleteItem(service._id, 'services')"
                />
              </span>
            </td>
          </tr>
        </template>
      </BaseTable>
    </section>
  </div>
  <BulkActionModal
    v-if="isBulkDeleteModalOpen"
    resource="services"
    :is-open="isBulkDeleteModalOpen"
    :item-id="itemId"
    :selected-items="selectedItems"
    @discard-action="isBulkDeleteModalOpen = false"
    @execute-action="executeAction"
  />
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useBulkActions } from "~/composables/bulkActions";
import BulkActionModal from "~/components/BulkActionModal.vue";

const authStore = useAuthStore();

definePageMeta({
  title: "Leistungen",
});

type Service = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

const {
  itemId,
  selectedItems,
  bulkAction,
  bulkActionOptions,
  isBulkDeleteModalOpen,
  selectAll,
  deleteItem,
  executeBulkAction,
  isItemSelected,
  toggleSelectAll,
  toggleSelection,
} = useBulkActions();

const { data: services, refresh } = useFetch<Array<Service>>(`/api/services/`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    Userid: authStore.userId,
  },
});

function executeAction() {
  console.log("Bulk executeAction");
  isBulkDeleteModalOpen.value = false;
  itemId.value = "";
  selectedItems.value = [];
  refresh();
}
</script>
