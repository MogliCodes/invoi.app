<template>
  <div>
    <component
      :is="props.type"
      :class="{ 'font-syne text-5xl font-extrabold': props.type === 'h1' }"
      >{{ text }}</component
    >
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
