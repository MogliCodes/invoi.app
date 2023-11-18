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
        <div>
          <label class="dark:text-white" for="">Client</label>
        </div>
        <USelectMenu
          v-if="clients"
          v-model="selectedClient"
          class="mb-3"
          option-attribute="company"
          :options="clients"
        >
          <template #label>
            {{ selectedClient?.company }}
          </template>
        </USelectMenu>
        <div>
          <label class="dark:text-white" for="">Invoice titel</label>
          <BaseInput
            v-model="invoiceTitle"
            size="sm"
            placeholder="Rechnung August 2024"
          />
        </div>
      </div>
      <div class="w-1/2 flex flex-col gap-3">
        <div>
          <label class="dark:text-white" for="">Invoice number</label>
          <BaseInput
            v-model="invoiceNumber"
            size="sm"
            placeholder="invoiceNumber"
          />
        </div>
        <div>
          <label class="dark:text-white" for="">Invoice date</label>

          <BaseInput
            v-model="invoiceDate"
            type="date"
            size="sm"
            placeholder="invoiceDate"
          />
        </div>
        <div>
          <UCheckbox v-model="hasTaxes" name="taxes" label="Add taxes" />
        </div>
      </div>
    </BaseBox>
    <BaseHeadline type="h2" text="Invoice items" />
    <div class="shadow-lg">
      <table class="min-w-full overflow-hidden rounded-lg dark:text-gray-400">
        <thead class="bg-blue-90 text-white">
          <tr>
            <th class="px-6 py-5 text-left">Position</th>
            <th class="px-6 py-5 text-left">Description</th>
            <th class="px-6 py-5 text-left">
              <span contenteditable>Stundensatz</span>
            </th>
            <th class="px-6 py-5 text-left">Faktor</th>
            <th class="px-6 py-5 text-right">Gesamtpreis</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in rows"
            :key="`position-${index}`"
            class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
          >
            <td class="px-6 py-3">{{ row.position }}</td>
            <td class="px-6 py-3">
              <UTextarea v-model="row.description" :rows="1" autoresize />
            </td>
            <td class="px-6 py-3">
              <BaseInput
                v-model.number="row.hours"
                @change="updateRowTotal(index)"
                class="w-auto"
                size="sm"
                type="text"
              />
            </td>
            <td class="px-6 py-3">
              <BaseInput
                v-model.number="row.factor"
                @change="updateRowTotal(index)"
                class="w-auto"
                size="sm"
                type="text"
              />
            </td>
            <td class="px-6 py-3 text-right">
              <span
                >{{
                  row.total.toFixed(2).replace(".", ",").toLocaleString("de-DE")
                }}
                €</span
              >
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="bg-gray-500 text-white dark:bg-gray-800">
            <td colspan="4" class="px-6 py-3">Gesamt</td>
            <td class="px-6 py-3 text-right">
              <span
                >{{
                  totalAmount
                    .toFixed(2)
                    .replace(".", ",")
                    .toLocaleString("de-DE")
                }}
                €</span
              >
            </td>
          </tr>
          <tr v-if="hasTaxes" class="bg-gray-600 text-white dark:bg-gray-900">
            <td colspan="4" class="px-6 py-3">Mwst.</td>
            <td class="px-6 py-3 text-right">
              <span
                >{{
                  taxes.toFixed(2).replace(".", ",").toLocaleString("de-DE")
                }}
                €</span
              >
            </td>
          </tr>
          <tr class="bg-blue-80 text-white">
            <td colspan="4" class="px-6 py-5">
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
          @click="createContact"
          variant="yellow"
          text="Create invoice"
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
      class="fixed z-30 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center p-12"
      v-if="showPreview"
    >
      <div class="w-full h-full">
        <div class="a4 bg-white mx-auto">
          <div v-html="invoicePreviewHtml"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
const alertStore = useAlertStore();
const authStore = useAuthStore();
const accessToken = authStore.accessToken;
const showPreview = ref(false);

/* ==============
 * Data fetching
 ============== */
const { data: clients } = useFetch(`http://localhost:8000/api/client`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    ClientId: authStore.userId,
  },
});

/* ==============
 * Invoice data
 ============== */
const selectedClient = ref(clients?.value?.[0]);
const invoiceTitle = ref();
const invoiceDate = ref();
const invoiceNumber = ref();
const hasTaxes: Ref<boolean> = ref(true);
const rows = ref([
  { position: 1, description: "description", hours: 0, factor: 0, total: 0 },
]);
const totalAmount = computed(() => {
  return rows.value.reduce(
    (accumulator, currentItem) => accumulator + currentItem.total,
    0
  );
});
const taxes = computed(() => {
  return hasTaxes.value ? totalAmount.value * 0.19 : totalAmount.value * 0;
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

function updateRowTotal(index: number): void {
  rows.value[index].total = rows.value[index].hours * rows.value[index].factor;
}

const invoiceToCreate = computed(() => {
  return {};
  // return {
  //   nr: invoiceNumber.value,
  //   client: selectedClient.value?._id,
  //   title: invoiceTitle.value,
  //   date: invoiceDate.value,
  //   taxes: taxes.value,
  //   total: totalAmount.value,
  //   totalWithTaxes: totalWithTaxes.value,
  //   items: JSON.stringify(rows.value),
  //   user: authStore.userId,
  // };
});

async function createContact() {
  try {
    const res = await $fetch("/api/invoices", {
      method: "POST",
      body: invoiceToCreate.value,
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
      navigateTo("/contacts");
    }
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

const invoicePreviewHtml = ref();
async function getInvoicePreview() {
  const { data } = useFetch("../invoice-template.html");
  invoicePreviewHtml.value = data.value;
  console.log(invoicePreviewHtml.value);
  showPreview.value = true;
}
</script>

<style>
.a4 {
  aspect-ratio: 210 / 297;
  max-height: 100%;
  max-width: 100%;
}
</style>
