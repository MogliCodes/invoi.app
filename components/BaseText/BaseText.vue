<template>
  <span :class="[props.textColor, props.textColorDarkMode]">
    <slot />
  </span>
</template>

<script setup lang="ts">
type Props = {
  textColor?: "text-black";
  textColorDarkMode?: "dark:text-white";
};
const props = withDefaults(defineProps<Props>(), {
  textColor: "text-black",
  textColorDarkMode: "dark:text-white",
});
</script>
