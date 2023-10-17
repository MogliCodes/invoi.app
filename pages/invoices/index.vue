<template>
  <div class="container mx-auto">
    <div class="mb-8">
      <BaseHeadline class="mb-20" type="h1" text="My invoices" />
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
    <table class="w-full">
      <thead
        class="border-x-2 border-t-2 border-yellow-dark bg-yellow-dark text-yellow-normal"
      >
        <th class="px-6 py-3 text-left">Rechnungsnummer</th>
        <th class="px-6 py-3 text-left">Title</th>
        <th class="px-6 py-3 text-left">Client</th>
        <th class="px-6 py-3 text-left">Date</th>
        <th class="px-6 py-3 text-left">Netto</th>
        <th class="px-6 py-3 text-left">Mwst.</th>
        <th class="px-6 py-3 text-left">Brutto</th>
      </thead>
      <tbody>
        <tr
          v-for="invoice in invoices"
          :key="invoice?._id"
          class="card rounded border-2 p-4"
        >
          <td class="px-6 py-3">{{ invoice?.nr }}</td>
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
</script>
