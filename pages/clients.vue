<template>
  <div class="container mx-auto">
    <BaseHeadline text="My clients" type="h1" class="mb-8" />
    <div class="flex flex-wrap gap-4">
      <ClientListItem
        v-for="client in data"
        :key="client._id"
        :client="client"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();

type UserData = {
  username: string;
};

const { data } = useFetch<UserData>(`http://localhost:8000/api/client`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
  },
});
</script>
