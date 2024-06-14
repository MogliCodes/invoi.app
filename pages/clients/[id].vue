<template>
  <section v-if="client">
    <div class="w-2/3">
      <BaseHeadline
        type="h1"
        class="mb-8 dark:text-white"
        :text="`${client?.company}`"
      />
    </div>
    <div class="flex flex-col gap-10 w-1/2">
      <section>
        <BaseHeadline type="h2" text="Client information" />
        <BaseBox v-if="company && street && zip && city">
          <div class="flex flex-col items-start gap-4">
            <div class="w-full">
              <label class="text-gray-400" for="">Company</label>
              <BaseInput
                v-if="company"
                v-model="company"
                class="bg-white dark:text-black"
                type="text"
              />
            </div>
            <div class="w-full">
              <label class="text-gray-400" for="">Street</label>
              <BaseInput
                v-if="street"
                v-model="street"
                class="bg-white dark:text-black"
                type="text"
              />
            </div>
            <BaseInput
              v-if="zip"
              v-model="zip"
              class="bg-white dark:text-black"
              type="text"
            />
            <BaseInput
              v-if="city"
              v-model="city"
              class="bg-white dark:text-black"
              type="text"
            />
            <BaseInput
              v-model="taxId"
              class="bg-white dark:text-black"
              type="text"
            />
            <BaseButton text="Save client" @click="patchClient" />
          </div>
        </BaseBox>
      </section>
      <section>
        <BaseHeadline type="h2" text="Client-specific rates and prices" />
        <BaseBox v-if="company && street && zip && city">
          <div class="flex flex-col items-start gap-4">
            <table
              class="min-w-full overflow-hidden rounded-lg dark:text-gray-400"
            >
              <thead class="bg-blue-90 text-white">
                <tr>
                  <th class="py-5 pl-6 text-left">Service</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
                ></tr>
              </tbody>
            </table>
            <BaseButton text="Save client" @click="patchClient" />
          </div>
        </BaseBox>
      </section>
      <section>
        <BaseHeadline type="h2" :text="`Invoices to ${client.company}`" />

        <table
          class="min-w-full overflow-hidden rounded-lg dark:text-gray-400 shadow-md"
          v-if="invoices"
        >
          <thead class="bg-blue-90 text-white">
            <th class="py-5 pl-6 text-left">Nr.</th>
            <th class="py-5 pl-6 text-left">Title</th>
            <th class="py-5 pl-6 text-left">Status</th>
            <th class="py-5 pl-6 text-left">Total</th>
          </thead>
          <tbody>
            <tr
              class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
              v-for="invoice in invoices"
            >
              <td class="py-3 pl-6">{{ invoice.nr }}</td>
              <td class="py-3 pl-6">{{ invoice.title }}</td>
              <td class="py-3 pl-6">{{ invoice.status }}</td>
              <td class="py-3 pl-6">
                {{
                  formatCurrencyAmount(
                    formatCentToAmount(invoice.totalWithTaxes)
                  )
                }}
              </td>
            </tr>
          </tbody>
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

const { data: invoices } = useFetch<Invoice>(
  `http://localhost:8000/restapi/invoice/client?client=${route.params.id}`,
  {
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
