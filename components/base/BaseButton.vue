<template>
  <nuxt-link
    :is="componentType"
    :to="to"
    class="inline-block cursor-pointer rounded-lg px-6 py-3"
    :class="{
      'bg-yellow-normal text-yellow-dark': props.variant === 'yellow',
      border: props.variant === 'outline',
    }"
  >
    {{ props.text }}
  </nuxt-link>
</template>

<script setup lang="ts">
type Props = {
  text: string;
  to?: string;
  variant?: "yellow" | "outline";
};

const componentType = computed<string>(() => {
  return props.to ? "NuxtLink" : "button";
});

const props = withDefaults(defineProps<Props>(), {
  to: "",
  variant: "yellow",
});
</script>
