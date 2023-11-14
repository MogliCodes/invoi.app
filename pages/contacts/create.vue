<template>
  <div class="container mx-auto">
    <BaseHeadline
      class="mb-8 dark:text-white"
      type="h1"
      text="Create contact"
    />
    <div class="grid grid-cols-2">
      <BaseBox>
        <form @submit.prevent="createContact">
          <BaseText
            type="h3"
            class="block mb-8 text-2xl font-bold dark:text-white"
            >Contact base information</BaseText
          >
          <div class="mb-3">
            <BaseText
              ><label class="block" for="username">First name</label></BaseText
            >
            <BaseInput v-model="firstname" />
          </div>
          <div class="mb-3">
            <BaseText
              ><label class="block" for="username">Last name</label></BaseText
            >
            <BaseInput v-model="lastname" />
          </div>
          <div class="mb-3">
            <BaseText><label class="block" for="username">DOB</label></BaseText>
            <BaseInput v-model="dob" />
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
import BaseText from "~/BaseText/BaseText.vue";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const userId = authStore.userId;
const accessToken = authStore.accessToken;
const firstname: Ref<string> = ref("");
const lastname: Ref<string> = ref("");
const dob: Ref<string> = ref("");
const street: Ref<string> = ref("");
const zipcode: Ref<string> = ref("");
const city: Ref<string> = ref("");

const contact = computed(() => {
  return {
    firstname: firstname.value,
    lastname: lastname.value,
    dob: new Date(dob.value),
    street: street.value,
    zip: zipcode.value,
    city: city.value,
    user: userId,
  };
});

const showNotification = ref(false);
const notificationMessage = ref("");
async function createContact() {
  try {
    const res = await $fetch("/api/contacts", {
      method: "POST",
      body: contact.value,
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
      navigateTo("/contacts");
    }
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
</script>
