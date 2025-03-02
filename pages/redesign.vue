<template>
  <div class="flex flex-col gap-4">
    <section v-if="showTourTeaser" id="tutorial">
      <BaseBox class="relative overflow-hidden bg-yellow-300 !p-8 lg:!p-12 text-yellow-950">
        <div class="md:w-2/3">
          <BaseHeadline class="mb-6 !text-yellow-950 dark:!text-yellow-950" type="h1"
            text="Professional invoices made easy" />
          <p class="mb-6 text-xl">
            Explore the simplicity of creating invoices with our quick tour.
            Learn easy steps to effortlessly generate invoices and enhance
            your invoicing experience. Take the tutorial now for a hassle-free
            invoicing journey.
          </p>
          <BaseButton text="Start the tour" variant="amber" />
          <div class="absolute right-6 top-6 flex size-9 items-center justify-center rounded-lg bg-yellow-400">
            <UIcon class="text-2xl" name="i-heroicons-x-mark" @click="showTourTeaser = false" />
          </div>
          <UIcon class="absolute -bottom-10 right-10 hidden size-[300px] md:block"
            name="i-heroicons-document-chart-bar" />
        </div>
      </BaseBox>
    </section>
    <section id="overview">
      <BaseHeadline class="!mb-1 font-syne text-lg font-bold text-gray-400 lg:text-2xl" type="h2" text="Overview" />
      <BaseBox>
        <div class="lg:grid lg:grid-cols-3 lg:gap-4">
          <BaseWidget v-for="widget in overviewWidgets" :label="widget.label" :value="widget.value"
            :icon="widget.icon" />
        </div>
      </BaseBox>
    </section>
    <section id="revenues">
      <BaseHeadline class="!mb-1 font-syne text-lg font-bold text-gray-400 lg:text-2xl" type="h2" text="Revenues" />
      <BaseBox>
        <div class="lg:grid lg:grid-cols-3 lg:gap-4">
          <BaseWidget v-for="widget in revenueWidgets" :label="widget.label" :value="widget.value"
            :icon="widget.icon" />
        </div>
      </BaseBox>
    </section>
    <section id="taxes">
      <BaseHeadline class="!mb-1 font-syne text-lg font-bold text-gray-400 lg:text-2xl" type="h2" text="Taxes" />
      <BaseBox>
        <div class="lg:grid lg:grid-cols-3 lg:gap-4">
          <BaseWidget v-for="widget in taxesWidgets" :label="widget.label" :value="widget.value" :icon="widget.icon" />
        </div>
      </BaseBox>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

definePageMeta({
  title: "Dashboard",
  layout: "mobilefirst",
});

const authStore = useAuthStore(); // this is required for default styles to work.

const showTourTeaser = ref(true);

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

const { data: currentMonthRevenue } = useFetch(`/api/invoices/revenue/month`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    UserId: authStore.userId,
  },
});

const { data: currentQuarterRevenue } = useFetch(
  `/api/invoices/revenue/quarter`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      UserId: authStore.userId,
    },
  }
);

const { data: currentYearRevenue } = useFetch(`/api/invoices/revenue/year`, {
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

type Widget = {
  label: string;
  value: number;
  icon: string;
};

const overviewWidgets = computed<Array<Widget>>(() => [
  {
    label: "Kontakte",
    value: contactCount.value ?? 0,
    icon: "i-heroicons-user-circle",
  },
  {
    label: "Rechnungen",
    value: invoiceCount.value ?? 0,
    icon: "i-heroicons-document-text",
  },
  {
    label: "Kunden",
    value: clientCount.value ?? 0,
    icon: "i-heroicons-building-office",
  },
]);

const revenueWidgets = computed<Array<Widget>>(() => [
  {
    label: "Aktueller Monat",
    value:
      formatCurrencyAmount(formatCentToAmount(currentMonthRevenue.value)) ?? 0,
    icon: "i-heroicons-arrow-trending-up",
  },
  {
    label: "Aktuelles Quartal",
    value:
      formatCurrencyAmount(formatCentToAmount(currentQuarterRevenue.value)) ??
      0,
    icon: "i-heroicons-calendar-days",
  },
  {
    label: "Aktuelles Jahr",
    value:
      formatCurrencyAmount(formatCentToAmount(currentYearRevenue.value)) ?? 0,
    icon: "i-heroicons-chart-bar",
  },
]);

const taxesWidgets = computed<Array<Widget>>(() => [
  {
    label: "Aktueller Monat",
    value:
      formatCurrencyAmount(formatCentToAmount(currentMonthTaxes.value)) ?? 0,
    icon: "i-heroicons-arrow-trending-up",
  },
  {
    label: "Aktuelles Quartal",
    value:
      formatCurrencyAmount(formatCentToAmount(currentQuarterTaxes.value)) ?? 0,
    icon: "i-heroicons-calendar-days",
  },
  {
    label: "Aktuelles Jahr",
    value:
      formatCurrencyAmount(formatCentToAmount(currentYearTaxes.value)) ?? 0,
    icon: "i-heroicons-chart-bar",
  },
]);
</script>
