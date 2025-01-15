<template>
  <section v-if="client">
    <div class="w-2/3">
      <BaseHeadline
        type="h1"
        class="mb-8 dark:text-white"
        :text="`${client?.company}`"
      />
    </div>
    <div class="flex w-2/3 flex-col gap-10">
      <section>
        <BaseHeadline type="h2" text="Client information" />
        <BaseBox v-if="company && street && zip && city">
          <div class="flex flex-col items-start gap-4">
            <div class="w-full">
              <BaseLabel text="Company Name" />
              <BaseInput v-if="company" v-model="company" type="text" />
            </div>
            <div class="w-full">
              <BaseLabel text="Street" />
              <BaseInput v-if="street" v-model="street" type="text" />
            </div>
            <div class="w-full">
              <BaseLabel text="ZIP Code" />
              <BaseInput v-if="zip" v-model="zip" type="text" />
            </div>
            <div class="w-full">
              <BaseLabel text="City" />
              <BaseInput v-if="city" v-model="city" type="text" />
            </div>
            <div class="w-full">
              <BaseLabel text="Tax ID" />
              <BaseInput v-model="taxId" type="text" />
            </div>
            <BaseButton text="Speichern" @click="patchClient" />
          </div>
        </BaseBox>
      </section>

      <section v-if="invoices.invoices">
        <BaseHeadline type="h2" :text="`Invoices to ${client.company}`" />
        <section v-if="!invoices.invoices.length">
          <BaseNote>
            <p>Du hast noch keine Rechnungen für diesen Kunden erstellt.</p>
          </BaseNote>
        </section>
        <table
          v-else
          class="min-w-full overflow-hidden rounded-lg shadow-md dark:text-gray-400 text-xs"
        >
          <thead class="bg-blue-90 text-white">
            <tr>
              <th class="py-5 pl-6 text-left">Nr.</th>
              <th class="py-5 pl-6 text-left">Title</th>
              <th class="py-5 pl-6 text-left">Status</th>
              <th class="py-5 pl-6 text-left">Total</th>
              <th class="py-5 pl-6 text-left">Taxes</th>
              <th class="py-5 pl-6 text-left">Total with taxes</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="invoice in invoices.invoices"
              class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            >
              <td class="py-3 pl-6">{{ invoice.nr }}</td>
              <td class="py-3 pl-6">{{ invoice.title }}</td>
              <td class="py-3 pl-6">
                <InvoiceStatusPill :invoice="invoice" />
              </td>
              <td class="py-3 pl-6 text-right">
                {{ formatCurrencyAmount(formatCentToAmount(invoice.total)) }}
              </td>
              <td class="py-3 pl-6 text-right">
                {{ formatCurrencyAmount(formatCentToAmount(invoice.taxes)) }}
              </td>
              <td class="py-3 pr-6 text-right">
                {{
                  formatCurrencyAmount(
                    formatCentToAmount(invoice.totalWithTaxes)
                  )
                }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="bg-blue-90 text-white">
              <td colspan="3"></td>
              <td class="py-3 pl-6 text-right">
                {{
                  formatCurrencyAmount(formatCentToAmount(invoices.totalAcc))
                }}
              </td>
              <td class="py-3 pl-6 text-right">
                {{
                  formatCurrencyAmount(formatCentToAmount(invoices.taxesAcc))
                }}
              </td>
              <td class="py-3 pr-6 text-right">
                {{
                  formatCurrencyAmount(
                    formatCentToAmount(invoices.totalWithTaxesAcc)
                  )
                }}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
const authStore = useAuthStore();
const alertStore = useAlertStore();
const accessToken = authStore.accessToken;
const route = useRoute();
const { data: client } = useFetch<Client>(`/api/clients/${route.params.id}`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    Userid: authStore.userId,
  },
});

const { data: invoices } = useFetch(`/api/invoices/get`, {
  lazy: true,
  method: "POST",
  headers: {
    userid: authStore.userId,
    Authorization: `Bearer ${authStore.accessToken}`,
  },
  params: {
    client: route.params.id,
  },
});

const { data: contacts } = useFetch<Array<Contact>>(
  `/api/contacts/get?client=${route.params.id}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      Userid: authStore.userId,
    },
  }
);

async function patchClient() {
  try {
    const res = await $fetch(`/api/clients?id=${route.params.id}`, {
      method: "PATCH",
      body: {
        company: company.value,
        street: street.value,
        city: city.value,
        zip: zip.value,
        taxId: taxId.value,
      },
      credentials: "include",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      alertStore.setAlert("success", res.message);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
      navigateTo("/clients");
    }
  } catch (error) {
    console.error(error);
  }
}
const company = ref(client?.value?.company);
const street = ref(client?.value?.street);
const zip = ref(client?.value?.zip);
const city = ref(client?.value?.city);
const taxId = ref(client?.value?.taxId);

watch(
  () => client.value,
  (newValue) => {
    if (newValue) {
      company.value = newValue.company;
      street.value = newValue.street;
      zip.value = newValue.zip;
      city.value = newValue.city;
      taxId.value = newValue.taxId;
    }
  }
);
</script>
