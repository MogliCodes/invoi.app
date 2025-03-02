<template>
  <section>
    <BaseBox>
      <div class="mb-5 flex gap-3">
        <pre>userId: c{{ userId }}</pre>
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
const userId = authStore.userId;

const { data: revenues } = useFetch(
  "http://localhost:8000/restapi/invoice/revenue/range/year",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: userId,
    },
    params: {
      start: "2025-01-01",
      end: "2025-12-31",
    },
  }
);
</script>
