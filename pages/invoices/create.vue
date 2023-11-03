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
      <div class="border-2">
        <Listbox v-if="clients" v-model="selectedClient">
          <div class="relative mt-1">
            <ListboxButton
              class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span class="block truncate">{{ selectedClient?.company }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <ChevronUpDownIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="ring-black/5 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-for="client in clients"
                  v-slot="{ active, selected }"
                  :key="client?.company"
                  :value="client?.company"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ person.name }}</span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
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
          <td class="px-6 py-3">{{ row.position }}</td>
          <td class="px-6 py-3">{{ row.position }}</td>
          <td class="px-6 py-3">{{ row.position }}</td>
        </tr>
      </tbody>
      <tfoot
        class="border-x-2 border-t-2 border-yellow-dark bg-blue-80 text-white"
      >
        <tr>
          <td colspan="3" class="px-6 py-3">test</td>
          <td class="px-6 py-3">test</td>
          <td class="px-6 py-3">test</td>
        </tr>
      </tfoot>
    </table>
    {{ clients }}
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

async function handleUpload() {
  const file = fileInput.value?.files?.[0];
  const formData = new FormData();
  formData.append("file", file);

  const res = await useFetch("http://localhost:8000/api/invoice/template", {
    method: "POST",
    body: formData,
  });
  console.log(res);
}
</script>
