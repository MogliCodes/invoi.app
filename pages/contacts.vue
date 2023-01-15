<template>
  <div class="container mx-auto">
    <h1 class="text-4xl">Contacts</h1>

    <div class="grid">
      <div class="card border rounded p-4" v-for="contact in contacts" :key="contact.id">
        {{ contact.id }}
        {{ contact.firstname }}
        {{ contact.lastname }}
      </div>
    </div>

  </div>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

async function fetchContacts() {
  const { data: contacts } = await useAsyncData('contacts', async () => {
    const { data } = await client.from('Contacts').select('id, userId, firstname, lastname, company').eq('userId', user?.value?.id)
    return data
  })
  return contacts
}
const contacts = await fetchContacts()

</script>
