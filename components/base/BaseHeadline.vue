<template>
  <div>
    <component :is="props.type" :class="{ 'text-4xl': props.type === 'h1' }">{{
      text
    }}</component>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: "h1" | "h2" | "h3";
  text: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "h1",
});
</script>
