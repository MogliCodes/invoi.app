<template>
  <div class="w-full">
    <section
      class="relative bg-yellow-300 text-yellow-950 rounded-lg overflow-hidden p-12 mb-6"
    >
      <div class="w-2/3">
        <BaseHeadline
          class="mb-6 !text-yellow-950 dark:!text-yellow-950"
          type="h1"
          text="Professinal invoices made easy"
        />
        <p class="text-xl mb-6">
          Explore the simplicity of creating invoices with our quick tour. Learn
          easy steps to effortlessly generate invoices and enhance your
          invoicing experience. Take the tutorial now for a hassle-free
          invoicing journey.
        </p>
        <BaseButton text="Start the tour" variant="yellowDark" />
        <div
          class="w-9 h-9 bg-yellow-400 absolute top-6 right-6 flex justify-center items-center rounded-lg"
        >
          <UIcon class="text-2xl" name="i-heroicons-x-mark" />
        </div>
        <UIcon
          class="absolute w-[300px] h-[300px] right-10 -bottom-10"
          name="i-heroicons-document-chart-bar"
        />
      </div>
    </section>
    <div class="mb-6">
      <BaseHeadline
        class="font-bold font-syne mb-3 text-gray-400 text-2xl"
        type="h2"
        text="Overview"
      />
      <BaseBox>
        <div class="grid grid-cols-3 gap-3">
          <div
            class="border-r-2 dark:border-gray-600 pr-3 flex justify-between"
          >
            <div>
              <span
                class="font-bold text-secondary-100 text-5xl font-syne block mb-2"
                >{{ contactCount }}</span
              >
              <span class="text-xl dark:text-white">Contacts</span>
            </div>
            <UIcon
              class="h-20 w-20 text-blue-80 text-gray-300 dark:text-gray-600"
              name="i-heroicons-user-circle"
            />
          </div>
          <div
            class="border-r-2 dark:border-gray-600 px-3 flex justify-between"
          >
            <div>
              <span
                class="font-bold text-secondary-100 text-5xl font-syne block mb-2"
                >{{ invoiceCount }}</span
              >
              <span class="text-xl dark:text-white">Invoices</span>
            </div>
            <UIcon
              class="h-20 w-20 text-blue-80 text-gray-300 dark:text-gray-600"
              name="i-heroicons-document-chart-bar"
            />
          </div>
          <div class="pl-3 flex justify-between">
            <div>
              <span
                class="font-bold text-secondary-100 text-5xl font-syne block mb-2"
                >{{ clientCount }}</span
              >
              <span class="text-xl dark:text-white">Clients</span>
            </div>
            <UIcon
              class="h-20 w-20 text-gray-300 dark:text-gray-600"
              name="i-heroicons-building-office"
            />
          </div>
        </div>
      </BaseBox>
    </div>
    <div class="mb-6">
      <BaseHeadline
        class="font-bold font-syne mb-3 text-gray-400 text-2xl"
        type="h2"
        text="Upcoming payments"
      />
      <BaseBox class="flex flex-col gap-6">
        <div class="flex justify-between gap-6">
          <BaseText>Rheinenergie</BaseText>
          <BaseText>Strom & Gas</BaseText>
          <BaseText>17.11.2023</BaseText>
          <BaseText>149,99 €</BaseText>
          <BaseText>1679,43 €</BaseText>
        </div>
        <div class="flex justify-between gap-6">
          <BaseText>Rheinenergie</BaseText>
          <BaseText>Strom & Gas</BaseText>
          <BaseText>17.11.2023</BaseText>
          <BaseText>149,99 €</BaseText>
          <BaseText>1679,43 €</BaseText>
        </div>
      </BaseBox>
    </div>
    <div class="mb-6">
      <BaseHeadline
        class="font-bold font-syne mb-3 text-gray-400 text-2xl"
        text="Revenues"
        type="h2"
      />
      <BaseBox class="aspect-video">
        <BaseText>lorem</BaseText>
      </BaseBox>
    </div>
    <div>
      <BaseHeadline
        class="font-bold font-syne mb-3 text-gray-400 text-2xl"
        text="User Data"
        type="h2"
      />
      <BaseBox>
        <BaseText>
          <pre>{{ data }}</pre>
        </BaseText>
      </BaseBox>
    </div>
    <section style="height: 1000px"></section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import BaseText from "~/components/BaseText/BaseText.vue";

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
