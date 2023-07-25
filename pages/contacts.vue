<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-4" type="h1" text="Contacts" />
    <div class="grid gap-4">
      <div
        class="card border rounded p-4"
        v-for="contact in contacts"
        :key="contact.id"
      >
        {{ contact.id }}
        {{ contact.firstname }}
        {{ contact.lastname }}
      </div>
    </div>
    <div>
      <div>
        <input class="my-2 border" v-model="firstname" type="text" />
        <input class="my-2 border" v-model="lastname" type="text" />
        <button @click="createContact">Save</button>
      </div>
    </div>
  </div>
</template>
