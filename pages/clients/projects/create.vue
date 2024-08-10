<template>
  <section class="mt-10">
    <BaseHeadline type="h2" text="Projektdetails" />
    <BaseBox class="flex w-1/2 flex-col gap-5">
      <div>
        <BaseLabel text="Projekttitel" />
        <BaseInput v-model="projectTitle" />
      </div>
      <div>
        <BaseLabel text="Beschreibung" />
        <UTextarea v-model="description" />
      </div>
      <div v-if="clients">
        <BaseLabel text="Kunde" />
        <USelect
          size="lg"
          v-model="selectedClient"
          placeholder="Wähle einen Kunden aus"
          :options="clients"
          option-attribute="company"
          value-attribute="_id"
        >
          <template #label>
            {{ selectedClient?.company }}
          </template>
        </USelect>
      </div>
      <div v-if="proposals">
        <BaseLabel text="Angebot" />
        <USelect
          size="lg"
          v-model="selectedProposal"
          placeholder="Wähle ein Angebot aus"
          option-attribute="company"
          value-attribute="_id"
        >
          <template #label>
            {{ selectedClient?.company }}
          </template>
        </USelect>
      </div>
      <BaseButton text="Speichern" @click="createProject" />
    </BaseBox>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
definePageMeta({
  title: "Projekt anlegen",
});
const authStore = useAuthStore();

/* ========================================================
 * Data fetching
 ======================================================== */
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;

const { data: clients } = useFetch<Array<Client>>(
  `${backendBaseUrl}/restapi/client`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);
const proposals = ref<Proposal[]>([]);
const selectedClient = ref<Client | null>(null);
const projectTitle = ref<string>("");
const description = ref<string>("");
const alertStore = useAlertStore();
async function createProject() {
  console.log("Create project");
  const response = await $fetch("/api/clients/projects", {
    method: "POST",
    body: {
      client: selectedClient.value,
      title: projectTitle.value,
      description: description.value,
    },
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  });
  if (response.status === 201) {
    alertStore.setAlert("success", response.message);
    navigateTo("/clients/projects");
    setTimeout(() => {
      alertStore.resetAlert();
    }, 5000);
  }
}
</script>
