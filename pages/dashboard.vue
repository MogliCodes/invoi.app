<template>
  <div class="w-full">
    <BaseHeadline class="mb-8" :text="welcomeMessage" type="h1" />
    <div class="border-2 p-4">
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
const userId = authStore.userId;

type UserData = {
  username: string;
};

const { data } = useFetch<UserData>(
  `http://localhost:8000/api/user/${userId}`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

const welcomeMessage = computed<string>(() => {
  return `Welcome back ${data.value?.username}`;
});
</script>
