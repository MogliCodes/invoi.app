<template>
  <main class="flex flex-col items-start">
    <section class="lg:mb-12 w-full">
      <!-- Desktop buttons -->
      <div class="hidden sm:flex sm:flex-row sm:items-center gap-3">
        <BaseButton variant="yellow" to="/invoices/create" text="Rechnung erstellen" />
        <BaseButton variant="outline" to="/invoices/import" text="Rechnungen importieren" />
        <BaseButton variant="outline" to="/invoices/templates" text="Templates verwalten" />
      </div>

      <!-- Mobile action menu -->
      <div class="sm:hidden w-full mb-6">
        <MobileActionMenu main-button-text="Rechnungs-Menü">
          <MobileActionMenuItem to="/invoices/create" text="Rechnung erstellen" icon="i-heroicons-document-plus"
            :is-primary="true" />
          <MobileActionMenuItem to="/invoices/import" text="Rechnungen importieren"
            icon="i-heroicons-arrow-down-tray" />
          <MobileActionMenuItem to="/invoices/templates" text="Templates verwalten"
            icon="i-heroicons-document-duplicate" />
        </MobileActionMenu>
      </div>
    </section>

    <Transition>
      <section v-if="showAdvancedFilters" class="lg:mb-8 w-full">
        <div class="flex flex-col sm:flex-row gap-4">
          <BaseInput placeholder="Search" class="w-full sm:w-auto" />
          <BaseInput placeholder="Search" class="w-full sm:w-auto" />
          <BaseInput placeholder="Search" class="w-full sm:w-auto" />
          <BaseInput placeholder="Search" class="w-full sm:w-auto" />
          <BaseInput placeholder="Search" class="w-full sm:w-auto" />
        </div>
      </section>
    </Transition>

    <BaseNote v-if="invoiceCount === 0" class="mb-4 w-full">
      <p>
        Du hast noch keine Rechnungen angelegt. Klicke auf "Rechnung erstellen"
        um eine neue Rechnung zu erstellen.
      </p>
    </BaseNote>

    <div class="w-full">
      <div class="mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
        <div>
          <div v-if="!invoicesPending">
            <span class="text-sm font-bold text-secondary-100">{{
              invoices?.invoices?.length || 0
            }}</span>
            <span class="text-sm font-bold text-secondary-100"> von </span>
            <span v-if="invoiceCount" class="text-sm font-bold text-secondary-100">{{ invoiceCount }}</span>
            <span class="text-sm font-bold text-secondary-100">
              Rechnungen</span>
          </div>
          <div v-else>
            <USkeleton class="h-4 w-[150px] bg-secondary-100" />
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 text-sm w-full sm:w-auto mb-4 lg:mb-0">
          <USelectMenu v-model="selectedYear" :options="years?.data || []" placeholder="Wähle ein Jahr aus"
            class="w-full sm:w-auto">
            <template #label>
              <span v-if="selectedYear" class="truncate">{{
                selectedYear
              }}</span>
              <span v-else>Wähle ein Jahr aus</span>
            </template>
          </USelectMenu>
          <USelectMenu v-if="clients" v-model="selectecClient" :options="clients" multiple option-attribute="company"
            value-attribute="_id" class="w-full sm:w-auto">
            <template #label>
              <span v-if="selectecClient.length" class="truncate">{{ selectecClient.length }} Kunden ausgewählt</span>
              <span v-else>Wähle einen Kunden aus</span>
            </template>
          </USelectMenu>
        </div>
      </div>

      <div v-if="!invoicesPending && invoices?.invoices && invoices.invoices.length > 0" class="w-full">
        <ResponsiveInvoiceTable :invoices="invoices.invoices" :selected-invoices="selectedInvoices"
          :select-all="selectAll" :clients="clients || []" :total-acc="invoices.totalAcc" :taxes-acc="invoices.taxesAcc"
          :total-with-taxes-acc="invoices.totalWithTaxesAcc" @toggle-selection="toggleSelection"
          @toggle-select-all="toggleSelectAll" @delete="initiateDeletion" />

        <div class="flex flex-col sm:flex-row justify-between py-4 gap-4">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <USelectMenu v-model="bulkAction" class="cursor-pointer !bg-white w-full sm:w-auto" size="xl" color="white"
              :options="bulkActionOptions">
              <template #label>
                {{ bulkAction }}
              </template>
            </USelectMenu>
            <BaseButton size="sm" text="Anwenden" class="w-full sm:w-auto" @click="executeBulkAction" />
          </div>
        </div>
      </div>
    </div>

    <UModal v-model="isOpen">
      <div class="flex flex-col items-center p-4 sm:p-8 text-center">
        <div class="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-red-500">
          <UIcon class="text-2xl text-red-900" name="i-heroicons-trash" />
        </div>
        <BaseHeadline class="mb-2" type="h3" text="Confirm delete" />
        <section v-if="currentInvoiceId">
          <p class="mb-8">Are you sure you want to delete this entry?</p>
          <div class="flex justify-center gap-4">
            <BaseButton variant="red" text="Delete" @click="deleteInvoice()" />
            <BaseButton variant="outline" text="Discard" @click="isOpen = false" />
          </div>
        </section>
        <section v-else>
          <p class="mb-8">
            Are you sure you want to delete the entries with the following ids?
          </p>
          <div class="mb-8 break-all bg-black p-1 text-gray-200 max-h-40 overflow-auto">
            {{ selectedInvoices.toString() }}
          </div>
          <div class="flex justify-center gap-4">
            <BaseButton variant="red" text="Delete" @click="bulkDeleteInvoices" />
            <BaseButton variant="outline" text="Discard" @click="isOpen = false" />
          </div>
        </section>
      </div>
    </UModal>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
import { ref, watch } from 'vue';

definePageMeta({
  title: "Rechnungen",
  layout: "mobilefirst",
});

const authStore = useAuthStore();
const selectecClient = ref<string>("");

const { data: years, pending: yearsPending, error: yearsError } = useFetch<{ data: string[] }>(
  `/api/invoices/years/get`,
  {
    lazy: true,
    method: "POST",
    headers: {
      userid: authStore.userId,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
    default: () => ({ data: [] }),
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
  if (!value && years.value && years.value.data && years.value.data.length > 0) {
    console.log("years", years.value);
    selectedYear.value = years.value.data[years.value.data.length - 1];
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
  default: () => ({
    invoices: [],
    totalAcc: 0,
    taxesAcc: 0,
    totalWithTaxesAcc: 0
  }),
});

const { data: invoiceCount, refresh: refreshInvoiceCount } = useFetch<number>(
  `/api/invoices/count/get`, {
  method: "POST",
  lazy: true,
  headers: {
    userId: authStore.userId,
    Authorization: `Bearer ${authStore.accessToken}`,
  },
  default: () => 0,
});

const { data: clients } = useFetch<Client[]>(`/api/clients/get`, {
  method: "POST",
  lazy: true,
  headers: {
    userId: authStore.userId,
    Authorization: `Bearer ${authStore.accessToken}`,
  },
  default: () => [],
});

function getClientName(clientId: string) {
  if (!clientId || !clients.value) return 'Unknown Client';

  const client = clients.value.find(
    (client: Client) => client._id === clientId
  );
  return client?.company || 'Unknown Client';
}

const showAdvancedFilters = ref(false);
const isOpen = ref(false);
const currentInvoiceId = ref("");
const selectedInvoices = ref<string[]>([]);
const selectAll = ref(false);
const bulkAction = ref("Mehrfachauswahl");
const bulkActionOptions = ref(["Löschen", "EÜR generieren"]);

function toggleSelectAll() {
  selectAll.value = !selectAll.value;
  if (selectAll.value && invoices.value?.invoices) {
    selectedInvoices.value = invoices.value.invoices.map(
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

async function executeBulkAction(): void {
  console.log("bulkAction", bulkAction.value);
  switch (bulkAction.value) {
    case "Löschen":
      isOpen.value = true;
      break;
    case "EÜR generieren":
      console.log("EÜR generieren");
      await generateIncomeSurplusCalculation();
      break;
    default:
      break;
  }
}

const alertStore = useAlertStore();

async function generateIncomeSurplusCalculation() {
  try {
    const res = await $fetch(`/api/incomes/isc`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userid: authStore.userId,
      },
      body: {
        year: selectedYear.value,
      },
    });
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

watch(selectedYear, (newValue) => {
  if (newValue) {
    refreshInvoices();
  }
});

watch(selectecClient, () => {
  refreshInvoices();
});
</script>

<style>
/* we will explain what these classes do next! */
</style>
