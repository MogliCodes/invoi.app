<template>
  <div class="flex flex-col gap-6">
    <section>
      <div class="flex items-center gap-3 mt-3">
        <BaseButton
          to="/services/create"
          text="Create services"
          variant="yellow"
        />
        <BaseButton
          to="/services/import"
          text="Import services"
          variant="outline"
        />
      </div>
    </section>
    <section v-if="!services" class="flex">
      <BaseBox class="text-center">
        <BaseHeadline text="No services available" type="h2"></BaseHeadline>
        <p>
          There are currently no services available. <br />
          Go ahead and create your first service!
        </p>
        <BaseButton
          to="/services/create"
          text="Create service"
          variant="yellow"
        />
      </BaseBox>
    </section>
    <section v-else>
      <table class="min-w-full overflow-hidden rounded-lg dark:text-gray-400">
        <thead class="bg-blue-90 text-white">
          <tr>
            <th class="py-5 pl-6 text-left">Name</th>
            <th class="px-6 py-5 text-left">Description</th>
            <th class="px-6 py-5 text-left">Price</th>
            <th class="px-6 py-5 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
            v-for="service in services"
          >
            <td class="py-3 pl-6">{{ service.name }}</td>
            <td class="py-3 pl-6">{{ service.description }}</td>
            <td class="py-3 pl-6">
              {{ formatCurrencyAmount(formatCentToAmount(service.price)) }}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();

definePageMeta({
  title: "Services",
});

const {
  data: services,
  pending,
  error,
} = useFetch<string>(`/api/services/`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    Userid: authStore.userId,
  },
});
</script>
