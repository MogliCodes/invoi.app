<template>
  <section>
    <div class="w-2/3">
      <BaseHeadline
        type="h1"
        class="mb-8 dark:text-white"
        text="Import contacts"
      />
      <BaseHeadline class="mt-8" type="h2" text="Demo data" />
      <BaseBox class="w-2/3">
        <div class="flex flex-col items-start gap-4">
          <BaseHeadline
            class="dark:text-white"
            type="h3"
            text="Create demo data"
          />
          <BaseText>
            To get you started, you can create demo data for your contacts. This
            will create 10 contacts with random data. The data is generated with
            the faker.js library.
          </BaseText>
          <div class="flex gap-4">
            <BaseButton text="Create demo data" @click="createDemoContacts" />
            <BaseButton variant="red" text="Delete demo contacts" />
          </div>
        </div>
      </BaseBox>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
const authStore = useAuthStore();
const alertStore = useAlertStore();
const userId = authStore.userId;
const accessToken = authStore.accessToken;

async function createDemoContacts() {
  const response = await $fetch(`/api/clients/demo`, {
    method: "POST",
    headers: {
      userId,
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 201) {
    alertStore.setAlert("success", "Demo contacts created successfully");
    setTimeout(() => {
      alertStore.resetAlert();
    }, 3000);
  } else {
    alertStore.setAlert("error", "Failed to create demo contacts");
    setTimeout(() => {
      alertStore.resetAlert();
    }, 3000);
  }
}
</script>
