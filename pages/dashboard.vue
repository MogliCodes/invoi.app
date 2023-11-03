<template>
  <div class="w-full">
    <BaseHeadline class="mb-8" :text="welcomeMessage" type="h1" />
    <div class="grid grid-cols-3 gap-8">
      <div class="bg-blue-100 rounded-xl p-10 text-white text-center">
        <span
          class="font-bold text-yellow-normal text-5xl font-syne block mb-2"
          >{{ contactCount }}</span
        >
        <span>Contacts</span>
      </div>
      <div class="bg-blue-100 rounded-xl p-10 text-white text-center">
        <span
          class="font-bold text-yellow-normal text-5xl font-syne block mb-2"
          >{{ invoiceCount }}</span
        >
        <span>Invoices</span>
      </div>
      <div class="bg-blue-100 rounded-xl p-10 text-white text-center">
        <span
          class="font-bold text-yellow-normal text-5xl font-syne block mb-2"
          >{{ clientCount }}</span
        >
        <span>Clients</span>
      </div>
      <div>
        <div class="bg-secondary-100 rounded-2xl p-10 text-white font-bold">
          Revenues
        </div>
      </div>
      <div>
        <div class="bg-secondary-100 rounded-2xl p-10 text-white font-bold">
          Taxes
        </div>
      </div>
      <div>
        <div class="bg-secondary-100 rounded-2xl p-10 text-white font-bold">
          Spendings
        </div>
      </div>
    </div>

    <div class="mt-10">
      <div class="bg-blue-80 text-white rounded-xl p-10">
        <p class="font-bold mb-4">User Data:</p>
        <code>
          <pre>{{ data }}</pre>
        </code>
      </div>
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

const { data: contactCount } = useFetch(
  `http://localhost:8000/api/contact/count`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
    },
  }
);

const { data: invoiceCount } = useFetch(
  `http://localhost:8000/api/invoice/count`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
    },
  }
);

const { data: clientCount } = useFetch(
  `http://localhost:8000/api/client/count`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
    },
  }
);

const welcomeMessage = computed<string>(() => {
  return `Welcome back ${data.value?.username}`;
});
</script>
