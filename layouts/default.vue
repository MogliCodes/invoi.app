<template>
  <div class="pb-8">
    <TheNewHeader />
    <TheMainContent>
      <slot />
    </TheMainContent>
  </div>
</template>
<script setup lang="ts">
import TheNewHeader from "~/components/TheNewHeader.vue";
</script>
