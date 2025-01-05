<template>
  <section v-if="invoiceDrafts">
    <BaseContainer>
      <BaseTable>
        <template #head>
          <BaseTableHeadCell>Rechnungsnummer</BaseTableHeadCell>
          <BaseTableHeadCell>Titel</BaseTableHeadCell>
          <BaseTableHeadCell>Kunde</BaseTableHeadCell>
          <BaseTableHeadCell>Rechnungsdatum</BaseTableHeadCell>
          <BaseTableHeadCell>Status</BaseTableHeadCell>
        </template>
        <template #body>
          <BaseTableRow v-for="invoice in invoiceDrafts" :key="invoice._id">
            <BaseTableCell>{{ invoice.nr }}</BaseTableCell>
            <BaseTableCell>{{ invoice.title }}</BaseTableCell>
            <BaseTableCell>{{ getClientName(invoice.client) }}</BaseTableCell>
            <BaseTableCell>{{
              new Date(invoice.date).toLocaleDateString()
            }}</BaseTableCell>
            <BaseTableCell
              ><InvoiceStatusPill :invoice="invoice"
            /></BaseTableCell>
          </BaseTableRow>
        </template>
      </BaseTable>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import BaseTableRow from "~/components/BaseTable/BaseTableRow.vue";
import BaseTableHeadCell from "~/components/BaseTable/BaseTableHeadCell.vue";

definePageMeta({
  title: "Vorlagen",
});

const authStore = useAuthStore();

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

const { fetchOne } = useClients();
const clients = ref<Array<Client>>([]);

if (invoiceDrafts.value) {
  invoiceDrafts.value.forEach((invoice) => {
    fetchOne(invoice.client).then((client) => {
      clients.value.push(client);
    });
  });
}

function getClientName(clientId: string) {
  const client = clients.value.find((client) => client._id === clientId);
  return client ? client.company : "";
}
</script>
