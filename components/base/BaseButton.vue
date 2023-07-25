<template>
  <button class="rounded bg-blue-700 px-6 py-3 text-white">
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
type Props = {
  text: string;
};

const props = withDefaults(defineProps<Props>(), {});
</script>
