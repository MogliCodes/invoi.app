<template>
  <div class="container mx-auto">
    <div class="mb-12">
      <BaseHeadline
        class="mb-4 dark:text-white"
        type="h1"
        text="Create a new invoice"
      />
      <BaseButton text="Add position" @click="addPosition" />
    </div>
    <BaseHeadline type="h2" text="Invoice details" />
    <BaseBox class="mb-6 flex gap-6">
      <div class="w-1/2">
        <div v-if="clients && selectedClient">
          <div>
            <label class="dark:text-white" for="">Client</label>
          </div>
          <USelectMenu
            v-model="selectedClient"
            class="mb-3"
            option-attribute="company"
            :options="clients"
          >
            <template #label>
              {{ selectedClient?.company }}
            </template>
          </USelectMenu>
        </div>
        <div>
          <label class="dark:text-white" for="">Invoice titel</label>
          <BaseInput
            v-model="invoiceTitle"
            size="sm"
            placeholder="Rechnung August 2024"
          />
        </div>
      </div>
      <div class="flex w-1/2 flex-col gap-3">
        <div v-if="invoiceNumber">
          <label class="dark:text-white" for="">Invoice number</label>
          <BaseInput
            v-model="invoiceNumber"
            size="sm"
            placeholder="invoiceNumber"
          />
        </div>
        <div>
          <label class="dark:text-white" for="">Date</label>

          <BaseInput
            v-model="invoiceDate"
            type="date"
            size="sm"
            placeholder="invoiceDate"
          />
        </div>
        <div>
          <label class="dark:text-white" for="">Performance period</label>
          <div class="flex gap-2">
            <BaseInput
              v-model="performancePeriodStart"
              type="date"
              size="sm"
              placeholder="invoiceDate"
            /><BaseInput
              v-model="performancePeriodEnd"
              type="date"
              size="sm"
              placeholder="invoiceDate"
            />
          </div>
        </div>
        <div>
          <label class="dark:text-white" for="">Taxes</label>
          <USelectMenu
            v-if="clients"
            v-model="selectedTaxes"
            multiple
            class="mb-3"
            placeholder="Select people"
            :options="taxOptions"
          >
          </USelectMenu>
        </div>
        <div>
          <UCheckbox v-model="hasTaxes" name="taxes" label="Add taxes" />
        </div>
      </div>
    </BaseBox>
    <BaseHeadline type="h2" text="Invoice items" />
    <div class="shadow-lg">
      <table class="min-w-full rounded-lg dark:text-gray-400">
        <thead class="bg-blue-90 text-white">
          <tr>
            <th></th>
            <th class="w-1/12 px-6 py-5 text-left">Position</th>
            <th class="w-7/12 px-6 py-5 text-left">Description</th>
            <th class="w-1/12 px-6 py-5 text-left">
              <span contenteditable>Preis</span>
            </th>
            <th class="w-1/12 px-6 py-5 text-left">Faktor</th>
            <th class="w-2/12 px-6 py-5 text-right">Gesamtpreis</th>
          </tr>
        </thead>
        <tbody id="rows">
          <tr
            v-for="(row, index) in rows"
            :key="`position-${index}`"
            class="relative rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
          >
            <td
              class="add-row-btn z-100 absolute -left-5 translate-y-1/2 bottom-0 flex h-10 w-10 scale-50 cursor-pointer items-center justify-center rounded-full bg-secondary-100 opacity-0 transition-all"
              @click="insertRow(index)"
            >
              <UIcon name="i-heroicons-plus" class="text-xl text-white" />
            </td>
            <td class="w-1/12 px-6 py-3">{{ row.position }}</td>
            <td class="w-7/12 px-6 py-3">
              <RichTextEditor :content="row.description"></RichTextEditor>
            </td>
            <td class="w-1/12 px-6 py-3 align-top">
              <BaseInput
                v-model.number="row.hours"
                class="w-auto"
                size="sm"
                type="number"
                @change="updateRowTotal(index)"
              />
            </td>
            <td class="w-1/12 px-6 py-3 align-top">
              <BaseInput
                v-model.number="row.factor"
                class="w-auto"
                size="sm"
                type="number"
                @change="updateRowTotal(index)"
              />
            </td>
            <td class="w-2/12 px-6 py-3 text-right align-top">
              <span
                >{{
                  row.total.toFixed(2).replace(".", ",").toLocaleString()
                }}
                €</span
              >
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="bg-gray-500 text-white dark:bg-gray-800">
            <td colspan="5" class="px-6 py-3">Gesamt</td>
            <td class="px-6 py-3 text-right">
              <span
                >{{
                  totalAmount.toFixed(2).replace(".", ",").toLocaleString()
                }}
                €</span
              >
            </td>
          </tr>
          <tr class="px-6 py-3 text-right" v-for="tax in selectedTaxes">
            <td class="px-6 py-3 text-right">{{ tax }}</td>
          </tr>
          <tr v-if="hasTaxes" class="bg-gray-600 text-white dark:bg-gray-900">
            <td colspan="5" class="px-6 py-3">Mwst.</td>
            <td class="px-6 py-3 text-right">
              <span
                >{{
                  taxes.toFixed(2).replace(".", ",").toLocaleString()
                }}
                €</span
              >
            </td>
          </tr>
          <tr class="bg-blue-80 text-white">
            <td colspan="5" class="px-6 py-5">
              <span class="font-bold">Brutto-Rechnungssumme</span>
            </td>
            <td class="px-6 py-5 text-right">
              <span
                >{{
                  totalWithTaxes
                    .toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                    .replace(/\.(?=.*\.)/, ",")
                }}
                €</span
              >
            </td>
          </tr>
        </tfoot>
      </table>
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
          variant="outline"
          text="View preview"
          @click="getInvoicePreview"
        />
      </div>
    </section>
    <section></section>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSortable } from "@vueuse/integrations/useSortable";
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
const alertStore = useAlertStore();
const authStore = useAuthStore();
const accessToken = authStore.accessToken;
const showPreview = ref(false);
const preview = ref(null);

onClickOutside(preview, () => (showPreview.value = false));

type Client = {
  _id: string;
  company: string;
  street: string;
  zip: string;
  city: string;
  user: string;
};

const taxOptions = ["7%", "19%"];
const selectedTaxes = ref([]);

/* ==============
 * Data fetching
 ============== */
const { data: clients } = useFetch<Array<Client>>(
  `http://localhost:8000/api/client`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
    },
  }
);

const { data: generatedInvoiceNumber } = useFetch<string>(
  `http://localhost:8000/api/invoice/number`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

/* ==============
 * Invoice data
 ============== */
watch(clients, (newVal) => {
  selectedClient.value = newVal?.[0];
});
const selectedClient: Ref<Client | null> = ref(clients?.value?.[0] || null);
const currentDate = new Date().toLocaleDateString("en-CA");
const invoiceTitle = ref();
const invoiceDate = ref(currentDate);
const performancePeriodStart = ref(currentDate);
const performancePeriodEnd = ref(currentDate);
const invoiceNumber: Ref<string> = ref(generatedInvoiceNumber.value || "");
const hasTaxes: Ref<boolean> = ref(true);
const rows = ref([
  { position: 1, description: "description", hours: 0, factor: 0, total: 0 },
]);
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
    description: "description",
    hours: 0,
    factor: 0,
    total: 0,
  });
}

function insertRow(index: number) {
  const element = {
    position: index + 2,
    description: "description",
    hours: 0,
    factor: 0,
    total: 0,
  };
  rows.value.splice(index + 1, 0, element);
  rows.value.map((row, index) => (row.position = index + 1));
}

function updateRowTotal(index: number): void {
  rows.value[index].total = rows.value[index].hours * rows.value[index].factor;
}

async function createInvoice() {
  const invoiceToCreate = {
    nr: invoiceNumber.value,
    client: selectedClient.value?._id,
    title: invoiceTitle.value,
    date: invoiceDate.value,
    performancePeriodStart: performancePeriodStart.value,
    performancePeriodEnd: performancePeriodEnd.value,
    taxes: taxes.value,
    total: totalAmount.value,
    totalWithTaxes: totalWithTaxes.value,
    items: JSON.stringify(rows.value),
    user: authStore.userId,
  };
  try {
    const res = await $fetch("/api/invoices", {
      method: "POST",
      body: invoiceToCreate,
      credentials: "include",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 201) {
      alertStore.setAlert("success", res.message);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
      navigateTo("/invoices");
    }
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

const invoicePreviewHtml = ref();
async function getInvoicePreview() {
  const { data } = useFetch("../invoice-template.html");
  console.log("data html");
  invoicePreviewHtml.value = data.value;
  console.log(invoicePreviewHtml.value);
  showPreview.value = true;
}
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
</style>
