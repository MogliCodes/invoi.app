<template>
  <div class="container mx-auto">
    <BaseHeadline
      class="mb-8 dark:text-white"
      type="h1"
      text="Kontakt erstellen"
    />
    <div class="grid grid-cols-2">
      <div>
        <BaseHeadline class="dark:text-white" type="h2" text="Kontaktdaten" />
        <BaseBox>
          <form @submit.prevent="createContact">
            <div class="mb-3">
              <div class="mb-3">
                <BaseLabel text="Kunde" />
                <USelect
                  v-model="selectedClient"
                  size="md"
                  :options="clients"
                  placeholder="Wähle einen Kunden aus"
                  value-attribute="_id"
                  option-attribute="company"
                ></USelect>
              </div>
              <div>
                <BaseLabel text="Vorname" />
                <BaseInput
                  v-model="firstname"
                  is-required
                  error-message="Bitte gib einen Vornamen ein"
                />
              </div>
            </div>
            <div class="mb-3">
              <BaseLabel text="Nachname" />
              <BaseInput
                v-model="lastname"
                is-required
                error-message="Bitte gib einen Nachnamen ein"
              />
            </div>
            <div class="mb-3">
              <BaseLabel text="E-Mail" />
              <BaseInput v-model="email" />
            </div>
            <div class="mb-3">
              <BaseLabel text="Geburtsdatum" />
              <BaseInput v-model="dob" />
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
              <BaseLabel text="Stadt" />
              <BaseInput v-model="city" />
            </div>
            <BaseButton
              :disabled="!isValidContact"
              type="submit"
              text="Kontakt erstellen"
            />
          </form>
        </BaseBox>
      </div>
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
const firstname: Ref<string> = ref("");
const lastname: Ref<string> = ref("");
const email: Ref<string> = ref("");
const dob: Ref<string> = ref("");
const street: Ref<string> = ref("");
const zipcode: Ref<string> = ref("");
const city: Ref<string> = ref("");

const isValidContact = computed(() => {
  return firstname.value !== "" && lastname.value !== "";
});

const clients = await $fetch(`/api/clients`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});
const selectedClient = ref<string>("");

const contact = computed(() => {
  return {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    dob: new Date(dob.value),
    street: street.value,
    zip: zipcode.value,
    city: city.value,
    user: userId,
    client: selectedClient.value,
  };
});

const showNotification = ref(false);
const notificationMessage = ref("");
async function createContact() {
  try {
    const res = await $fetch("/api/contacts/create", {
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
  } catch (error) {
    console.error(error);
  }
}
</script>
