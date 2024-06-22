<template>
  <label class="text-gray-400 text-sm" :for="props.for">{{ props.text }}</label>
</template>

<script setup lang="ts">
type Props = {
  for?: string;
  text: string;
};

const props = withDefaults(defineProps<Props>(), {
  for: "",
});
</script>
