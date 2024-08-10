<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-8 dark:text-white" type="h1" text="Kunde anlegen" />
    <div class="">
      <BaseHeadline class="dark:text-white" type="h2" text="Kundendaten" />
      <BaseBox class="w-1/2">
        <form @submit.prevent="createClient">
          <div class="mb-3">
            <BaseLabel text="Name" />
            <BaseInput
              is-required
              error-message="Bitte gib einen Namen für den Kunden an"
              v-model="company"
            />
          </div>
          <div class="mb-3">
            <BaseLabel text="Straße" />
            <BaseInput v-model="street" />
          </div>
          <div class="mb-3">
            <BaseLabel text="PLZ" />
            <BaseInput v-model="zipcode" />
          </div>
          <div class="mb-3">
            <BaseLabel text="Ort" />
            <BaseInput v-model="city" />
          </div>
          <BaseButton type="submit" text="Kunde anlegen" />
        </form>
      </BaseBox>
    </div>
    <BaseNotification
      v-if="showNotification"
      :message="notificationMessage"
      link=""
    />
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
import BaseText from "~/components/BaseText/BaseText.vue";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const userId = authStore.userId;
const accessToken = authStore.accessToken;

const company: Ref<string> = ref("");
const street: Ref<string> = ref("");
const zipcode: Ref<string> = ref("");
const city: Ref<string> = ref("");

const client = computed(() => {
  return {
    company: company.value,
    street: street.value,
    zip: zipcode.value,
    city: city.value,
    user: userId,
  };
});

const showNotification = ref(false);
const notificationMessage = ref("");
async function createClient() {
  try {
    const res = await $fetch("/api/clients/create", {
      method: "POST",
      body: client.value,
      credentials: "include",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 201) {
      alertStore.setAlert("success", res.message);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
      navigateTo("/clients");
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
