<template>
  <div>
    <h1 class="text-4xl">Dashboard</h1>
    <button @click="client.auth.signOut()">Logout</button>
  </div>
</template>

<script setup>
const client = useSupabaseAuthClient()

definePageMeta({
  middleware: 'auth'
})

</script>
