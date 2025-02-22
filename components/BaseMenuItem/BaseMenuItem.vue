<template>
  <NuxtLink
    active-class="text-yellow-300"
    exact-active-class="bg-yellow-300 !text-yellow-950 focus:border-yellow-100 hover:bg-yellow-200"
    :to="to"
    :class="[commonClasses, classes]"
  >
    <div class="flex w-full items-center gap-4">
      <UIcon v-if="icon" class="text-xl" :name="icon" />
      <span v-if="text">{{ text }}</span>
    </div>
    <slot name="trailingIcon"></slot>
  </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
  to?: string;
  text?: string;
  icon?: string;
  size?: "sm" | "md" | "lg";
  onDarkBg?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  to: "",
  text: "",
  icon: "",
  size: "md",
  onDarkBg: false,
});

const commonClasses = "flex items-center rounded-lg cursor-pointer";
const STYLE_MAP = {
  sm: {
    true: "px-3 py-2 text-white hover:bg-blue-80",
    false: "px-3 py-2 bg-gray-100",
  },
  md: {
    true: "px-3 py-2 text-sm md:text-md md:px-6 md:py-4 text-white hover:bg-blue-80",
    false: "px-6 py-4 bg-gray-100",
  },
  lg: {
    true: "px-8 py-6 text-white hover:bg-blue-80",
    false: "px-8 py-6 bg-gray-100",
  },
};

const classes = computed(() => {
  return STYLE_MAP[props.size][props.onDarkBg.toString()];
});
</script>
