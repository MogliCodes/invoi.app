<template>
  <div class="container mx-auto">
    <div class="mb-12">
      <BaseHeadline class="mb-4" type="h1" text="My invoices" />
      <BaseButtonGroup>
        <BaseButton
          variant="yellow"
          to="/invoices/create"
          text="Create new invoice"
        />
        <BaseButton
          variant="secondary"
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
      <table class="w-full overflow-hidden rounded-lg">
        <thead class="border-x-2 border-t-2 bg-blue-80 text-white">
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
            class="card rounded border-2 p-4 odd:bg-white even:bg-[rgba(0,0,0,0.05)]"
          >
            <td class="border-r-2 px-6 py-3">
              {{ invoice?.nr }}
            </td>
            <td class="border-r-2 px-6 py-3">{{ invoice.title }}</td>
            <td class="border-r-2 px-6 py-3">{{ invoice.client }}</td>
            <td class="border-r-2 px-6 py-3">
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
            <td class="border-r-2 px-6 py-3">{{ invoice.total }}</td>
            <td class="border-r-2 px-6 py-3">{{ invoice.taxes }}</td>
            <td class="border-r-2 px-6 py-3">{{ invoice.totalWithTaxes }}</td>
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
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

const { data: invoiceCount } = useFetch<Invoice[]>(
  `http://localhost:8000/api/invoice/count`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);
</script>
