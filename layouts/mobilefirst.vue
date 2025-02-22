<template>
  <div class="pb-8">
    <TheNewHeader />
    <TheMetaMenu />
    <TheMainContent>
      <slot />
    </TheMainContent>
  </div>
</template>
<script setup lang="ts">
import TheNewHeader from "~/components/TheNewHeader.vue";
import TheMetaMenu from "~/components/TheMetaMenu.vue";
</script>
