<template>
  <header class="mb-8 bg-gray-900 py-2">
    <div class="container mx-auto flex justify-between">
      <TheNavigation />
      <NuxtLink
        to="/login"
        class="rounded border border-white p-2 px-4 text-white"
        >Login</NuxtLink
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import TheNavigation from "~/components/TheNavigation.vue";
</script>
