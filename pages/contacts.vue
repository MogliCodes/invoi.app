<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-4" type="h1" text="Contacts" />
    <div class="grid gap-4">
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
  console.log('FETCH CONTACTS')
  const { data: contacts } = await useAsyncData('contacts', async () => {
    const { data } = await client.from('Contacts').select('id, userId, firstname, lastname, company').eq('userId', user?.value?.id)
    return data
  })
  console.log(contacts)
  return contacts
}
const contacts = await fetchContacts()

</script>
