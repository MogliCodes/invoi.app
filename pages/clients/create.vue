<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-8 dark:text-white" type="h1" text="Create client" />
    <div class="grid grid-cols-2">
      <BaseBox>
        <form @submit.prevent="createClient">
          <BaseText
            type="h3"
            class="mb-8 block text-2xl font-bold dark:text-white"
            >Client base information</BaseText
          >
          <div class="mb-3">
            <BaseText
              ><label class="block" for="username"
                >Company name</label
              ></BaseText
            >
            <BaseInput v-model="company" />
          </div>
          <div class="mb-3">
            <BaseText
              ><label class="block" for="username">Street</label></BaseText
            >
            <BaseInput v-model="street" />
          </div>
          <div class="mb-3">
            <BaseText
              ><label class="block" for="username">ZIP Code</label></BaseText
            >
            <BaseInput v-model="zipcode" />
          </div>
          <div class="mb-3">
            <BaseText
              ><label class="block" for="username">City</label></BaseText
            >
            <BaseInput v-model="city" />
          </div>
          <BaseButton type="submit" text="Create contact" />
        </form>
      </BaseBox>
    </div>
    <BaseNotification v-if="showNotification" :message="notificationMessage" />
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
    const res = await $fetch("/api/clients", {
      method: "POST",
      body: client.value,
      credentials: "include",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("res", res);
    if (res.status === 201) {
      alertStore.setAlert("success", res.message);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
      navigateTo("/clients");
    }
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
</script>
