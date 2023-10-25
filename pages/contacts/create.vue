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
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
const userId = authStore.userId;
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
async function createContact() {
  try {
    const { data, error } = await useFetch("/api/contacts", {
      method: "POST",
      body: contact.value,
    });
    console.log(data);
    if (error.value) {
      const { statusCode, statusMessage, data } = error.value;
      // eslint-disable-next-line no-console
      console.log(statusCode, statusMessage, data);
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
