<template>
  <span class="flex gap-2">
    <UIcon
      title="Neue Position darunter einfügen"
      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
      name="i-heroicons-arrow-turn-down-right"
      @click="emit('addRow')"
    />
    <UIcon
      title="Position duplizieren"
      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
      name="i-heroicons-document-duplicate"
    />
    <UIcon
      title="Position löschen"
      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
      name="i-heroicons-trash"
      @click="emit('deleteRow')"
    />
    <UIcon
      title="Position löschen"
      class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
      name="i-heroicons-arrow-long-right"
      @click="emit('addSubtotal')"
    />
  </span>
</template>

<script setup lang="ts">
const emit = defineEmits(["addRow", "deleteRow", "addSubtotal"]);
</script>
