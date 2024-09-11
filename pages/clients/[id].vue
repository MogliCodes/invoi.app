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

      <section v-if="invoices">
        <BaseHeadline type="h2" :text="`Invoices to ${client.company}`" />
        <section v-if="!invoices.length">
          <BaseNote>
            <p>Du hast noch keine Rechnungen für diesen Kunden erstellt.</p>
          </BaseNote>
        </section>
        <table
          v-else
          class="min-w-full overflow-hidden rounded-lg shadow-md dark:text-gray-400"
        >
          <thead class="bg-blue-90 text-white">
            <tr>
              <th class="py-5 pl-6 text-left">Nr.</th>
              <th class="py-5 pl-6 text-left">Title</th>
              <th class="py-5 pl-6 text-left">Status</th>
              <th class="py-5 pl-6 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="invoice in invoices"
              class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            >
              <td class="py-3 pl-6">{{ invoice.nr }}</td>
              <td class="py-3 pl-6">{{ invoice.title }}</td>
              <td class="py-3 pl-6">
                <InvoiceStatusPill :invoice="invoice" />
              </td>
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
      <section v-if="revenueByClient">
        <BaseHeadline type="h2" :text="`Umsätze durch ${client.company}`" />
        <BaseBox>
          <div class="flex flex-col">
            <BaseLabel text="Insgesamt" />
            <span class="font-syne text-3xl font-bold text-secondary-100">{{
              formatCurrencyAmount(formatCentToAmount(revenueByClient))
            }}</span>
          </div>
        </BaseBox>
      </section>

      <section v-if="contacts">
        <BaseHeadline type="h2" :text="`Contacts at ${client.company}`" />
        <section v-if="!contacts.length">
          <BaseNote>
            <p>Du hast noch keine Kontakte für diesen Kunden erstellt.</p>
          </BaseNote>
        </section>
        <table
          v-else
          class="min-w-full overflow-hidden rounded-lg shadow-md dark:text-gray-400"
        >
          <thead class="bg-blue-90 text-white">
            <tr>
              <th class="py-5 pl-6 text-left">Firstname</th>
              <th class="py-5 pl-6 text-left">Lastname</th>
              <th class="py-5 pl-6 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="contact in contacts"
              class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            >
              <td class="py-3 pl-6">{{ contact.firstname }}</td>
              <td class="py-3 pl-6">{{ contact.lastname }}</td>
              <td class="py-3 pl-6">{{ contact.email }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section v-if="projects">
        <BaseHeadline type="h2" :text="`Projects with ${client.company}`" />
        <table
          class="min-w-full overflow-hidden rounded-lg shadow-md dark:text-gray-400"
        >
          <thead class="bg-blue-90 text-white">
            <tr>
              <th class="py-5 pl-6 text-left">Title</th>
              <th class="py-5 pl-6 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects"
              class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            >
              <td class="py-3 pl-6">{{ project.title }}</td>
              <td class="py-3 pl-6">{{ project.description }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <BaseHeadline type="h2" text="Client-specific rates and prices" />
        <section v-if="true">
          <BaseNote>
            <p>
              Hier kannst du spezifische Preise für Dienstleistungen für diesen
              Kunden hinterlegen.
            </p>
          </BaseNote>
        </section>
        <div v-else class="flex flex-col items-start gap-4">
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

const { data: invoices } = useFetch<Array<Invoice>>(
  `/api/invoices/client?client=${route.params.id}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      Userid: authStore.userId,
    },
  }
);

const { data: projects } = useFetch<Array<Project>>(
  `http://localhost:8000/restapi/client/projects?clientId=${route.params.id}`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      Userid: authStore.userId,
    },
  }
);

const { data: contacts } = useFetch<Array<Contact>>(
  `/api/contacts/get?clientId=${route.params.id}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      Userid: authStore.userId,
    },
  }
);

const { data: revenueByClient } = useFetch(
  `/api/revenues/client/${route.params.id}`,
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
