<template>
  <component
    :is="componentType"
    :to="to"
    class="flex rounded-lg font-medium"
    :class="[
      buttonClasses,
      disabled
        ? 'pointer-events-none !border-gray-300 bg-gray-300 !text-gray-400 hover:cursor-not-allowed'
        : 'cursor-pointer',
    ]"
  >
    <UIcon
      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
      name="i-heroicons-arrow-left"
    />
  </component>
</template>

<script setup lang="ts">
import type { ConcreteComponent } from "vue";

type Props = {
  disabled?: boolean;
  text: string;
  to?: string;
  type?: "button" | "submit";
  variant?: "yellow" | "secondary" | "outline" | "red" | "amber";
  size?: "sm" | "md" | "lg";
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
  size: "md",
});

const STYLE_MAPS = {
  disabled: "bg-gray-100 text-gray-700 cursor-not-allowed",
  red: "bg-red-500 text-red-100",
  yellow: "border-2 border-yellow-normal bg-yellow-normal text-yellow-dark",
  amber: "bg-yellow-400 text-yellow-900",
  outline:
    "border-2 bg-transparent border-blue-900 text-blue-900 dark:bg-transparent dark:border-white dark:text-white",
  secondary: "border-2 border-secondary-100 bg-secondary-100 text-white",
};

const SIZE_MAP = {
  sm: "px-2 py-2",
  md: "px-3 py-3",
  lg: "px-6 py-6",
};

const buttonClasses = computed(() => {
  return props.disabled
    ? STYLE_MAPS.disabled + " " + SIZE_MAP[props.size]
    : STYLE_MAPS[props.variant] + " " + SIZE_MAP[props.size];
});
</script>
