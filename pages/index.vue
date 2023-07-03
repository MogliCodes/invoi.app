<template>
  <div>
    {{ user }}
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
n;
if (user.value) navigateTo("/dashboard");
</script>
