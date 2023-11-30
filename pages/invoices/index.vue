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
              <th class="px-6 py-5 text-left">Rechnungsnummer</th>
              <th class="px-6 py-5 text-left">Title</th>
              <th class="px-6 py-5 text-left">Client</th>
              <th class="px-6 py-5 text-left">Date</th>
              <th class="px-6 py-5 text-left">Netto</th>
              <th class="px-6 py-5 text-left">Mwst.</th>
              <th class="px-6 py-5 text-left">Brutto</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="invoice in invoices"
              :key="invoice?._id"
              class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            >
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
              <td class="px-6 py-3">{{ invoice.total }}</td>
              <td class="px-6 py-3">{{ invoice.taxes }}</td>
              <td class="px-6 py-3">{{ invoice.totalWithTaxes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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

const { data: invoices } = useFetch<Invoice[]>(
  `${backendBaseUrl}/api/invoice`,
  {
    headers: {
      userId: authStore.userId,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

const { data: invoiceCount } = useFetch<Invoice[]>(
  `${backendBaseUrl}/api/invoice/count`,
  {
    headers: {
      userId: authStore.userId,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

const showAdvancedFilters = ref(false);

function toggleAdvancedFilters() {
  showAdvancedFilters.value = !showAdvancedFilters.value;
}
</script>

<style>
/* we will explain what these classes do next! */
</style>
