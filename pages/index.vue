<template>
  <div>
    <h1>test</h1>
    {{ user }}
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

if(user.value) navigateTo('/dashboard')

</script>
