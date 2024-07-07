<template>
  <label class="text-sm text-gray-400" :for="props.for">{{ props.text }}</label>
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
