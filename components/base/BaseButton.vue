<template>
  <component
    :is="componentType"
    :to="to"
    class="inline-block rounded-full px-6 py-3 font-medium"
    :class="[
      buttonClasses,
      disabled
        ? 'hover:cursor-not-allowed pointer-events-none bg-gray-300 !border-gray-300 !text-gray-400'
        : 'cursor-pointer',
    ]"
  >
    {{ props.text }}
  </component>
</template>

<script setup lang="ts">
import type { ConcreteComponent } from "vue";

type Props = {
  disabled?: boolean;
  text: string;
  to?: string;
  type?: "button" | "submit";
  variant?: "yellow" | "secondary" | "outline" | "red";
};

const NuxtLink = resolveComponent("NuxtLink");

const componentType = computed<ConcreteComponent | string>(() => {
  return props.to ? NuxtLink : "button";
});

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: "button",
  to: "",
  variant: "yellow",
});

const STYLE_MAPS = {
  red: "bg-red-500 text-red-100",
  yellow: "border-2 border-yellow-normal bg-yellow-normal text-yellow-dark",
  yellowDark: "bg-yellow-400 text-yellow-950",
  outline:
    "border-2 bg-transparent border-blue-900 text-blue-900 dark:bg-transparent dark:border-white dark:text-white",
  secondary: "bg-secondary-100 text-white",
};

const buttonClasses = STYLE_MAPS[props.variant];
</script>
