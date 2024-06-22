<template>
  <section v-if="contact">
    <div class="w-2/3">
      <BaseHeadline
        type="h1"
        class="mb-8 dark:text-white"
        :text="`${contact?.firstname} ${contact?.lastname}`"
      />
      <BaseHeadline type="h2" text="Contact information" />
      <div v-if="contact && contact.client" class="bg-pink-500"></div>
      <BaseBox v-if="firstname && lastname && dob && street && zip && city">
        <div class="flex flex-col items-start gap-4">
          <div class="w-full">
            <BaseLabel text="Client" />
            <USelect
              size="md"
              class="w-full"
              v-if="clients"
              v-model="contact.client"
              :options="clients"
              value-attribute="_id"
              placeholder="Select a client"
              option-attribute="company"
            />
          </div>
          <div class="w-full">
            <BaseLabel text="First name" />
            <BaseInput v-if="firstname" v-model="firstname" type="text" />
          </div>
          <div class="w-full">
            <BaseLabel text="Last name" />
            <BaseInput v-if="lastname" v-model="lastname" type="text" />
          </div>
          <div class="w-full">
            <BaseLabel text="Date of birth" />
            <BaseInput v-if="dob" v-model="dob" type="date" />
          </div>
          <div class="w-full">
            <BaseLabel text="Street" />
            <BaseInput v-if="street" v-model="street" type="text" />
          </div>
          <div class="w-full">
            <BaseLabel text="Zip" />
            <BaseInput v-if="zip" v-model="zip" type="text" />
          </div>
          <div class="w-full">
            <BaseLabel text="City" />
            <BaseInput v-if="city" v-model="city" type="text" />
          </div>
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
  client?: string;
};

const { data: contact } = useFetch<Contact>(
  `/api/contacts/${route.params.id}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);
const clients = await $fetch(`/api/clients`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});
function getClientName(clientId: string) {
  const client = clients?.find((client: Client) => client._id === clientId);
  return client?.company;
}

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
  } catch (error) {
    console.error(error);
  }
}
const firstname = ref(contact?.value?.firstname);
const lastname = ref(contact?.value?.lastname);
const dob = ref(formatDateForInput(contact?.value?.dob || ""));
const street = ref(contact?.value?.street);
const zip = ref(contact?.value?.zip);
const city = ref(contact?.value?.city);

watch(
  () => contact.value,
  (newValue) => {
    if (newValue) {
      firstname.value = newValue.firstname;
      lastname.value = newValue.lastname;
      dob.value = formatDateForInput(newValue.dob);
      street.value = newValue.street;
      zip.value = newValue.zip;
      city.value = newValue.city;
    }
  }
);

function formatDateForInput(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
</script>
