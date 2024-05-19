<template>
  <section>
    <div class="w-2/3">
      <BaseHeadline
        type="h1"
        class="mb-8 dark:text-white"
        :text="`${client?.company}`"
      />
      <BaseHeadline type="h2" text="Client information" />
      <BaseBox v-if="company && street && zip && city">
        <div class="flex w-2/3 flex-col items-start gap-4">
          <BaseInput
            v-if="company"
            v-model="company"
            class="bg-white dark:text-black"
            type="text"
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
          <BaseInput
            v-model="taxId"
            class="bg-white dark:text-black"
            type="text"
          />
          <BaseButton text="Save client" @click="patchClient" />
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
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: client } = useFetch<Client>(`/api/clients/${route.params.id}`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    Userid: authStore.userId,
  },
});

async function patchClient() {
  try {
    const res = await $fetch(`/api/clients?id=${route.params.id}`, {
      method: "PATCH",
      body: {
        company: company.value,
        street: street.value,
        city: city.value,
        zip: zip.value,
        taxId: taxId.value,
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
      navigateTo("/clients");
    }
  } catch (error) {
    console.error(error);
  }
}
const company = ref(client?.value?.company);
const street = ref(client?.value?.street);
const zip = ref(client?.value?.zip);
const city = ref(client?.value?.city);
const taxId = ref(client?.value?.taxId);

watch(
  () => client.value,
  (newValue) => {
    if (newValue) {
      company.value = newValue.company;
      street.value = newValue.street;
      zip.value = newValue.zip;
      city.value = newValue.city;
      taxId.value = newValue.taxId;
    }
  }
);
</script>
