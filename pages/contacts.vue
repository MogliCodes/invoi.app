<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-4" type="h1" text="Contacts" />
    <div class="grid gap-4">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="card rounded border p-4"
      >
        {{ contact.id }}
        {{ contact.firstname }}
        {{ contact.lastname }}
      </div>
    </div>
    <div>
      <div>
        <input v-model="firstname" class="my-2 border" type="text" />
        <input v-model="lastname" class="my-2 border" type="text" />
        <button @click="createContact">Save</button>
      </div>
    </div>
  </div>
</template>
