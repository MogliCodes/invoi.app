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
      class="flex h-9 w-9 items-center justify-center rounded-lg bg-white transition hover:bg-gray-50 dark:bg-blue-90"
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
