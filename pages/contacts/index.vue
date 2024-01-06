<template>
  <div class="container mx-auto flex flex-col items-start">
    <section class="mb-12">
      <BaseHeadline class="mb-4 dark:text-white" type="h1" text="Contacts" />
      <div class="flex items-center gap-3">
        <BaseButton
          to="/contacts/create"
          text="Create contact"
          variant="yellow"
        />
        <BaseButton
          to="/contacts/import"
          text="Import contacts"
          variant="outline"
        />
        <BaseButton
          to="/contacts/categories"
          text="Manage categories"
          variant="outline"
        />
      </div>
    </section>
    <section class="mb-6 flex w-full gap-3">
      <BaseInput
        v-model="searchQuery"
        placeholder="Search …"
        class=""
      ></BaseInput>
      <BaseButton text="Search" @click="searchContact" />
    </section>
    <section class="mb-2 w-full">
      <div class="flex w-full items-center justify-between gap-8">
        <div class="flex gap-3">
          <div>
            <span class="text-sm font-bold text-secondary-100">{{
              contacts?.length
            }}</span>
            <span class="text-sm font-bold text-secondary-100"> of </span>
            <span
              v-if="contactCount"
              class="text-sm font-bold text-secondary-100"
              >{{ contactCount }}</span
            >
            <span class="text-sm font-bold text-secondary-100"> Contacts</span>
          </div>
          <div>
            <span class="text-sm font-bold text-secondary-100"
              >{{ startRange }} to {{ endRange }}</span
            >
          </div>
        </div>
        <div class="flex gap-6">
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
            <template #prev="{ onClick }">
              <UTooltip text="Previous page">
                <UButton
                  icon="i-heroicons-arrow-small-left-20-solid"
                  color="yellow"
                  class="me-2 rtl:[&_span:first-child]:rotate-180"
                  @click="onClick"
                />
              </UTooltip>
            </template>
            <template #next="{ onClick }">
              <UTooltip text="Next page">
                <UButton
                  icon="i-heroicons-arrow-small-right-20-solid"
                  color="yellow"
                  class="ms-2 rtl:[&_span:last-child]:rotate-180"
                  @click="onClick"
                />
              </UTooltip> </template
          ></UPagination>
        </div>
      </div>
    </section>
    <section class="w-full">
      <div v-if="!contacts?.length" class="flex flex-col items-start gap-4">
        <p>No contacts created yet! Start creating your first contact.</p>
      </div>
      <div v-else>
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
                <th class="px-6 py-5 text-left">Firstname</th>
                <th class="px-6 py-5 text-left">Lastname</th>
                <th class="px-6 py-5 text-left">DOB</th>
                <th class="px-6 py-5 text-left">Street</th>
                <th class="px-6 py-5 text-left">Zip</th>
                <th class="px-6 py-5 text-left">City</th>
                <th class="px-6 py-5 text-left">Categories</th>
                <th class="px-6 py-5 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="contact in contacts"
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
                <td class="px-6 py-3">
                  <div class="flex gap-2">
                    <span
                      class="rounded-full bg-blue-500 px-3 py-1 text-sm text-blue-100"
                      >Categorie 1</span
                    >
                    <span
                      class="rounded-full bg-amber-600 px-3 py-1 text-sm text-amber-100"
                      >Categorie 2</span
                    >
                  </div>
                </td>
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
          <BaseButton size="sm" text="Apply" @click="executeBulkAction" />
        </div>
        <UPagination
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
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
const authStore = useAuthStore();

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
const startRange = computed(
  () => 1 + pageSize.value * page.value - pageSize.value
);
const endRange = computed(() => pageSize.value * page.value);

/** ================
 * Data fetching
 ================ */
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const {
  data: contacts,
  refresh: refreshContacts,
}: {
  data: Ref<Array<Contact>>;
  execute: () => void;
  refresh: () => void;
} = useFetch(`${backendBaseUrl}/restapi/contact`, {
  params: {
    page,
    pageSize,
  },
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    ClientId: authStore.userId,
  },
});

const {
  data: contactCount,
  refresh: refreshContactsCount,
}: { data: Ref<number>; refresh: () => void } = useFetch(
  `${backendBaseUrl}/restapi/contact/count`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
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
const searchQuery = ref("");

function searchContact() {
  const {
    data: contactSearchResult,
  }: {
    data: Ref<Array<Contact>>;
    execute: () => void;
    refresh: () => void;
  } = useFetch(
    `${backendBaseUrl}/restapi/contact?search=${searchQuery.value}`,
    {
      params: {
        page,
        pageSize,
      },
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        ClientId: authStore.userId,
      },
    }
  );
}

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
        ClientId: authStore.userId,
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
    ? (selectedContacts.value = contacts.value.map((contact) => contact._id))
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
