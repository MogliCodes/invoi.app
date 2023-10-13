<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-8" type="h1" text="Contacts" />
    <div v-if="!contacts.length" class="flex flex-col items-start gap-4">
      <p>No contacts created yet! Start creating your first contact.</p>
      <BaseButton
        to="/contacts/create"
        text="Create contact"
        variant="yellow"
      />
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="card rounded border p-4"
      >
        {{ contact.id }}<br />
        {{ contact.firstname }}<br />
        {{ contact.lastname }}<br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const contacts = [
  {
    id: "f34u34n3kj43k",
    firstname: "Otto",
    lastname: "Nachname",
    dob: "01.01.1970",
    street: "Musterstraße",
  },
  {
    id: "f34u34n3kj43k",
    firstname: "Otto",
    lastname: "Nachname",
    dob: "01.01.1970",
    street: "Musterstraße",
  },
  {
    id: "f34u34n3kj43k",
    firstname: "Otto",
    lastname: "Nachname",
    dob: "01.01.1970",
    street: "Musterstraße",
  },
  {
    id: "f34u34n3kj43k",
    firstname: "Otto",
    lastname: "Nachname",
    dob: "01.01.1970",
    street: "Musterstraße",
  },
];
</script>
