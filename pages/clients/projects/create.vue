<template>
  <section class="mt-10">
    <BaseBox class="flex w-1/2 flex-col gap-5">
      <div v-if="clients">
        <label for="">Client</label>
        <USelect
          v-model="selectedClient"
          placeholder="Select client"
          :options="clients"
          option-attribute="company"
          value-attribute="_id"
        >
          <template #label>
            {{ selectedClient?.company }}
          </template>
        </USelect>
      </div>
      <div>
        <label for="">Projekt title</label>
        <BaseInput v-model="projectTitle" />
      </div>
      <div>
        <label for="">Description</label>
        <UTextarea v-model="description" />
      </div>
      <BaseButton text="Save" @click="createProject" />
    </BaseBox>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
definePageMeta({
  title: "Create a project",
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

const selectedClient = ref<Client | null>(null);
const projectTitle = ref<string>("");
const description = ref<string>("");

async function createProject() {
  console.log("Create project");
  const res = await $fetch("/api/clients/projects", {
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
}
</script>
