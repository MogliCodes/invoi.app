<template>
  <component :is="props.type" :class="textClasses">{{ text }}</component>
</template>

<script setup lang="ts">
interface Props {
  type: "h1" | "h2" | "h3";
  text: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "h1",
});

const STYLE_MAP = {
  h1: "font-syne text-xl md:text-5xl font-extrabold",
  h2: "font-bold font-syne mb-3 text-gray-400 text-2xl",
  h3: "font-bold text-2xl",
};

const textClasses = computed(() => STYLE_MAP[props.type]);
</script>
