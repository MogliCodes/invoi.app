<template>
  <div class="container mx-auto">
    <!-- Page head -->
    <section class="mb-12">
      <div class="flex gap-4">
        <BaseButton text="Position hinzufügen" @click="addPosition" />
        <BaseButton
          text="Vorlage auswählen"
          @click="showDraftSelectModal = true"
        />
      </div>
    </section>
    <section v-if="!validSettings || !clients.length" class="mb-6">
      <BaseNote v-if="!clients.length" class="mb-6">
        <p>
          Du hast noch keinen Kunden angelegt. Bitte lege erst einen Kunden an,
          bevor du eine Rechnung erstellst.
        </p>
        <NuxtLink class="text-blue-600 font-bold" to="/clients/create"
          >Kunden anlegen</NuxtLink
        >
      </BaseNote>
      <BaseNote v-if="!validSettings">
        <p>
          Du hast bisher keine Bankverbindung hinterlegt. Bitte gehe zu den
          Einstellungen und fülle die Bankverbindung aus.
        </p>
        <NuxtLink class="text-blue-600 font-bold" to="/settings#defaults">
          Zu den Einstellungen
        </NuxtLink>
      </BaseNote>
    </section>
    <section v-if="!templates" class="mb-12">
      <BaseNote>
        <p>
          Du hast bisher keine Rechnungstemplates erstellt. Bitte erstelle ein
          Template bevor du eine Rechnung erstellst.
        </p>
        <NuxtLink class="text-blue-600 font-bold" to="/invoices/templates">
          Zu den Templates
        </NuxtLink>
      </BaseNote>
    </section>
    <div v-if="validSettings">
      <!-- Invoice details -->
      <section v-if="validSettings">
        <BaseHeadline type="h2" text="Rechnungsdetails" />
        <BaseBox class="mb-6 flex gap-6">
          <div class="flex w-1/2 flex-col gap-3">
            <div v-if="clients && selectedClient">
              <BaseLabel text="Kunde" />
              <USelect
                v-model="selectedClient"
                size="md"
                placeholder="Wähle einen Kunden"
                option-attribute="company"
                value-attribute="_id"
                :options="clients"
              >
                <template #label>
                  {{ selectedClient?.company }}
                </template>
              </USelect>
            </div>
            <div v-if="selectedClient">
              <BaseLabel text="Kontaktperson" />
              <USelect
                v-model="selectedContact"
                size="md"
                placeholder="Select a contact person"
                :options="contactsPerClient"
                value-attribute="_id"
                option-attribute="firstname"
              >
                <template #label>
                  {{ selectedContact?.firstname }}
                  {{ selectedContact?.lastname }}}
                </template>
              </USelect>
            </div>
            <div>
              <BaseLabel text="Titel" />
              <BaseInput
                v-model="invoiceTitle"
                placeholder="Rechnung MM/JJJJ"
              />
            </div>
            <div>
              <BaseLabel text="Rechnungsnummer" />
              <BaseInput v-model="invoiceNumber" placeholder="invoiceNumber" />
            </div>
          </div>
          <div class="flex w-1/2 flex-col gap-3">
            <div>
              <BaseLabel text="Rechnungsdatum" />
              <BaseInput
                v-model="invoiceDate"
                type="date"
                size="sm"
                placeholder="JJJJ-XXX"
              />
            </div>
            <div>
              <BaseLabel text="Leistungszeitraum" />
              <div class="flex gap-2">
                <BaseInput
                  v-model="performancePeriodStart"
                  type="date"
                  size="sm"
                  placeholder="invoiceDate"
                />
                <BaseInput
                  v-model="performancePeriodEnd"
                  type="date"
                  size="sm"
                  placeholder="invoiceDate"
                />
              </div>
            </div>
            <div>
              <BaseLabel text="Satz" />
              <USelectMenu
                v-model="selectedRateType"
                class="mb-3"
                placeholder="Select rate type"
                :options="rateTypeOptions"
              >
              </USelectMenu>
            </div>
            <div>
              <BaseLabel text="Steuern" />
              <USelectMenu
                v-if="clients"
                v-model="selectedTaxes"
                multiple
                class="mb-3"
                placeholder="Select taxes"
                :options="taxOptions"
              >
              </USelectMenu>
            </div>
            <div class="flex flex-col gap-2">
              <UCheckbox v-model="hasTaxes" name="taxes" label="Add taxes" />
              <UCheckbox
                v-model="isReverseChargeInvoice"
                name="taxes"
                label="Is reverse charge invoice"
              />
              <UCheckbox label="Save as template" />
            </div>
          </div>
        </BaseBox>
      </section>
      <!-- Invoice items -->
      <section>
        <BaseHeadline type="h2" text="Rechnungspositionen" />
        <div class="shadow-lg">
          <BaseTable>
            <template #head>
              <thead class="bg-blue-90 text-white">
                <tr>
                  <th></th>
                  <th class="w-1/12 px-6 py-5 text-left">Position</th>
                  <th class="w-7/12 px-6 py-5 text-left">Beschreibung</th>
                  <th class="w-1/12 px-6 py-5 text-left">
                    <span contenteditable>Preis</span>
                  </th>
                  <th class="w-1/12 px-6 py-5 text-left">Faktor</th>
                  <th class="w-2/12 px-6 py-5 text-right">Gesamtpreis</th>
                </tr>
              </thead>
            </template>
            <template #body>
              <tbody id="rows">
                <InvoicePosition
                  v-for="(row, index) in rows"
                  :key="`position-${index}`"
                  :row="row"
                  @add-row="insertRow(index)"
                  @update:row="updateRowTotal(index, $event)"
                />
              </tbody>
              <tfoot>
                <tr class="bg-gray-500 text-white dark:bg-gray-800">
                  <td colspan="5" class="px-6 py-3">Gesamt</td>
                  <td class="px-6 py-3 text-right">
                    <span>{{ formatCurrencyAmount(totalAmount) }}</span>
                  </td>
                </tr>
                <tr
                  v-for="(tax, index) in selectedTaxes"
                  :key="`tax-${index}`"
                  class="px-6 py-3 text-right"
                >
                  <td class="px-6 py-3 text-right">{{ tax }}</td>
                </tr>
                <tr
                  v-if="hasTaxes"
                  class="bg-gray-600 text-white dark:bg-gray-900"
                >
                  <td colspan="5" class="px-6 py-3">Mwst.</td>
                  <td class="px-6 py-3 text-right">
                    <span>{{ formatCurrencyAmount(taxes) }}</span>
                  </td>
                </tr>
                <tr class="bg-blue-80 text-white">
                  <td colspan="5" class="px-6 py-5">
                    <span class="font-bold">Brutto-Rechnungssumme</span>
                  </td>
                  <td class="px-6 py-5 text-right">
                    <span>{{ formatCurrencyAmount(totalWithTaxes) }}</span>
                  </td>
                </tr>
              </tfoot>
            </template>
          </BaseTable>
        </div>
        <section class="mt-6">
          <div class="flex gap-3">
            <BaseButton
              :disabled="!isValidInvoice"
              variant="yellow"
              text="Create invoice"
              @click="createInvoice"
            />
            <BaseButton
              :disabled="!isValidInvoice"
              variant="outline"
              text="View preview"
              @click="getInvoicePreview"
            />
            <BaseButton
              :disabled="!isValidInvoice"
              variant="outline"
              text="Save as draft"
              @click="saveAsDraft"
            />
          </div>
        </section>
        <section
          v-if="showPreview"
          class="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-80 p-12"
        >
          <div class="h-full w-full">
            <div class="a4 mx-auto bg-white">
              <div ref="preview" v-html="invoicePreviewHtml"></div>
            </div>
          </div>
        </section>
      </section>
      <section
        v-if="isPending"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="flex h-14 w-14 animate-spin items-center justify-center rounded-full bg-white"
        >
          <UIcon class="text-4xl" name="i-heroicons-arrow-path" />
        </div>
      </section>
      <UModal v-model="showDraftSelectModal">
        <template #default>
          <div class="p-6">
            <BaseHeadline type="h2" text="Select a draft" />
            <USelect
              v-if="invoiceDrafts"
              v-model="selectedInvoiceDraft"
              :options="invoiceDrafts"
              class="mb-3"
              placeholder="Select a draft"
              option-attribute="title"
              value-attribute="_id"
            />
            <BaseButton text="Use draft" @click="applyDraft" />
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSortable } from "@vueuse/integrations/useSortable";
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
import { formatAmountToCent } from "~/utils/utils";
import InvoicePosition from "~/components/Invoice/InvoicePosition.vue";

definePageMeta({
  title: "Rechnung erstellen",
});

const alertStore = useAlertStore();
const authStore = useAuthStore();
const accessToken = authStore.accessToken;
const showPreview = ref(false);
const preview = ref(null);

onClickOutside(preview, () => (showPreview.value = false));

const rateTypeOptions = ["hourly", "daily"];
const taxOptions = ["7%", "19%"];
const selectedTaxes = ref([]);

/* ==========================================
 * Data fetching
 ========================================== */
const { data: clients } = useFetch<Array<Client>>(`/api/clients/get`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});

const { data: generatedInvoiceNumber } = useFetch<string>(
  `/api/invoices/number`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

const { data: templates } = useFetch<Array<InvoiceTemplate>>(
  `/api/templates/get`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

/* ==============
 * Invoice data
 ============== */
const isPending = ref(false);
const selectedClient: Ref<Client | null> = ref(
  clients.value ? clients.value[0] : null
);
const selectedContact: Ref<Contact | null> = ref(null);
const currentDate = new Date().toLocaleDateString("en-CA");
const invoiceTitle = ref();
const invoiceDate = ref(currentDate);
const performancePeriodStart = ref(currentDate);
const performancePeriodEnd = ref(currentDate);
const invoiceNumber: Ref<string> = ref(generatedInvoiceNumber.value || "");
const selectedRateType = ref();
const hasTaxes: Ref<boolean> = ref(true);
const isReverseChargeInvoice: Ref<boolean> = ref(false);
const contactsPerClient = ref();
const config = useRuntimeConfig();

type Settings = {
  data: any;
  message: any;
};

const { data: settings } = useFetch<Settings>(`/api/settings/get`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});
const defaultRate = ref(0);
const validSettings = computed<boolean>(() => {
  return (
    settings?.value?.data?.bankName &&
    settings?.value?.data?.iban &&
    settings?.value?.data?.bic
  );
});

const rows: Ref<Array<InvoicePosition>> = ref([
  {
    position: 1,
    description: "Füge eine Beschreibung hinzu",
    hours: defaultRate.value,
    factor: 0,
    total: 0,
  },
]);

watch([settings, selectedRateType], async (newVal) => {
  if (!newVal) return;
  defaultRate.value =
    selectedRateType.value === "daily"
      ? settings?.value?.data?.defaultDailyRate
      : settings?.value?.data?.defaultHourlyRate;
  rows.value = rows.value.map((row) => {
    return {
      ...row,
      hours: defaultRate.value,
      total: row.hours * row.factor,
    };
  });
});

watch(selectedClient, async (newVal) => {
  if (!newVal) return;
  console.log(newVal);
  contactsPerClient.value = await $fetch(
    `/api/contacts/get?clientId=${newVal}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        Userid: authStore.userId,
      },
    }
  );
});

useSortable("#rows", rows);
const totalAmount = computed(() => {
  return rows.value.reduce(
    (accumulator, currentItem) => accumulator + currentItem.total,
    0
  );
});
const taxes = computed(() => {
  return hasTaxes.value ? totalAmount.value * 0.19 : 0;
});
const totalWithTaxes = computed(() => {
  return hasTaxes.value ? totalAmount.value + taxes.value : totalAmount.value;
});

const isValidInvoice = computed(() => {
  return (
    selectedClient.value &&
    invoiceTitle.value &&
    invoiceDate.value &&
    invoiceNumber.value
  );
});

/* ==============
 * Invoice processing
 ============== */
function addPosition() {
  rows.value.push({
    position: rows.value.length + 1,
    description: "Füge eine Beschreibung hinzu",
    hours: defaultRate.value,
    factor: 0,
    total: 0,
  });
}

function insertRow(index: number) {
  console.log("insertRow", index);
  const element = {
    position: index + 2,
    description: "Füge eine Beschreibung hinzu",
    hours: defaultRate.value,
    factor: 0,
    total: 0,
  };
  rows.value.splice(index + 1, 0, element);
  rows.value.map((row, index) => (row.position = index + 1));
}

function updateRowTotal(index: number, event: any): void {
  rows.value[index] = event;
}

const formattedRows = computed(() => {
  return rows.value.map((row) => {
    return {
      position: row.position,
      description: row.description,
      hours: formatAmountToCent(row.hours),
      factor: row.factor.toFixed(2),
      total: formatAmountToCent(row.total),
    };
  });
});

async function createInvoice() {
  const invoiceToCreate = {
    nr: invoiceNumber.value,
    contact: selectedContact.value,
    client: selectedClient.value,
    title: invoiceTitle.value,
    date: invoiceDate.value,
    performancePeriodStart: performancePeriodStart.value,
    performancePeriodEnd: performancePeriodEnd.value,
    taxes: formatAmountToCent(taxes.value),
    total: formatAmountToCent(totalAmount.value),
    totalWithTaxes: formatAmountToCent(totalWithTaxes.value),
    items: JSON.stringify(formattedRows.value),
    user: authStore.userId,
    isReverseChargeInvoice: isReverseChargeInvoice.value,
    status: "unpaid",
  };
  try {
    isPending.value = true;
    const response = await $fetch("/api/invoices", {
      method: "POST",
      body: invoiceToCreate,
      credentials: "include",
      lazy: true,
      headers: {
        authorization: `Bearer ${accessToken}`,
        userid: authStore.userId,
      },
    });
    response.status === 201
      ? (isPending.value = false)
      : (isPending.value = true);
    if (response.status === 201) {
      alertStore.setAlert("success", response.message);
      alertStore.setAlertLink(response.link);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
      navigateTo("/invoices");
    }
  } catch (error) {
    console.error(error);
  }
}

const invoicePreviewHtml = ref();
async function getInvoicePreview() {
  const { data } = useFetch("../invoice-template-single.html");
  invoicePreviewHtml.value = data.value;
  showPreview.value = true;
}

const showDraftSelectModal = ref(false);
function useDraft() {
  showDraftSelectModal.value = true;
}

function applyDraft() {
  if (!invoiceDrafts.value) return;
  const draft = invoiceDrafts.value.find(
    (draft) => draft._id === selectedInvoiceDraft.value
  );
  if (!draft) return;
  selectedClient.value = draft.client;
  invoiceNumber.value = draft.nr;
  invoiceTitle.value = draft.title;
  invoiceDate.value = new Date(draft.date).toLocaleDateString("en-CA");

  const items = JSON.parse(draft.items);
  rows.value = items.map((item: InvoicePosition) => {
    return {
      position: item.position,
      description: item.description,
      hours: formatCentToAmount(item.hours),
      factor: item.factor,
      total: formatCentToAmount(item.total),
    };
  });
  showDraftSelectModal.value = false;
  console.log(items);
}

async function saveAsDraft() {
  const invoiceToCreate = {
    nr: invoiceNumber.value,
    contact: selectedContact.value,
    client: selectedClient.value,
    title: invoiceTitle.value,
    date: invoiceDate.value,
    performancePeriodStart: performancePeriodStart.value,
    performancePeriodEnd: performancePeriodEnd.value,
    taxes: formatAmountToCent(taxes.value),
    total: formatAmountToCent(totalAmount.value),
    totalWithTaxes: formatAmountToCent(totalWithTaxes.value),
    items: JSON.stringify(formattedRows.value),
    user: authStore.userId,
    isReverseChargeInvoice: isReverseChargeInvoice.value,
    status: "unpaid",
  };
  console.log(invoiceToCreate);
  try {
    isPending.value = true;
    const response = await $fetch("/api/invoices/draft", {
      method: "POST",
      body: invoiceToCreate,
      credentials: "include",
      lazy: true,
      headers: {
        authorization: `Bearer ${accessToken}`,
        userid: authStore.userId,
      },
    });
    response.status === 201
      ? (isPending.value = false)
      : (isPending.value = true);
    if (response.status === 201) {
      alertStore.setAlert("success", response.message);
      alertStore.setAlertLink(response.link);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
    }
  } catch (error) {
    console.error(error);
  }
}

const { data: invoiceDrafts } = useFetch<Array<Invoice>>(
  `/api/invoices/draft/get`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

const selectedInvoiceDraft = ref();
</script>

<style>
.a4 {
  height: 297mm;
  width: 210mm;
}
tr:hover .add-row-btn {
  opacity: 1;
  transform: scale(1) translateY(50%);
  transform-origin: center;
  z-index: 100;
}

.box select {
  @apply bg-slate-100;
}
</style>
