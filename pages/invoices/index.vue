<template>
  <div class="container mx-auto">
    <div class="mb-12 flex items-end justify-between">
      <div>
        <BaseHeadline class="mb-4 dark:text-white" type="h1" text="Invoices" />
        <BaseButtonGroup>
          <BaseButton
            variant="yellow"
            to="/invoices/create"
            text="Create new invoice"
          />
          <BaseButton
            variant="outline"
            to="/invoices/import"
            text="Import invoices"
          />
        </BaseButtonGroup>
      </div>
      <div class="flex w-1/3 items-center gap-4">
        <BaseInput placeholder="Search" />
        <div class="rounded-lg bg-blue-80 p-3">
          <UIcon
            class="block p-1 text-xl text-white"
            name="i-heroicons-adjustments-horizontal"
            @click="toggleAdvancedFilters"
          />
        </div>
      </div>
    </div>
    <Transition>
      <section v-if="showAdvancedFilters" class="mb-8">
        <div class="flex gap-4">
          <BaseInput placeholder="Search" />
          <BaseInput placeholder="Search" />
          <BaseInput placeholder="Search" />
          <BaseInput placeholder="Search" />
          <BaseInput placeholder="Search" />
        </div>
      </section>
    </Transition>
    <div v-if="invoices && invoices.length">
      <div class="mb-2">
        <span class="text-sm font-bold text-secondary-100">{{
          invoices?.length
        }}</span>
        <span class="text-sm font-bold text-secondary-100"> of </span>
        <span
          v-if="invoiceCount"
          class="text-sm font-bold text-secondary-100"
          >{{ invoiceCount }}</span
        >
        <span class="text-sm font-bold text-secondary-100"> Invoices</span>
      </div>
      <div class="overflow-hidden rounded-lg">
        <div
          class="flex items-center justify-between border-b-2 border-blue-80 bg-blue-90 p-4"
        >
          <div class="flex gap-8">
            <div
              class="inline-block border-b-2 border-white font-bold text-white"
            >
              All
            </div>
            <span class="inline-block text-white"> Paid </span>
            <span class="inline-block text-white"> Due </span>
            <span class="inline-block text-white"> Unpaid </span>
          </div>
          <div class="flex items-center gap-0.5">
            <div
              class="rounded-l-lg bg-white bg-opacity-20 p-2 dark:bg-black dark:bg-opacity-70"
            >
              <UIcon
                class="block p-1 text-lg text-white"
                name="i-heroicons-chevron-double-left"
              />
            </div>
            <div
              class="bg-white bg-opacity-20 p-2 dark:bg-black dark:bg-opacity-70"
            >
              <UIcon
                class="block p-1 text-lg text-white"
                name="i-heroicons-chevron-left"
              />
            </div>
            <div
              class="bg-white bg-opacity-20 p-2 dark:bg-black dark:bg-opacity-70"
            >
              <UIcon
                class="block p-1 text-lg text-white"
                name="i-heroicons-chevron-right"
              />
            </div>
            <div
              class="rounded-r-lg bg-white bg-opacity-20 p-2 dark:bg-black dark:bg-opacity-70"
            >
              <UIcon
                class="block border-2 p-1 text-lg text-white"
                name="i-heroicons-chevron-double-right"
              />
            </div>
          </div>
        </div>
        <table class="min-w-full overflow-hidden dark:text-gray-400">
          <thead class="bg-blue-90 text-white">
            <tr>
              <th class="py-5 pl-6 text-left">
                <UCheckbox
                  v-model="selectAll"
                  :checked="selectAll"
                  @click="toggleSelectAll"
                />
              </th>
              <th class="px-6 py-5 text-left">Rechnungsnummer</th>
              <th class="px-6 py-5 text-left">Title</th>
              <th class="px-6 py-5 text-left">Client</th>
              <th class="px-6 py-5 text-left">Date</th>
              <th class="px-6 py-5 text-left">Status</th>
              <th class="px-6 py-5 text-left">Netto</th>
              <th class="px-6 py-5 text-left">Mwst.</th>
              <th class="px-6 py-5 text-left">Brutto</th>
              <th class="px-6 py-5 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="invoice in invoices"
              :key="invoice?._id"
              class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            >
              <td class="py-3 pl-6">
                <UCheckbox
                  :checked="isSelectedInvoice(invoice._id)"
                  @click="toggleSelection(invoice._id)"
                />
              </td>
              <td class="px-6 py-3">
                {{ invoice?.nr }}
              </td>
              <td class="px-6 py-3">{{ invoice.title }}</td>
              <td class="px-6 py-3">{{ invoice.client }}</td>
              <td class="px-6 py-3">
                {{
                  new Date(invoice.date)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join(".")
                }}
              </td>
              <td class="px-6 py-3">{{ invoice?.status || "unpaid" }}</td>
              <td class="px-6 py-3">
                {{ formatCurrencyAmount(formatCentToAmount(invoice.total)) }}
              </td>
              <td class="px-6 py-3">
                {{ formatCurrencyAmount(formatCentToAmount(invoice?.taxes)) }}
              </td>
              <td class="px-6 py-3">
                {{
                  formatCurrencyAmount(
                    formatCentToAmount(invoice?.totalWithTaxes)
                  )
                }}
              </td>
              <td class="px-6 py-3">
                <span class="flex gap-2">
                  <NuxtLink :to="`/invoices/${invoice._id}`">
                    <UIcon
                      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                      name="i-heroicons-eye"
                    />
                  </NuxtLink>
                  <UIcon
                    class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                    name="i-heroicons-trash"
                    @click="initiateDeletion(invoice._id)"
                  />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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
        </div>
      </div>
    </div>
    <UModal v-model="isOpen">
      <div class="flex flex-col items-center p-8 text-center">
        <div
          class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500"
        >
          <UIcon class="text-2xl text-red-900" name="i-heroicons-trash" />
        </div>
        <BaseHeadline class="mb-2" type="h3" text="Confirm delete" />
        <section v-if="currentInvoiceId">
          <p class="mb-8">Are you sure you want to delete this entry?</p>
          <div class="flex justify-center gap-4">
            <BaseButton variant="red" text="Delete" @click="deleteInvoice()" />
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
            {{ selectedInvoices.toString() }}
          </div>
          <div class="flex justify-center gap-4">
            <BaseButton
              variant="red"
              text="Delete"
              @click="bulkDeleteInvoices"
            />
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

type Invoice = {
  nr: string;
  client: string;
  project: string;
  date: Date;
  taxes: string;
  totalWithTaxes: string;
};
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: invoices, refresh: refreshInvoices } = useFetch<Invoice[]>(
  `${backendBaseUrl}/restapi/invoice`,
  {
    headers: {
      userId: authStore.userId,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

const { data: invoiceCount, refresh: refreshInvoiceCount } = useFetch<
  Invoice[]
>(`${backendBaseUrl}/restapi/invoice/count`, {
  headers: {
    userId: authStore.userId,
    Authorization: `Bearer ${authStore.accessToken}`,
  },
});

const showAdvancedFilters = ref(false);

function toggleAdvancedFilters() {
  showAdvancedFilters.value = !showAdvancedFilters.value;
}

const isOpen = ref(false);
const currentInvoiceId = ref("");
const selectedInvoices = ref<string[]>([]);
const selectAll = ref(false);
const bulkAction = ref("Bulk actions");
const bulkActionOptions = ref([
  "Delete",
  "Mark as paid",
  "Mark as unpaid",
  "Mark as overdue",
]);

function toggleSelectAll() {
  selectAll.value = !selectAll.value;
  if (selectAll.value) {
    selectedInvoices.value = invoices.value.map((invoice) => invoice._id);
  } else {
    selectedInvoices.value = [];
  }
}
const isSelectedInvoice = (invoiceId: string) =>
  selectedInvoices.value.includes(invoiceId);

function toggleSelection(invoiceId: string) {
  isSelectedInvoice(invoiceId)
    ? selectedInvoices.value.splice(
        selectedInvoices.value.indexOf(invoiceId),
        1
      )
    : selectedInvoices.value.push(invoiceId);
}

function initiateDeletion(contactId: string): void {
  isOpen.value = true;
  currentInvoiceId.value = contactId;
}

function executeBulkAction(): void {
  switch (bulkAction.value) {
    case "Delete":
      isOpen.value = true;
      break;
    case "Mark as paid":
      break;
    case "Mark as unpaid":
      break;
    case "Mark as overdue":
      break;
    default:
      break;
  }
}

function bulkDelete(): void {
  isOpen.value = false;
}

async function deleteInvoice() {
  try {
    await useFetch(`/api/invoices?id=${currentInvoiceId.value}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        ClientId: authStore.userId,
      },
    });
    refreshInvoiceCount();
    refreshInvoices();
    isOpen.value = false;
  } catch (error) {
    console.error(error);
  }
}

async function bulkDeleteInvoices() {
  try {
    await useFetch(`/api/invoices/bulk/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        ClientId: authStore.userId,
      },
      body: selectedInvoices.value,
    });
    refreshInvoices();
    refreshInvoiceCount();
    isOpen.value = false;
  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
/* we will explain what these classes do next! */
</style>
