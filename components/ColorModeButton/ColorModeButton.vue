<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <ClientOnly>
    <UButton
      class="bg-white dark:bg-blue-90 dark:text-gray-600 rounded-lg h-9 w-9 flex justify-center"
      :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="w-9 h-9" />
    </template>
  </ClientOnly>
</template>
