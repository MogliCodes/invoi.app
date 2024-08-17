<template>
  <div class="bg-blue-50 font-sans text-black dark:bg-blue-90">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | invoi.app` : "invoi.app";
  },
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
