<template>
  <section v-if="invoiceDrafts">
    <BaseTable>
      <template #head>
        <BaseTableHeadCell>Rechnungsnummer</BaseTableHeadCell>
        <BaseTableHeadCell>Titel</BaseTableHeadCell>
        <BaseTableHeadCell>Kunde</BaseTableHeadCell>
        <BaseTableHeadCell>Rechnungsdatum</BaseTableHeadCell>
        <BaseTableHeadCell>Status</BaseTableHeadCell>
        <BaseTableHeadCell>Handlung</BaseTableHeadCell>
      </template>
      <template #body>
        <BaseTableRow v-for="invoice in invoiceDrafts" :key="invoice._id">
          <BaseTableCell>{{ invoice.nr }}</BaseTableCell>
          <BaseTableCell>{{ invoice.draftTitle }}</BaseTableCell>
          <BaseTableCell>{{ getClientName(invoice.client) }}</BaseTableCell>
          <BaseTableCell
            >{{ new Date(invoice.date).toLocaleDateString() }}
          </BaseTableCell>
          <BaseTableCell>
            <InvoiceStatusPill :invoice="invoice" />
          </BaseTableCell>
          <BaseTableCell>
            <UIcon
              class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
              name="i-heroicons-trash"
              @click="initiateDeletion(invoice._id)"
            />
          </BaseTableCell>
        </BaseTableRow>
      </template>
    </BaseTable>
    <UModal v-model="showDeleteConfirmation">
      <template #default>
        <h2 class="text-xl font-bold">Vorlage löschen</h2>
        <p>
          Möchten Sie die Vorlage wirklich löschen? Dieser Vorgang kann nicht
          rückgängig gemacht werden.
        </p>
        <UButton @click="showDeleteConfirmation = false">Abbrechen</UButton>
        <UButton
          class="bg-red-500 hover:bg-red-600"
          @click="deleteInvoice(invoiceId)"
        >
          Löschen
        </UButton>
      </template>
    </UModal>
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

const showDeleteConfirmation = ref(false);
const draftIdToDelete = ref("");

function initiateDeletion(invoiceId: string) {
  showDeleteConfirmation.value = true;
  draftIdToDelete.value = invoiceId;
}
</script>
