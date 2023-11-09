<template>
  <div class="container mx-auto">
    <div class="mb-12">
      <BaseHeadline class="mb-4" type="h1" text="Create a new invoice" />
      <BaseButton text="Add position" @click="addPosition" />
    </div>
    <div>
      <div>
        <label for="">Client</label>
      </div>
      <div v-if="selectedClient" class="border-2 mb-4 p-2">
        <Listbox v-model="selectedClient.company">
          <ListboxButton>{{ selectedClient.company }}</ListboxButton>
          <ListboxOptions>
            <!-- Use the `active` state to conditionally style the active option. -->
            <!-- Use the `selected` state to conditionally style the selected option. -->
            <ListboxOption
              v-for="client in clients"
              :key="client.company"
              :value="client.company"
              as="template"
              v-slot="{ active, selected }"
            >
              <li
                :class="{
                  'bg-blue-500': active,
                  'bg-white text-black': !active,
                }"
              >
                {{ client.company }}
              </li>
            </ListboxOption>
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
    <table class="w-full">
      <thead
        class="border-x-2 border-t-2 border-yellow-dark bg-blue-80 text-white"
      >
        <tr>
          <th class="px-6 py-3 text-left">Position</th>
          <th class="px-6 py-3 text-left">Description</th>
          <th class="px-6 py-3 text-left">Stundensatz</th>
          <th class="px-6 py-3 text-left">Faktor</th>
          <th class="px-6 py-3 text-left">Gesamtpreis</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="`position-${index}`"
          class="card rounded border-2 p-4 even:bg-[rgba(0,0,0,0.05)]"
        >
          <td class="px-6 py-3">{{ row.position }}</td>
          <td class="px-6 py-3">
            <input v-model="row.description" type="text" />
          </td>
          <td class="px-6 py-3">{{ row.hours }}</td>
          <td class="px-6 py-3">{{ row.factor }}</td>
          <td class="px-6 py-3"><input v-model="row.total" type="number" /></td>
        </tr>
      </tbody>
      <tfoot class="border-x-2 border-t-2 border-yellow-dark">
        <tr class="bg-gray-dark text-white">
          <td colspan="4" class="px-6 py-3">Gesamt</td>
          <td class="px-6 py-3">
            <span>{{ totalAmount }} €</span>
          </td>
        </tr>
        <tr class="bg-gray-dark text-white">
          <td colspan="4" class="px-6 py-3">Mwst.</td>
          <td class="px-6 py-3">
            <span>{{ taxes }} €</span>
          </td>
        </tr>
        <tr class="bg-blue-80 text-white">
          <td colspan="4" class="px-6 py-3">
            <span class="font-bold">Brutto-Rechnungssumme</span>
          </td>
          <td class="px-6 py-3">
            <span>{{ totalWithTaxes }} €</span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();

const { data: clients } = useFetch(`http://localhost:8000/api/client`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    ClientId: authStore.userId,
  },
});
const selectedClient = ref(clients?.value?.[0]);

const rows = ref([
  { position: 1, description: "description", hours: 0, factor: 0, total: 0 },
]);

const totalAmount = computed(() => {
  return rows.value.reduce(
    (accumulator, currentItem) => accumulator + currentItem.total,
    0
  );
});

const hasTaxes: Ref<boolean> = ref(true);

const taxes = computed(() => {
  return hasTaxes.value ? totalAmount.value * 0.19 : totalAmount.value * 0;
});

const totalWithTaxes = computed(() => {
  return totalAmount.value + taxes.value;
});

function addPosition() {
  rows.value.push({
    position: rows.value.length + 1,
    description: "description",
    hours: 0,
    factor: 0,
    total: 0,
  });
}

const fileInput = ref(null);
</script>
