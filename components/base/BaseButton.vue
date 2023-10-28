<template>
  <component
    :is="componentType"
    :to="to"
    class="inline-block cursor-pointer rounded-full px-6 py-3 font-medium"
    :class="buttonClasses"
  >
    {{ props.text }}
  </component>
</template>

<script setup lang="ts">
import { ConcreteComponent } from "vue";

type Props = {
  text: string;
  to?: string;
  type?: "submit";
  variant?: "yellow" | "secondary" | "outline";
};

const NuxtLink = resolveComponent("NuxtLink");

const componentType = computed<ConcreteComponent | string>(() => {
  return props.to ? NuxtLink : "button";
});

const props = withDefaults(defineProps<Props>(), {
  to: "",
  variant: "yellow",
});

const STYLE_MAPS = {
  yellow: "bg-yellow-normal text-yellow-dark",
  outline: "bg-yellow-normal text-yellow-dark",
  secondary: "bg-secondary-100 text-white",
};

const buttonClasses = STYLE_MAPS[props.variant];
</script>
