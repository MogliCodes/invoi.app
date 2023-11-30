<template>
  <div
    class="fixed right-4 top-4 rounded-lg bg-green-50 px-4 py-3 text-green-100 shadow-xl"
  >
    <span v-if="props.message">{{ props.message }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>
