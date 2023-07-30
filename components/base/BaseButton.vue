<template>
  <nuxt-link
    :is="componentType"
    :to="to"
    class="cursor-pointer rounded bg-blue-700 px-6 py-3 text-white"
  >
    {{ props.text }}
  </nuxt-link>
</template>

<script setup lang="ts">
type Props = {
  text: string;
  to?: string;
};

const componentType = computed<String>(() => {
  return props.to ? "NuxtLink" : "button";
});

const props = withDefaults(defineProps<Props>(), {
  to: "",
});
</script>
