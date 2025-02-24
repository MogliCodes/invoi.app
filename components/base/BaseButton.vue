<template>
  <component
    :is="componentType"
    :to="to"
    class="inline-block rounded-full font-medium"
    :class="[
      buttonClasses,
      disabled
        ? 'pointer-events-none !border-gray-300 bg-gray-300 !text-gray-400 hover:cursor-not-allowed'
        : 'cursor-pointer',
    ]"
  >
    <div class="flex items-center justify-center gap-2">
      <UIcon v-if="icon" class="scale-125" :name="icon" />
      {{ props.text }}
    </div>
  </component>
</template>

<script setup lang="ts">
import type { ConcreteComponent } from "vue";

type Props = {
  icon?: string;
  disabled?: boolean;
  text: string;
  to?: string;
  type?: "button" | "submit";
  variant?: "yellow" | "secondary" | "outline" | "red" | "amber";
  size?: "xs" | "sm" | "md" | "lg";
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
    "border-2 bg-white border-blue-900 text-blue-900 dark:bg-white dark:bg-opacity-10 dark:border-white dark:text-white",
  secondary: "border-2 border-secondary-100 bg-secondary-100 text-white",
};

const SIZE_MAP = {
  xs: "py-1 px-3 text-sm",
  sm: "px-4 py-2",
  md: "px-5 py-2.5",
  lg: "px-9 py-6",
};

const buttonClasses = computed(() => {
  return props.disabled
    ? STYLE_MAPS.disabled + " " + SIZE_MAP[props.size]
    : STYLE_MAPS[props.variant] + " " + SIZE_MAP[props.size];
});
</script>
