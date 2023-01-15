<template>
  <div class="container mx-auto">
    <h1 class="text-4xl">Dashboard</h1>
    <button @click="client.auth.signOut()">Logout</button>
    <pre>{{ userSettings }}</pre>
    <pre>
      {{ user }}
    </pre>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

definePageMeta({
  middleware: 'auth'
})

const userSettings = await fetchUserSettings()

async function fetchUserSettings() {
    const { data: userData } = await useAsyncData('restaurant', async () => {
      const { data } = await client.from('UserSettings').select('userId').eq('userId', user?.value?.id)
      return data
    })
    if(userData.value.length <= 0 ) {
      insertInitialUserSettings(user?.value?.id)
    } else {
      console.log(`user exists and has id ${userData.value[0].userId}`)
    }
    return userData.value[0].userId
}

async function insertInitialUserSettings(userId) {
  const { error } = await client
      .from('UserSettings')
      .insert({ userId: userId })
}




</script>
