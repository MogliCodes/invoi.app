<template>
  <div class="flex flex-col gap-6">
    <section>
      <div class="flex items-center gap-3 mt-3">
        <BaseButton
          to="/services/create"
          text="Create services"
          variant="yellow"
        />
        <BaseButton
          to="/services/import"
          text="Import services"
          variant="outline"
        />
      </div>
    </section>
    <section v-if="!services" class="flex">
      <BaseBox class="text-center">
        <BaseHeadline text="No services available" type="h2"></BaseHeadline>
        <p>
          There are currently no services available. <br />
          Go ahead and create your first service!
        </p>
        <BaseButton
          to="/services/create"
          text="Create service"
          variant="yellow"
        />
      </BaseBox>
    </section>
    <section v-else>
      <table class="min-w-full overflow-hidden rounded-lg dark:text-gray-400">
        <thead class="bg-blue-90 text-white">
          <tr>
            <th class="py-5 pl-6 text-left">
              <UCheckbox
                v-model="selectAll"
                :checked="selectAll"
                @click="toggleSelectAll(toRef(services))"
              />
            </th>
            <th class="py-5 pl-6 text-left">Name</th>
            <th class="px-6 py-5 text-left">Description</th>
            <th class="px-6 py-5 text-left">Price</th>
            <th class="px-6 py-5 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            v-for="service in services"
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
        </tbody>
      </table>
      <div class="mt-6 flex items-center gap-2">
        <USelectMenu
          v-model="bulkAction"
          class="cursor-pointer"
          size="xl"
          color="white"
          :options="bulkActionOptions"
        >
          <template #label>
            {{ bulkAction }}
          </template>
        </USelectMenu>
        <BaseButton size="sm" text="Apply" @click="executeBulkAction" />
      </div>
    </section>
  </div>
  <BulkActionModal
    v-if="isBulkDeleteModalOpen"
    @discard-action="isBulkDeleteModalOpen = false"
    @execute-action="executeAction"
    resource="services"
    :is-open="isBulkDeleteModalOpen"
    :item-id="itemId"
    :selected-items="selectedItems"
  />
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useBulkActions } from "~/composables/bulkActions";
import BulkActionModal from "~/components/BulkActionModal.vue";

const authStore = useAuthStore();

definePageMeta({
  title: "Services",
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
