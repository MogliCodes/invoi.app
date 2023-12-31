<template>
  <section>
    <div class="w-2/3">
      <BaseHeadline
        type="h1"
        class="mb-8 dark:text-white"
        :text="`${contact?.firstname} ${contact?.lastname}`"
      />
      <BaseHeadline type="h2" text="Contact information" />
      <BaseBox v-if="contact">
        <div class="flex w-2/3 flex-col items-start gap-4">
          <BaseInput
            v-if="firstname"
            v-model="firstname"
            class="bg-white dark:text-black"
            type="text"
          />
          <BaseInput
            v-if="lastname"
            v-model="lastname"
            class="bg-white dark:text-black"
            type="text"
          />
          <BaseInput
            v-if="dob"
            v-model="dob"
            class="bg-white dark:text-black"
            type="date"
          />
          <BaseInput
            v-if="street"
            v-model="street"
            class="bg-white dark:text-black"
            type="text"
          />
          <BaseInput
            v-if="zip"
            v-model="zip"
            class="bg-white dark:text-black"
            type="text"
          />
          <BaseInput
            v-if="city"
            v-model="city"
            class="bg-white dark:text-black"
            type="text"
          />
          <BaseButton text="Save contact" @click="patchContact" />
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
const accessToken = authStore.accessToken;
const route = useRoute();

type Contact = {
  firstname: string;
  lastname: string;
  dob: string;
  street: string;
  city: string;
  zip: string;
  user: string;
};
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: contact } = useFetch<Contact>(
  `${backendBaseUrl}/api/contact/${route.params.id}`,
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
const dob = ref(formatDateForInput(contact?.value?.dob));
const street = ref(contact?.value?.street);
const zip = ref(contact?.value?.zip);
const city = ref(contact?.value?.city);

function formatDateForInput(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
</script>
