<template>
  <section>
    <div class="flex items-center gap-3 mb-12">
      <BaseButton
        to="/clients/projects/create"
        text="Create project"
        variant="yellow"
      />
    </div>
  </section>
  <section v-if="!projects">
    <BaseNote>
      <p>
        You have not created any projects yet. Click the button above to create
        your first project.
      </p>
    </BaseNote>
  </section>
  <section v-else class="mt-10">
    <BaseTable class="w-full overflow-hidden rounded-lg dark:text-gray-400">
      <template #head>
        <th class="px-6 py-5 text-left">Title</th>
        <th class="px-6 py-5 text-left">Client</th>
        <th class="px-6 py-5 text-left">Description</th>
        <th class="px-6 py-5 text-left">Fortschritt</th>
        <th class="px-6 py-5 text-left">Budget</th>
        <th class="px-6 py-5 text-left">Aufgewendete Zeit</th>
        <th class="px-6 py-5 text-right">Actions</th>
      </template>
      <template #body>
        <tr
          v-for="project in projects"
          :key="project._id"
          class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
        >
          <td class="px-6 py-3">{{ project.title }}</td>
          <td class="px-6 py-3">{{ getClientName(project.client) }}</td>
          <td class="px-6 py-3">{{ project.description }}</td>
          <td class="px-6 py-3">
            <span class="relative block h-2 w-28 rounded-full border-2">
              <span
                class="absolute -left-[2px] -top-[2px] left-0 block h-2 w-1/2 rounded-full bg-green-300"
              ></span>
            </span>
          </td>
          <td class="px-6 py-3"></td>
          <td class="px-6 py-3"></td>
          <td class="px-6 py-3">
            <span class="flex justify-end gap-2">
              <NuxtLink :to="`/clients/projects`">
                <UIcon
                  class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                  name="i-heroicons-eye"
                />
              </NuxtLink>
              <UIcon
                class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                name="i-heroicons-trash"
                @click="deleteProject(project._id)"
              />
            </span>
          </td>
        </tr>
      </template>
    </BaseTable>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

definePageMeta({
  title: "Projects",
});

const authStore = useAuthStore();
const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;

const { data: projects, refresh } = useFetch("/api/clients/projects/get", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});

const { data: clients } = useFetch<Client[]>(
  `${backendBaseUrl}/restapi/client`,
  {
    headers: {
      userId: authStore.userId,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  }
);

function getClientName(clientId: string) {
  const client = clients?.value?.find(
    (client: Client) => client._id === clientId
  );
  return client?.company;
}

async function deleteProject(projectId: string) {
  console.log(projectId);
  await $fetch(`/api/clients/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  });
  refresh();
}
</script>
