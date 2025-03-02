<template>
  <main :key="pageSize" class="flex flex-col items-start">
    <section class="mb-12 w-full">
      <!-- Desktop buttons -->
      <div class="hidden sm:flex sm:flex-row sm:items-center gap-3">
        <BaseButton to="/contacts/create" text="Kontakt erstellen" variant="yellow" />
        <BaseButton to="/contacts/import" text="Kontakte importieren" variant="outline" />
        <BaseButton to="/contacts/categories" text="Kategorien verwalten" variant="outline" />
      </div>

      <!-- Mobile action menu -->
      <div class="sm:hidden w-full">
        <MobileActionMenu main-button-text="Kontakt-Menü">
          <MobileActionMenuItem to="/contacts/create" text="Kontakt erstellen" icon="i-heroicons-user-plus"
            :is-primary="true" />
          <MobileActionMenuItem to="/contacts/import" text="Kontakte importieren" icon="i-heroicons-arrow-down-tray" />
          <MobileActionMenuItem to="/contacts/categories" text="Kategorien verwalten" icon="i-heroicons-tag" />
        </MobileActionMenu>
      </div>
    </section>

    <section class="w-full">
      <div v-if="!data?.length"
        class="bg-blue-500 bg-opacity-10 border-2 border-blue-500 p-5 rounded-lg flex flex-col items-start gap-4 text-blue-950">
        <p>
          Du hast noch keine Kontakte angelegt. Klicke auf "Kontakt erstellen"
          um einen neuen Kontakt zu erstellen.
        </p>
      </div>
      <div v-else>
        <section class="mb-2 w-full">
          <div class="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 sm:gap-8">
            <div class="flex gap-3">
              <div>
                <span class="text-sm font-bold text-secondary-100">{{
                  data?.length
                }}</span>
                <span class="text-sm font-bold text-secondary-100">
                  Kontakte
                </span>
              </div>
            </div>
            <div v-if="contactCount > 20" class="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
              <div class="w-full sm:w-auto">
                <USelect v-model.number="pageSize" color="white" :options="pageSizeOptions" />
              </div>
              <div class="hidden sm:block">
                <UPagination v-model.number="page" size="sm" :page-count="pageSize" :total="contactCount">
                  <template #prev>
                    <UTooltip text="Previous page">
                      <UButton icon="i-heroicons-arrow-small-left-20-solid" color="yellow"
                        class="me-2 rtl:[&_span:first-child]:rotate-180" @click="page--" />
                    </UTooltip>
                  </template>
                  <template #next>
                    <UTooltip text="Next page">
                      <UButton icon="i-heroicons-arrow-small-right-20-solid" color="yellow"
                        class="ms-2 rtl:[&_span:last-child]:rotate-180" @click="page++" />
                    </UTooltip>
                  </template>
                </UPagination>
              </div>
              <div class="sm:hidden">
                <MobilePagination :current-page="page" :page-size="pageSize" :total-items="contactCount"
                  @update:page="page = $event" />
              </div>
            </div>
          </div>
        </section>

        <ResponsiveContactsTable :contacts="data" :selected-contacts="selectedContacts" :select-all="selectAll"
          @toggle-selection="toggleSelection" @toggle-select-all="toggleSelectAll" @delete="initiateDeletion" />

        <div class="flex flex-col sm:flex-row justify-between py-4 gap-4">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <USelectMenu v-model="bulkAction" class="cursor-pointer w-full sm:w-auto" size="xl" color="white"
              :options="bulkActionOptions">
              <template #label>
                {{ bulkAction }}
              </template>
            </USelectMenu>
            <BaseButton size="sm" text="Anwenden" class="w-full sm:w-auto" @click="executeBulkAction" />
          </div>
          <UPagination v-if="contactCount > 20" class="hidden sm:flex" v-model.number="page" size="sm"
            :page-count="pageSize" :total="contactCount">
            <template #prev="{ onClick }">
              <UTooltip text="Previous page">
                <UButton icon="i-heroicons-arrow-small-left-20-solid" color="primary"
                  class="me-2 rtl:[&_span:first-child]:rotate-180" @click="onClick" />
              </UTooltip>
            </template>
            <template #next="{ onClick }">
              <UTooltip text="Next page">
                <UButton icon="i-heroicons-arrow-small-right-20-solid" color="primary"
                  class="ms-2 rtl:[&_span:last-child]:rotate-180" @click="onClick" />
              </UTooltip>
            </template>
          </UPagination>
          <div v-if="contactCount > 20" class="sm:hidden">
            <MobilePagination :current-page="page" :page-size="pageSize" :total-items="contactCount"
              @update:page="page = $event" />
          </div>
        </div>
      </div>
    </section>
    <UModal v-model="isOpen">
      <div class="flex flex-col items-center p-4 sm:p-8 text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
          <UIcon class="text-2xl text-red-900" name="i-heroicons-trash" />
        </div>
        <BaseHeadline class="mb-2" type="h3" text="Confirm delete" />
        <section v-if="currentContactId">
          <p class="mb-8">Are you sure you want to delete this entry?</p>
          <div class="flex justify-center gap-4">
            <BaseButton variant="red" text="Delete" @click="deleteContact()" />
            <BaseButton variant="outline" text="Discard" @click="isOpen = false" />
          </div>
        </section>
        <section v-else>
          <p class="mb-8">
            Are you sure you want to delete the entries with the following ids?
          </p>
          <div class="mb-8 break-all bg-black p-1 text-gray-200 max-h-40 overflow-auto">
            {{ selectedContacts.toString() }}
          </div>
          <div class="flex justify-center gap-4">
            <BaseButton variant="red" text="Delete" @click="bulkDelete()" />
            <BaseButton variant="outline" text="Discard" @click="isOpen = false" />
          </div>
        </section>
      </div>
    </UModal>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
const authStore = useAuthStore();

definePageMeta({
  title: "Kontakte",
});

useHead({
  title: "Kontakte",
});

type Contact = {
  _id: string;
  firstname: string;
  lastname: string;
  city: string;
  street: string;
  zip: string;
  dob: string;
  user: string;
};

/** ================================
 * Pagination
 ================================ */
const page = ref(1);
const pageSizeOptions = [10, 20, 30, 40, 50];
const pageSize = ref(pageSizeOptions[1]);

/** ================================
 * Data fetching
 ================================ */
const { data, refresh: refreshContacts } = useFetch<Contact[]>(
  `/api/contacts`,
  {
    method: "POST",
    query: {
      page,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

const {
  data: contactCount,
  refresh: refreshContactsCount,
}: { data: Ref<number>; refresh: () => void } = useFetch(
  `/api/contacts/count`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userId: authStore.userId,
    },
  }
);

/** ================
 * Actions
 ================ */
const isOpen = ref(false);
const currentContactId = ref();
const selectedContacts: Ref<string[]> = ref([]);
const bulkActionOptions = [
  "Mehrfachauswahl",
  "Delete",
  "Archive",
  "Copy",
  "Move",
];
const bulkAction = ref(bulkActionOptions[0]);
const selectAll = ref(false);

function initiateDeletion(contactId: string): void {
  isOpen.value = true;
  currentContactId.value = contactId;
}
async function deleteContact() {
  console.log("deleteContact");
  try {
    await useFetch(`/api/contacts/${currentContactId.value}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userId: authStore.userId,
      },
    });
    await refreshContacts();
    refreshContactsCount();
    isOpen.value = false;
  } catch (error) {
    console.error(error);
  }
}
function toggleSelectAll() {
  !selectedContacts.value.length
    ? (selectedContacts.value = data.value?.map((contact) => contact._id) || [])
    : (selectedContacts.value = []);
}
function isSelectedContact(contactId: string): boolean {
  return selectedContacts.value.includes(contactId);
}
function toggleSelection(contactId: string): void {
  isSelectedContact(contactId)
    ? selectedContacts.value.splice(
      selectedContacts.value.indexOf(contactId),
      1
    )
    : selectedContacts.value.push(contactId);
}
async function bulkDelete() {
  try {
    await $fetch(`/api/contacts/bulk/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userId: authStore.userId,
      },
      body: selectedContacts.value,
    });
    await refreshContacts();
    refreshContactsCount();
    selectAll.value = false;
    isOpen.value = false;
  } catch (error) {
    console.error(error);
  }
}
function executeBulkAction() {
  switch (bulkAction.value.toLowerCase()) {
    case "delete":
      initiateDeletion("");
      break;
  }
}
</script>
