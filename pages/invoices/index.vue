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
    <BaseNote class="mb-4" v-if="invoiceCount === 0">
      <p>
        Du hast noch keine Rechnungen angelegt. Klicke auf "Rechnung erstellen"
        um eine neue Rechnung zu erstellen.
      </p>
    </BaseNote>
    <div>
      <div class="mb-2 flex items-center gap-8">
        <div class="">
          <div v-if="!invoicesPending">
            <span class="text-sm font-bold text-secondary-100">{{
              invoices?.invoices?.length
            }}</span>
            <span class="text-sm font-bold text-secondary-100"> von </span>
            <span
              v-if="invoiceCount"
              class="text-sm font-bold text-secondary-100"
              >{{ invoiceCount }}</span
            >
            <span class="text-sm font-bold text-secondary-100">
              Rechnungen</span
            >
          </div>
          <div v-else>
            <USkeleton class="h-4 w-[150px] bg-secondary-100" />
          </div>
        </div>
        <div class="flex gap-4 text-sm">
          <USelectMenu
            v-model="selectedYear"
            :options="years.data"
            placeholder="Wähle ein Jahr aus"
          >
            <template #label>
              <span v-if="selectedYear" class="truncate">{{
                selectedYear
              }}</span>
              <span v-else>Wähle ein Jahr aus</span>
            </template>
          </USelectMenu>
          <USelectMenu
            v-if="clients"
            v-model="selectecClient"
            :options="clients"
            multiple
            option-attribute="company"
            value-attribute="_id"
          >
            <template #label>
              <span v-if="selectecClient.length" class="truncate"
                >{{ selectecClient.length }} Kunden ausgewählt</span
              >
              <span v-else>Wähle einen Kunden aus</span>
            </template>
          </USelectMenu>
        </div>
      </div>
      <div v-if="!invoicesPending && !!invoices?.invoices?.length">
        <table
          class="lg:text-md min-w-full overflow-hidden rounded-lg text-xs shadow-lg md:text-sm dark:text-gray-400"
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
              <th class="px-6 py-5 text-left">Rechnungsnummer</th>
              <th class="px-6 py-5 text-left">Titel</th>
              <th class="px-6 py-5 text-left">Kunde</th>
              <th class="px-6 py-5 text-left">Datum</th>
              <th class="px-6 py-5 text-left">Status</th>
              <th class="px-6 py-5 text-right">Netto</th>
              <th class="px-6 py-5 text-right">Mwst.</th>
              <th class="px-6 py-5 text-right">Brutto</th>
              <th class="px-6 py-5 text-right">Aktion</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="invoice in invoices.invoices"
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
                <span :title="getClientName(invoice.client)">
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
                <span class="flex justify-end gap-2">
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
          <tfoot>
            <tr class="bg-blue-90 text-white font-bold">
              <td></td>
              <td colspan="5" class="px-6 py-5 font-bold">Summe</td>
              <td class="whitespace-nowrap px-6 py-3 text-right">
                {{
                  formatCurrencyAmount(formatCentToAmount(invoices?.totalAcc))
                }}
              </td>
              <td class="whitespace-nowrap px-6 py-3 text-right">
                {{
                  formatCurrencyAmount(formatCentToAmount(invoices?.taxesAcc))
                }}
              </td>
              <td class="whitespace-nowrap px-6 py-3 text-right">
                {{
                  formatCurrencyAmount(
                    formatCentToAmount(invoices?.totalWithTaxesAcc)
                  )
                }}
              </td>
              <td></td>
            </tr>
          </tfoot>
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
          class="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-red-500"
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
const selectecClient = ref<string>("");

const { data: years, pending: yearsPending } = useFetch<string[]>(
  `/api/invoices/years/get`,
  {
    lazy: true,
    method: "POST",
    headers: {
      userid: authStore.userId,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

type ApiResponseInvoice = {
  invoices: Invoice[];
  totalAcc: number;
  taxesAcc: number;
  totalWithTaxesAcc: number;
};

const selectedYear = ref<string>();

watch(yearsPending, (value) => {
  console.log("yearsPending", value);
  if (!value) {
    console.log("years", years.value);
    selectedYear.value = years?.value?.data[years?.value?.data.length - 1];
  }
});

const {
  data: invoices,
  refresh: refreshInvoices,
  pending: invoicesPending,
} = useFetch<ApiResponseInvoice>(`/api/invoices/get`, {
  lazy: true,
  method: "POST",
  headers: {
    userid: authStore.userId,
    Authorization: `Bearer ${authStore.accessToken}`,
  },
  params: {
    year: selectedYear,
    client: selectecClient,
  },
});

const { data: invoiceCount, refresh: refreshInvoiceCount } = useFetch<
  Invoice[]
>(`/api/invoices/count/get`, {
  method: "POST",
  lazy: true,
  headers: {
    userId: authStore.userId,
    Authorization: `Bearer ${authStore.accessToken}`,
  },
});

const { data: clients } = useFetch<Client[]>(`/api/clients/get`, {
  method: "POST",
  lazy: true,
  headers: {
    userId: authStore.userId,
    Authorization: `Bearer ${authStore.accessToken}`,
  },
});

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
const bulkActionOptions = ref(["Löschen"]);

function toggleSelectAll() {
  selectAll.value = !selectAll.value;
  if (selectAll.value && invoices.value?.invoices) {
    selectedInvoices.value = invoices?.value?.invoices.map(
      (invoice) => invoice._id
    );
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
  console.log("bulkAction", bulkAction.value);
  switch (bulkAction.value) {
    case "Löschen":
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
