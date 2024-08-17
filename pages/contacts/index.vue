<template>
  <main :key="pageSize" class="flex flex-col items-start">
    <section class="mb-12">
      <div class="flex items-center gap-3">
        <BaseButton
          to="/contacts/create"
          text="Kontakt erstellen"
          variant="yellow"
        />
        <BaseButton
          to="/contacts/import"
          text="Kontakte importieren"
          variant="outline"
        />
        <BaseButton
          to="/contacts/categories"
          text="Kategorien verwalten"
          variant="outline"
        />
      </div>
    </section>

    <section class="w-full">
      <div
        v-if="!data?.length"
        class="bg-blue-500 bg-opacity-10 border-2 border-blue-500 p-5 rounded-lg flex flex-col items-start gap-4 text-blue-950"
      >
        <p>
          Du hast noch keine Kontakte angelegt. Klicke auf "Kontakt erstellen"
          um einen neuen Kontakt zu erstellen.
        </p>
      </div>
      <div v-else>
        <section class="mb-2 w-full">
          <div class="flex w-full items-center justify-between gap-8">
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
            <div v-if="contactCount > 20" class="flex gap-6">
              <div>
                <USelect
                  v-model.number="pageSize"
                  color="white"
                  :options="pageSizeOptions"
                />
              </div>
              <UPagination
                v-model.number="page"
                size="sm"
                :page-count="pageSize"
                :total="contactCount"
              >
                <template #prev>
                  <UTooltip text="Previous page">
                    <UButton
                      icon="i-heroicons-arrow-small-left-20-solid"
                      color="yellow"
                      class="me-2 rtl:[&_span:first-child]:rotate-180"
                      @click="page--"
                    />
                  </UTooltip>
                </template>
                <template #next>
                  <UTooltip text="Next page">
                    <UButton
                      icon="i-heroicons-arrow-small-right-20-solid"
                      color="yellow"
                      class="ms-2 rtl:[&_span:last-child]:rotate-180"
                      @click="page++"
                    />
                  </UTooltip> </template
              ></UPagination>
            </div>
          </div>
        </section>
        <div class="max-w-full overflow-x-auto rounded-lg shadow-lg">
          <table
            class="min-w-full overflow-hidden rounded-lg dark:text-gray-400"
          >
            <thead class="bg-blue-90 text-white">
              <tr>
                <th class="py-5 pl-6 text-left">
                  <UCheckbox
                    v-model="selectAll"
                    data-testid="toggleAllContacts"
                    :checked="selectAll"
                    @click="toggleSelectAll"
                  />
                </th>
                <th class="px-6 py-5 text-left">Vorname</th>
                <th class="px-6 py-5 text-left">Nachname</th>
                <th class="px-6 py-5 text-left">Geburtsdatum</th>
                <th class="px-6 py-5 text-left">Straße</th>
                <th class="px-6 py-5 text-left">PLZ</th>
                <th class="px-6 py-5 text-left">Stadt</th>
                <th class="px-6 py-5 text-left">Kategorien</th>
                <th class="px-6 py-5 text-left">Handlung</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="contact in data as Array<Contact>"
                :key="contact._id"
                class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
              >
                <td class="py-3 pl-6">
                  <UCheckbox
                    :checked="isSelectedContact(contact._id)"
                    @click="toggleSelection(contact._id)"
                  />
                </td>
                <td class="truncate px-6 py-3">{{ contact.firstname }}</td>
                <td class="px-6 py-3">{{ contact.lastname }}</td>
                <td class="px-6 py-3">
                  {{
                    new Date(contact.dob)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .split("/")
                      .join(".")
                  }}
                </td>
                <td class="line-clamp-1 px-6 py-3">
                  <span class="truncate">{{ contact.street }}</span>
                </td>
                <td class="px-6 py-3">{{ contact.zip }}</td>
                <td class="px-6 py-3">{{ contact.city }}</td>
                <td class="px-6 py-3"></td>
                <td class="px-6 py-3">
                  <span class="flex gap-2">
                    <NuxtLink :to="`/contacts/${contact._id}`">
                      <UIcon
                        class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                        name="i-heroicons-eye"
                      />
                    </NuxtLink>
                    <UIcon
                      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                      name="i-heroicons-trash"
                      @click="initiateDeletion(contact._id)"
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-between py-4">
          <div class="flex items-center gap-2">
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
            <BaseButton size="sm" text="Anwenden" @click="executeBulkAction" />
          </div>
          <UPagination
            v-if="contactCount > 20"
            v-model.number="page"
            size="sm"
            :page-count="pageSize"
            :total="contactCount"
          >
            <template #prev="{ onClick }">
              <UTooltip text="Previous page">
                <UButton
                  icon="i-heroicons-arrow-small-left-20-solid"
                  color="primary"
                  class="me-2 rtl:[&_span:first-child]:rotate-180"
                  @click="onClick"
                />
              </UTooltip>
            </template>
            <template #next="{ onClick }">
              <UTooltip text="Next page">
                <UButton
                  icon="i-heroicons-arrow-small-right-20-solid"
                  color="primary"
                  class="ms-2 rtl:[&_span:last-child]:rotate-180"
                  @click="onClick"
                />
              </UTooltip> </template
          ></UPagination>
        </div>
      </div>
    </section>
    <UModal v-model="isOpen">
      <div class="flex flex-col items-center p-8 text-center">
        <div
          class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500"
        >
          <UIcon class="text-2xl text-red-900" name="i-heroicons-trash" />
        </div>
        <BaseHeadline class="mb-2" type="h3" text="Confirm delete" />
        <section v-if="currentContactId">
          <p class="mb-8">Are you sure you want to delete this entry?</p>
          <div class="flex justify-center gap-4">
            <BaseButton variant="red" text="Delete" @click="deleteContact()" />
            <BaseButton
              variant="outline"
              text="Discard"
              @click="isOpen = false"
            />
          </div>
        </section>
        <section v-else>
          <p class="mb-8">
            Are you sure you want to delete the entries with the following ids?
          </p>
          <div class="mb-8 break-all bg-black p-1 text-gray-200">
            {{ selectedContacts.toString() }}
          </div>
          <div class="flex justify-center gap-4">
            <BaseButton variant="red" text="Delete" @click="bulkDelete()" />
            <BaseButton
              variant="outline"
              text="Discard"
              @click="isOpen = false"
            />
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

/** ================
 * Pagination
 ================ */
const page = ref(1);
const pageSizeOptions = [10, 20, 30, 40, 50];
const pageSize = ref(pageSizeOptions[1]);

/** ================
 * Data fetching
 ================ */
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
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
  "Choose an action",
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
  try {
    await useFetch(`/api/contacts?id=${currentContactId.value}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        UserId: authStore.userId,
      },
    });
    refreshContacts();
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
        userid: authStore.userId,
      },
      body: selectedContacts.value,
    });
    refreshContacts();
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
