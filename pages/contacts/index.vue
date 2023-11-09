<template>
  <div class="container mx-auto flex flex-col items-start">
    <section class="mb-12">
      <BaseHeadline class="mb-4" type="h1" text="Contacts" />
      <BaseButton
        to="/contacts/create"
        text="Create contact"
        variant="yellow"
      />
    </section>
    <section class="mb-2 w-full">
      <div class="flex w-full items-center justify-between gap-8">
        <div class="flex gap-3">
          <div>
            <span class="text-sm font-bold text-secondary-100">{{
              contacts?.length
            }}</span>
            <span class="text-sm font-bold text-secondary-100"> of </span>
            <span
              v-if="contactCount"
              class="text-sm font-bold text-secondary-100"
              >{{ contactCount }}</span
            >
            <span class="text-sm font-bold text-secondary-100"> Contacts</span>
          </div>
          <div>
            <span class="text-sm font-bold text-secondary-100"
              >{{ startRange }} to {{ endRange }}</span
            >
          </div>
        </div>
        <div class="flex gap-8">
          <div>
            <USelect
              color="white"
              v-model.number="pageSize"
              :options="pageSizeOptions"
              @change="reloadData"
            />
          </div>
          <UPagination
            v-model.number="page"
            size="sm"
            :page-count="pageSize"
            :total="contactCount"
            ><template #prev="{ onClick }">
              <UTooltip text="Previous page">
                <UButton
                  icon="i-heroicons-arrow-small-left-20-solid"
                  color="primary"
                  :ui="{ rounded: 'rounded-full' }"
                  class="me-2 rtl:[&_span:first-child]:rotate-180"
                  @click="onClick"
                />
              </UTooltip>
            </template>

            <template #next="{ onClick }">
              <UTooltip text="Next page">
                <UButton
                  icon="i-heroicons-arrow-small-right-20-solid"
                  color="primary"
                  :ui="{ rounded: 'rounded-full' }"
                  class="ms-2 rtl:[&_span:last-child]:rotate-180"
                  @click="onClick"
                />
              </UTooltip> </template
          ></UPagination>
        </div>
      </div>
    </section>
    <section class="w-full">
      <div
        v-if="!contacts && !contacts?.length"
        class="flex flex-col items-start gap-4"
      >
        <p>No contacts created yet! Start creating your first contact.</p>
      </div>
      <div>
        <div class="max-w-full overflow-x-auto">
          <table class="min-w-full overflow-hidden rounded-lg">
            <thead
              class="border-x-2 border-t-2 border-yellow-dark bg-blue-80 text-white"
            >
              <tr>
                <th class="px-6 py-5 text-left">Firstname</th>
                <th class="px-6 py-5 text-left">Lastname</th>
                <th class="px-6 py-5 text-left">DOB</th>
                <th class="px-6 py-5 text-left">Street</th>
                <th class="px-6 py-5 text-left">Zip</th>
                <th colspan="2" class="px-6 py-5 text-left">City</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="contact in contacts"
                :key="contact.id"
                class="card rounded border-2 p-4 even:bg-[rgba(0,0,0,0.05)]"
              >
                <td class="truncate px-6 py-3">{{ contact.firstname }}</td>
                <td class="px-6 py-3">{{ contact.lastname }}</td>
                <td class="px-6 py-3">
                  {{
                    new Date(contact.dob)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .split("/")
                      .join(".")
                  }}
                </td>
                <td class="line-clamp-1 px-6 py-3">
                  <span class="truncate">{{ contact.street }}</span>
                </td>
                <td class="px-6 py-3">{{ contact.zip }}</td>
                <td class="px-6 py-3">{{ contact.city }}</td>
                <td class="px-6 py-3">
                  <UIcon name="i-heroicons-ellipsis-vertical" />
                  <NuxtLink :to="`/contacts/${contact._id}`"
                    ><UIcon name="i-heroicons-pencil-square"
                  /></NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex justify-end py-4">
        <UPagination
          v-model.number="page"
          size="sm"
          :page-count="pageSize"
          :total="contactCount"
          ><template #prev="{ onClick }">
            <UTooltip text="Previous page">
              <UButton
                icon="i-heroicons-arrow-small-left-20-solid"
                color="primary"
                :ui="{ rounded: 'rounded-full' }"
                class="me-2 rtl:[&_span:first-child]:rotate-180"
                @click="onClick"
              />
            </UTooltip>
          </template>

          <template #next="{ onClick }">
            <UTooltip text="Next page">
              <UButton
                icon="i-heroicons-arrow-small-right-20-solid"
                color="primary"
                :ui="{ rounded: 'rounded-full' }"
                class="ms-2 rtl:[&_span:last-child]:rotate-180"
                @click="onClick"
              />
            </UTooltip> </template
        ></UPagination>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
const authStore = useAuthStore();
const page = ref(1);
const pages = computed(() =>
  Math.ceil(parseInt(contactCount.value as any) / pageSize.value)
);
const items = ref(Array(55));
const pageSizeOptions = [10, 20, 30, 40, 50];
const pageSize = ref(pageSizeOptions[1]);
const startRange = computed(
  () => 1 + pageSize.value * page.value - pageSize.value
);
const endRange = computed(() => pageSize.value * page.value);

const { data: contacts, execute } = useFetch(
  `http://localhost:8000/api/contact`,
  {
    params: {
      page,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
    },
  }
);

const { data: contactCount } = useFetch(
  `http://localhost:8000/api/contact/count`,
  {
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      ClientId: authStore.userId,
    },
  }
);

function reloadData() {
  console.log("reloadData");
  execute();
}
</script>
