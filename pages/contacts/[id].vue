<template>
  <section>
    <BaseHeadline
      class="mb-8"
      :text="`${contact.firstname} ${contact.lastname}`"
    />
    <div class="flex w-1/2 flex-col items-start gap-4">
      <BaseInput
        v-model="firstname"
        class="bg-white dark:text-black"
        type="text"
      />
      <BaseInput
        v-model="lastname"
        class="bg-white dark:text-black"
        type="text"
      />
      <BaseInput v-model="dob" class="bg-white dark:text-black" type="date" />
      <BaseInput
        v-model="street"
        class="bg-white dark:text-black"
        type="text"
      />
      <BaseInput v-model="zip" class="bg-white dark:text-black" type="text" />
      <BaseInput v-model="city" class="bg-white dark:text-black" type="text" />
      <BaseButton @click="patchContact" text="Save contact" />
    </div>
    <pre>{{ firstname }}</pre>
    <pre>{{ lastname }}</pre>
    <pre>{{ dob }}</pre>
    <pre>{{ street }}</pre>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const userId = authStore.userId;
const accessToken = authStore.accessToken;
const route = useRoute();

const { data: contact } = useFetch(
  `http://localhost:8000/api/contact/${route.params.id}`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
    },
  }
);

async function patchContact() {
  try {
    const res = await $fetch(`/api/contacts?id=${route.params.id}`, {
      method: "PATCH",
      body: {
        firstname: firstname.value,
        lastname: lastname.value,
        dob: dob.value,
        street: street.value,
        city: city.value,
        zip: zip.value,
      },
      credentials: "include",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
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
const firstname = ref(contact?.value?.firstname);
const lastname = ref(contact?.value?.lastname);
const dob = ref(contact?.value?.dob);
const street = ref(contact?.value?.street);
const zip = ref(contact?.value?.zip);
const city = ref(contact?.value?.city);
</script>
