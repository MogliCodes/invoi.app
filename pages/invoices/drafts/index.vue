<template>
  <section v-if="invoiceDrafts">
    <BaseContainer>
      <BaseTable>
        <template #head>
          <BaseTableHeadCell>Invoice Number</BaseTableHeadCell>
          <BaseTableHeadCell>Customer</BaseTableHeadCell>
          <BaseTableHeadCell>Amount</BaseTableHeadCell>
          <BaseTableHeadCell>Due Date</BaseTableHeadCell>
          <BaseTableHeadCell>Status</BaseTableHeadCell>
        </template>
        <template #body>
          <BaseTableRow v-for="invoice in invoiceDrafts" :key="invoice._id">
            <BaseTableCell>{{ invoice.nr }}</BaseTableCell>
            <BaseTableCell>{{ invoice.title }}</BaseTableCell>
            <BaseTableCell>{{ invoice.client }}</BaseTableCell>
            <BaseTableCell>{{ invoice.date }}</BaseTableCell>
            <BaseTableCell>{{ invoice.status }}</BaseTableCell>
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
  title: "Drafts",
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
</script>
