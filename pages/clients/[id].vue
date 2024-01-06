<template>
  <section>
    <div class="w-2/3">
      <BaseHeadline
        type="h1"
        class="mb-8 dark:text-white"
        :text="`${client?.company}`"
      />
      <BaseHeadline type="h2" text="Client information" />
      <BaseBox v-if="client">
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

type Client = {
  _id: string;
  company: string;
  street: string;
  zip: string;
  city: string;
  taxId: string;
};

const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: client } = useFetch<Client>(
  `${backendBaseUrl}/restapi/client/${route.params.id}`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      Userid: authStore.userId,
    },
  }
);

async function patchClient() {
  try {
    const res = await $fetch(`/api/clients?id=${route.params.id}`, {
      method: "PATCH",
      body: {
        company: company.value,
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
      navigateTo("/clients");
    }
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
const company = ref(client?.value?.company);
const street = ref(client?.value?.street);
const zip = ref(client?.value?.zip);
const city = ref(client?.value?.city);
</script>
