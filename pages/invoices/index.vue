<template>
  <div class="container mx-auto">
    <div class="mb-12">
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
    <div v-if="invoices && invoices.length">
      <div class="mb-2">
        <span class="text-sm font-bold text-secondary-100">{{
          invoices?.length
        }}</span>
        <span class="text-sm font-bold text-secondary-100"> of </span>
        <span
          class="text-sm font-bold text-secondary-100"
          v-if="invoiceCount"
          >{{ invoiceCount }}</span
        >
        <span class="text-sm font-bold text-secondary-100"> Invoices</span>
      </div>
      <table class="min-w-full overflow-hidden rounded-lg dark:text-gray-400">
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
            class="rounded p-4 bg-white even:bg-gray-200 dark:even:bg-blue-90 dark:odd:bg-blue-80"
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
  `http://localhost:8000/api/invoice`,
  {
    headers: {
      userId: authStore.userId,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

const { data: invoiceCount } = useFetch<Invoice[]>(
  `http://localhost:8000/api/invoice/count`,
  {
    headers: {
      userId: authStore.userId,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);
</script>
