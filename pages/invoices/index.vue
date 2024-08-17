<template>
  <div class="container mx-auto">
    <section class="mb-12 flex items-end justify-between">
      <div>
        <BaseButtonGroup>
          <BaseButton
            variant="yellow"
            to="/invoices/create"
            text="Rechnung erstellen"
          />
          <BaseButton
            variant="outline"
            to="/invoices/import"
            text="Rechnungen importieren"
          />
          <BaseButton
            variant="outline"
            to="/invoices/templates"
            text="Templates verwalten"
          />
        </BaseButtonGroup>
      </div>
    </section>
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
    <BaseNote v-if="invoices && invoices.length === 0">
      <p>
        Du hast noch keine Rechnungen angelegt. Klicke auf "Rechnung erstellen"
        um eine neue Rechnung zu erstellen.
      </p>
    </BaseNote>
    <div v-else>
      <div class="mb-2">
        <span class="text-sm font-bold text-secondary-100">{{
          invoices?.length
        }}</span>
        <span class="text-sm font-bold text-secondary-100"> von </span>
        <span
          v-if="invoiceCount"
          class="text-sm font-bold text-secondary-100"
          >{{ invoiceCount }}</span
        >
        <span class="text-sm font-bold text-secondary-100"> Rechnungen</span>
      </div>
      <div class="overflow-hidden rounded-lg">
        <table class="min-w-full overflow-hidden shadow-lg dark:text-gray-400">
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
              <th class="px-6 py-5 text-left">Titel</th>
              <th class="px-6 py-5 text-left">Kunde</th>
              <th class="px-6 py-5 text-left">Datum</th>
              <th class="px-6 py-5 text-left">Status</th>
              <th class="px-6 py-5 text-left">Netto</th>
              <th class="px-6 py-5 text-left">Mwst.</th>
              <th class="px-6 py-5 text-left">Brutto</th>
              <th class="px-6 py-5 text-left">Aktion</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="invoice in invoices as Array<Invoice>"
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
              <td class="px-6 py-3">
                <span :title="invoice.title">{{ invoice.title }}</span>
              </td>
              <td class="px-6 py-3">
                <span
                  :title="getClientName(invoice.client)"
                  class="line-clamp-1"
                >
                  {{ getClientName(invoice.client) }}
                </span>
              </td>
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
              <td class="px-6 py-3">
                <InvoiceStatusPill :invoice="invoice" />
              </td>
              <td class="whitespace-nowrap px-6 py-3 text-right">
                {{ formatCurrencyAmount(formatCentToAmount(invoice.total)) }}
              </td>
              <td class="whitespace-nowrap px-6 py-3 text-right">
                {{ formatCurrencyAmount(formatCentToAmount(invoice?.taxes)) }}
              </td>
              <td class="whitespace-nowrap px-6 py-3 text-right">
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
                  <a
                    download
                    href="file://Users/dennisfink/Workspace/MogliCodes/invoi/invoi-backend/tmp/2025/2025-001_ACME-GmbH_Test.pdf"
                  >
                    <UIcon
                      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                      name="i-heroicons-document-text"
                    />
                  </a>
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
              class="cursor-pointer !bg-white"
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
import { useAlertStore } from "~/stores/alert";

definePageMeta({
  title: "Rechnungen",
});

const authStore = useAuthStore();
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: invoices, refresh: refreshInvoices } = useFetch<Invoice[]>(
  `/api/invoices/get`,
  {
    method: "POST",
    headers: {
      userid: authStore.userId,
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

const { data: clients } = useFetch<Client[]>(
  `${backendBaseUrl}/restapi/client`,
  {
    headers: {
      userId: authStore.userId,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

function getClientName(clientId: string) {
  const client = clients?.value?.find(
    (client: Client) => client._id === clientId
  );
  return client?.company;
}

const showAdvancedFilters = ref(false);
const isOpen = ref(false);
const currentInvoiceId = ref("");
const selectedInvoices = ref<string[]>([]);
const selectAll = ref(false);
const bulkAction = ref("Mehrfachauswahl");
const bulkActionOptions = ref([
  "Löschen",
  "Mark as paid",
  "Mark as unpaid",
  "Mark as overdue",
]);

function toggleSelectAll() {
  selectAll.value = !selectAll.value;
  if (selectAll.value && invoices.value) {
    selectedInvoices.value = invoices?.value.map((invoice) => invoice._id);
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

const alertStore = useAlertStore();

async function deleteInvoice() {
  try {
    const res = await $fetch(`/api/invoices?id=${currentInvoiceId.value}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        ClientId: authStore.userId,
      },
    });
    await refreshInvoiceCount();
    await refreshInvoices();
    isOpen.value = false;
    console.log(res);
    if (res.status === 200) {
      alertStore.setAlert("success", res.message);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
    }
  } catch (error) {
    console.error(error);
  }
}

async function bulkDeleteInvoices() {
  try {
    const res = await $fetch(`/api/invoices/bulk/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        ClientId: authStore.userId,
      },
      body: selectedInvoices.value,
    });
    await refreshInvoices();
    await refreshInvoiceCount();
    isOpen.value = false;
    console.log(res);
    if (res.status === 200) {
      alertStore.setAlert("success", res.message);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
/* we will explain what these classes do next! */
</style>
