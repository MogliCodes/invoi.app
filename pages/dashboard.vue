<template>
  <div class="w-full flex flex-col gap-4">
    <!-- Onboarding teaser -->
    <section
      v-if="showTourTeaser"
      class="relative overflow-hidden rounded-lg bg-yellow-300 p-12 text-yellow-950 shadow-lg"
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
    <!-- Overview -->
    <section class="">
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
    </section>
    <!-- Revenues -->
    <section class="">
      <BaseHeadline
        class="mb-3 font-syne text-2xl font-bold text-gray-400"
        type="h2"
        text="Revenues"
      />
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <BaseBox>
          <div class="text-xl dark:text-white">This month</div>
          <span class="font-syne text-5xl font-bold text-secondary-100">
            {{ formatCurrencyAmount(currentMonthRevnue / 100) }}
          </span>
        </BaseBox>
        <BaseBox>
          <div class="text-xl dark:text-white">This quarter</div>
          <span class="font-syne text-5xl font-bold text-secondary-100">
            {{ formatCurrencyAmount(currentQuarterRevnue / 100) }}
          </span>
        </BaseBox>
        <BaseBox>
          <div class="text-xl dark:text-white">This year</div>
          <span class="font-syne text-5xl font-bold text-secondary-100">
            {{ formatCurrencyAmount(currentYearRevnue / 100) }}
          </span>
        </BaseBox>
      </div>
    </section>
    <!-- Revenue graph -->
    <section v-if="false" class="">
      <BaseBox>
        <TestGraph :values="revenues" />
      </BaseBox>
    </section>
    <!-- Taxes -->
    <section>
      <BaseHeadline
        text="Taxes"
        class="mb-3 font-syne text-2xl font-bold text-gray-400"
        type="h2"
      />
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <BaseBox>
          <BaseLabel class="block" text="This month" />
          <span class="font-syne text-5xl font-bold text-secondary-100">
            {{ formatCurrencyAmount(currentMonthTaxes / 100) }}
          </span>
        </BaseBox>
        <BaseBox>
          <BaseLabel class="block" text="This quarter" />
          <span class="font-syne text-5xl font-bold text-secondary-100">
            {{ formatCurrencyAmount(currentQuarterTaxes / 100) }}
          </span>
        </BaseBox>
        <BaseBox>
          <BaseLabel class="block" text="This year" />
          <span class="font-syne text-5xl font-bold text-secondary-100">
            {{ formatCurrencyAmount(currentYearTaxes / 100) }}
          </span>
        </BaseBox>
      </div>
    </section>
    <!-- User data -->
    <section v-if="debug">
      <BaseContainer>
        <BaseBox>
          <div class="text-xl dark:text-white">User data</div>
          <pre class="dark:text-white"> {{ userData }}</pre>
          <pre class="dark:text-white"> {{ authStore.accessToken }}</pre>
          <pre class="dark:text-white"> {{ accessTokenCookie }}</pre>
        </BaseBox>
      </BaseContainer>
    </section>
    <section v-if="debug" style="height: 1000px"></section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import TestGraph from "~/components/TestGraph.vue";
import "vue-sticky-element/css";
const authStore = useAuthStore(); // this is required for default styles to work.

definePageMeta({
  title: "Dashboard",
});

useHead({
  title: "Dashboard",
});

const { data: contactCount } = useFetch(`/api/contacts/count`, {
  method: "POST",
  body: {
    userId: authStore.userId,
  },
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

const { data: invoiceCount } = useFetch(`/api/invoices/count`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

const { data: clientCount } = useFetch(`/api/clients/count`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

const { data: currentMonthRevnue } = useFetch(`/api/invoices/revenue/month`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

const { data: currentQuarterRevnue } = useFetch(
  `/api/invoices/revenue/quarter`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      UserId: authStore.userId,
    },
  }
);

const { data: currentYearRevnue } = useFetch(`/api/invoices/revenue/year`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

const { data: currentMonthTaxes } = useFetch(`/api/invoices/tax/month`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

const { data: currentQuarterTaxes } = useFetch(`/api/invoices/tax/quarter`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

const { data: currentYearTaxes } = useFetch(`/api/invoices/tax/year`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

const { data: revenues } = useFetch(
  "http://localhost:8000/restapi/invoice/revenue/range/year?start=2021-01-01&end=2021-12-31",
  {
    method: "GET",
    headers: {
      userid: "6652501f2d7789c03fe430b0",
    },
    params: {
      start: "2024-01-01",
      end: "2024-12-31",
    },
  }
);

type UserData = {
  username: string;
};
const userId = authStore.userId;

const config = useRuntimeConfig();
const debug = config.public.DEBUG;
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: userData } = useFetch<UserData>(
  `${backendBaseUrl}/restapi/user/${userId}`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

const showTourTeaser = ref(true);

const accessTokenCookie = useCookie("accessToken");
</script>

<style>
.vue-sticky-element--stuck {
  @apply !bg-white !shadow-lg text-base;
  background: white;
}
</style>
