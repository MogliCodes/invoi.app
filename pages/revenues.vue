<template>
  <section>
    <BaseBox>
      <div class="mb-5 flex gap-3">
        <USelect placeholder="Select start" />
        <USelect placeholder="Select end" />
        <BaseButton size="xs" text="Apply" />
      </div>
      <TestGraph v-if="revenues" :values="revenues" />
    </BaseBox>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
definePageMeta({
  title: "Revenues",
});

const authStore = useAuthStore();

const { data: revenues } = useFetch(
  "http://localhost:8000/restapi/invoice/revenue/range/year",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: "6652501f2d7789c03fe430b0",
    },
    params: {
      start: "2024-01-01",
      end: "2024-12-31",
    },
  }
);
</script>
