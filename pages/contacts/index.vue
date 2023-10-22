<template>
  <div class="container mx-auto flex flex-col items-start">
    <div class="mb-12">
      <BaseHeadline class="mb-4" type="h1" text="Contacts" />
      <BaseButton
        to="/contacts/create"
        text="Create contact"
        variant="yellow"
      />
    </div>
    <div class="w-full">
      <div v-if="!contacts.length" class="flex flex-col items-start gap-4">
        <p>No contacts created yet! Start creating your first contact.</p>
      </div>
      <div>
        <div class="mb-2">
          <span class="text-secondary-100 text-sm font-bold"
            >{{ contacts.length }} Contacts</span
          >
        </div>
        <table class="w-full">
          <thead
            class="border-x-2 border-t-2 border-yellow-dark bg-blue-80 text-white"
          >
            <th class="text-left px-6 py-3">Firstname</th>
            <th class="text-left px-6 py-3">Lastname</th>
            <th class="text-left px-6 py-3">DOB</th>
            <th class="text-left px-6 py-3">Street</th>
            <th class="text-left px-6 py-3">Zip</th>
            <th class="text-left px-6 py-3">City</th>
          </thead>
          <tbody>
            <tr
              v-for="contact in contacts"
              :key="contact.id"
              class="card rounded border-2 p-4 even:bg-[rgba(0,0,0,0.05)]"
            >
              <td class="px-6 py-3">{{ contact.firstname }}</td>
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
              <td class="px-6 py-3">{{ contact.street }}</td>
              <td class="px-6 py-3">{{ contact.zip }}</td>
              <td class="px-6 py-3">{{ contact.city }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();

const { data: contacts } = useFetch(`http://localhost:8000/api/contact`, {
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    ClientId: authStore.userId,
  },
});
</script>
