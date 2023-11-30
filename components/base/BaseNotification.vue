<template>
  <div
    class="fixed shadow-xl right-4 py-3 rounded-lg px-4 top-4 bg-green-50 text-green-100"
  >
    <span v-if="props.message">{{ props.message }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>
