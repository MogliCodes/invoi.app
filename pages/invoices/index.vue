<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-4" type="h1" text="My invoices" />
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

    <table class="w-full">
      <thead>
        <th class="text-left px-6 py-3">ID</th>
        <th class="text-left px-6 py-3">NR</th>
        <th class="text-left px-6 py-3">Title</th>
        <th class="text-left px-6 py-3">Client</th>
      </thead>
      <tbody>
        <tr
          v-for="invoice in invoices"
          :key="contact?._id"
          class="card rounded border p-4"
        >
          <td class="px-6 py-3">{{ invoice?._id }}</td>
          <td class="px-6 py-3">{{ invoice?.nr }}</td>
          <td class="px-6 py-3">{{ invoice.title }}</td>
          <td class="px-6 py-3">{{ invoice.client }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();

type UserData = {
  username: string;
};

const { data: invoices } = useFetch<UserData>(
  `http://localhost:8000/api/invoice`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);
</script>
