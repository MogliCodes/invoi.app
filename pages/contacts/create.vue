<template>
  <div>
    <BaseHeadline class="mb-8" type="h1" text="Create contact" />
    <div class="flex">
      <div class="w-1/2 rounded-lg bg-gray-light p-10">
        <form @submit.prevent="createContact">
          <div class="mb-3">
            <label class="block" for="username">First name</label>
            <BaseInput v-model="firstname" />
          </div>
          <div class="mb-3">
            <label class="block" for="username">Last name</label>
            <BaseInput v-model="lastname" />
          </div>
          <div class="mb-3">
            <label class="block" for="username">DOB</label>
            <BaseInput v-model="dob" />
          </div>
          <div class="mb-3">
            <label class="block" for="username">Street</label>
            <BaseInput v-model="street" />
          </div>
          <div class="mb-3">
            <label class="block" for="username">ZIP Code</label>
            <BaseInput v-model="zipcode" />
          </div>
          <div class="mb-3">
            <label class="block" for="username">City</label>
            <BaseInput v-model="city" />
          </div>
          <BaseButton type="submit" text="Create contact" />
        </form>
      </div>
    </div>
    <BaseNotification v-if="showNotification" :message="notificationMessage" />
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
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
      showNotification.value = true;
      notificationMessage.value = res.message;
      setTimeout(() => {
        showNotification.value = false;
      }, 5000);
      navigateTo("/contacts");
    }
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
</script>
