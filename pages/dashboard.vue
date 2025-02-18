<template>
  <div class="flex w-full flex-col gap-4">
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
          class="absolute right-6 top-6 flex size-9 items-center justify-center rounded-lg bg-yellow-400"
        >
          <UIcon
            class="text-2xl"
            name="i-heroicons-x-mark"
            @click="showTourTeaser = false"
          />
        </div>
        <UIcon
          class="absolute -bottom-10 right-10 size-[300px]"
          name="i-heroicons-document-chart-bar"
        />
      </div>
    </section>
    <section class="flex flex-col gap-2">
      <BaseNote v-if="!validUserData">
        <p>Bitte vervollständige dein Nutzerprofil</p>
        <nuxt-link class="font-bold text-blue-600" to="/settings"
          >Zu den Einstellungen</nuxt-link
        >
      </BaseNote>
      <BaseNote v-if="!validCompanyData">
        <p>
          Die Angaben zu deinem Unternehmen sind unvollständig. Bitte
          vervollständige deine Unternehmensdaten, um Rechnungen zu erstellen.
        </p>
        <nuxt-link class="font-bold text-blue-600" to="/settings#company"
          >Zu den Einstellungen</nuxt-link
        >
      </BaseNote>
      <BaseNote v-if="!validBankData">
        <p>
          Die Angaben zu deiner Bankverbindung sind unvollständig. Bitte füge
          die Bankverbindung hinzu, um Rechnungen zu erstellen.
        </p>
        <nuxt-link class="font-bold text-blue-600" to="/settings#bank-info"
          >Zu den Einstellungen</nuxt-link
        >
      </BaseNote>
    </section>
    <!-- Overview -->
    <section class="">
      <BaseHeadline
        class="font-syne text-2xl font-bold text-gray-400"
        type="h2"
        text="Overview"
      />
      <BaseBox>
        <div class="md:grid grid-cols-3 gap-3">
          <NuxtLink
            to="/contacts"
            class="mb-2 flex justify-between border-b-2 pb-2 pr-3 md:border-r-2 dark:border-gray-600"
          >
            <div>
              <BaseLabel text="Kontakte" />
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{ contactCount }}</span
              >
            </div>
            <UIcon
              class="size-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-user-circle"
            />
          </NuxtLink>
          <NuxtLink
            to="/invoices"
            class="mb-2 flex justify-between border-b-2 pb-2 md:border-r-2 dark:border-gray-600"
          >
            <div>
              <BaseLabel text="Rechnungen" />
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{ invoiceCount }}</span
              >
            </div>
            <UIcon
              class="size-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-document-chart-bar"
            />
          </NuxtLink>
          <NuxtLink to="/clients" class="flex justify-between">
            <div>
              <BaseLabel text="Kunden" />
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{ clientCount }}</span
              >
            </div>
            <UIcon
              class="size-20 text-gray-300 dark:text-gray-600"
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
      <BaseBox>
        <div class="grid grid-cols-3 gap-3">
          <article
            class="flex justify-between border-r-2 pr-3 dark:border-gray-600"
          >
            <div>
              <BaseLabel text="This month" />
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{
                  formatCurrencyAmount(formatCentToAmount(currentMonthRevnue))
                }}</span
              >
            </div>
            <UIcon
              class="size-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-arrow-trending-up"
            />
          </article>
          <article
            class="flex justify-between border-r-2 px-3 dark:border-gray-600"
          >
            <div>
              <BaseLabel text="This quarter" />
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{
                  formatCurrencyAmount(formatCentToAmount(currentQuarterRevnue))
                }}</span
              >
            </div>
            <UIcon
              class="size-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-calendar-days"
            />
          </article>
          <article class="flex justify-between pl-3">
            <div>
              <BaseLabel text="This year" />
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{
                  formatCurrencyAmount(formatCentToAmount(currentYearRevnue))
                }}</span
              >
            </div>
            <UIcon
              class="size-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-chart-bar"
            />
          </article>
        </div>
      </BaseBox>
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
      <BaseBox>
        <div class="grid grid-cols-3 gap-3">
          <article
            class="flex justify-between border-r-2 pr-3 dark:border-gray-600"
          >
            <div>
              <BaseLabel text="This month" />
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{
                  formatCurrencyAmount(formatCentToAmount(currentMonthTaxes))
                }}</span
              >
            </div>
            <UIcon
              class="size-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-arrow-trending-up"
            />
          </article>
          <article
            class="flex justify-between border-r-2 px-3 dark:border-gray-600"
          >
            <div>
              <BaseLabel text="This quarter" />
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{
                  formatCurrencyAmount(formatCentToAmount(currentQuarterTaxes))
                }}</span
              >
            </div>
            <UIcon
              class="size-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-calendar-days"
            />
          </article>
          <article class="flex justify-between pl-3">
            <div>
              <BaseLabel text="This year" />
              <span
                class="mb-2 block font-syne text-5xl font-bold text-secondary-100"
                >{{
                  formatCurrencyAmount(formatCentToAmount(currentYearTaxes))
                }}</span
              >
            </div>
            <UIcon
              class="size-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-chart-bar"
            />
          </article>
        </div>
      </BaseBox>
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

const { data: invoiceCount } = useFetch(`/api/invoices/count/get`, {
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

const { data: revenues } = useFetch("/api/revenues/get", {
  method: "POST",
  params: {
    start: "2024-01-01",
    end: "2024-12-31",
  },
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

type UserData = {
  username: string;
};
const userId = authStore.userId;

const config = useRuntimeConfig();
const debug = config.public.debug;
console.log("config", config);
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: userData } = useFetch<UserData>(
  `${backendBaseUrl}/restapi/user/${userId}`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: userId,
    },
  }
);

const showTourTeaser = ref(true);

const accessTokenCookie = useCookie("accessToken");

const {
  validUserData,
  validCompanyData,
  validBankData,
  bankName,
  firstname,
  fetchSettings,
} = useSettings();
await fetchSettings();

const years = [2023, 2024, 2025];
const selectedYear = ref(years[years.length - 1]);
</script>

<style>
.vue-sticky-element--stuck {
  @apply !bg-white !shadow-lg text-base;
  background: white;
}
</style>
