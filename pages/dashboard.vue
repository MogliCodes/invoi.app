<template>
  <div class="w-full">
    <section
      v-if="showTourTeaser"
      class="relative mb-6 overflow-hidden rounded-lg bg-yellow-300 p-12 text-yellow-950 shadow-lg"
    >
      <div class="w-2/3">
        <BaseHeadline
          class="mb-6 !text-yellow-950 dark:!text-yellow-950"
          type="h1"
          text="Professinal invoices made easy"
        />
        <p class="mb-6 text-xl">
          Explore the simplicity of creating invoices with our quick tour. Learn
          easy steps to effortlessly generate invoices and enhance your
          invoicing experience. Take the tutorial now for a hassle-free
          invoicing journey.
        </p>
        <BaseButton text="Start the tour" variant="amber" />
        <div
          class="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400"
        >
          <UIcon
            class="text-2xl"
            name="i-heroicons-x-mark"
            @click="showTourTeaser = false"
          />
        </div>
        <UIcon
          class="absolute -bottom-10 right-10 h-[300px] w-[300px]"
          name="i-heroicons-document-chart-bar"
        />
      </div>
    </section>
    <div class="mb-6">
      <BaseHeadline
        class="mb-3 font-syne text-2xl font-bold text-gray-400"
        type="h2"
        text="Overview"
      />
      <BaseBox>
        <div class="grid grid-cols-3 gap-3">
          <NuxtLink
            to="/contacts"
            class="flex justify-between border-r-2 pr-3 dark:border-gray-600"
          >
            <div>
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{ contactCount }}</span
              >
              <span class="text-xl dark:text-white">Contacts</span>
            </div>
            <UIcon
              class="h-20 w-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-user-circle"
            />
          </NuxtLink>
          <NuxtLink
            to="/invoices"
            class="flex justify-between border-r-2 px-3 dark:border-gray-600"
          >
            <div>
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{ invoiceCount }}</span
              >
              <span class="text-xl dark:text-white">Invoices</span>
            </div>
            <UIcon
              class="h-20 w-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-document-chart-bar"
            />
          </NuxtLink>
          <NuxtLink to="/clients" class="flex justify-between pl-3">
            <div>
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{ clientCount }}</span
              >
              <span class="text-xl dark:text-white">Clients</span>
            </div>
            <UIcon
              class="h-20 w-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-building-office"
            />
          </NuxtLink>
        </div>
      </BaseBox>
    </div>
    <div>
      <BaseHeadline
        class="mb-3 font-syne text-2xl font-bold text-gray-400"
        text="User Data"
        type="h2"
      />
      <BaseBox>
        <BaseText>
          <pre>{{ data }}</pre>
          <button class="break-all text-left" @click="copy(accessToken)">
            {{ authStore.accessToken }}
          </button>
        </BaseText>
      </BaseBox>
    </div>
    <section style="height: 1000px"></section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import BaseText from "~/components/BaseText/BaseText.vue";
import { useClipboard } from "@vueuse/core";

const authStore = useAuthStore();
const userId = authStore.userId;
const accessToken = ref(authStore.accessToken);
const { copy } = useClipboard({ accessToken });

type UserData = {
  username: string;
};
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data } = useFetch<UserData>(
  `${backendBaseUrl}/restapi/user/${userId}`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);
const { data: contactCount } = useFetch(
  `${backendBaseUrl}/restapi/contact/count`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      UserId: authStore.userId,
    },
  }
);

const { data: invoiceCount } = useFetch(
  `${backendBaseUrl}/restapi/invoice/count`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      UserId: authStore.userId,
    },
  }
);

const { data: clientCount } = useFetch(
  `${backendBaseUrl}/restapi/client/count`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      UserId: authStore.userId,
    },
  }
);

const showTourTeaser = ref(true);
</script>
