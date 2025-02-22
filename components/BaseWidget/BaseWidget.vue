<template>
  <div
    class="flex items-center justify-between border-b-2 py-2 pr-2 first-of-type:pt-0 last-of-type:border-0 last-of-type:pb-0 lg:border-b-0 lg:border-r-2"
  >
    <div>
      <BaseLabel :text="props.label" />
      <span
        class="block font-syne text-2xl font-bold text-secondary-100 lg:text-3xl xl:text-4xl"
        >{{ props.value }}</span
      >
    </div>
    <UIcon
      class="size-20 text-gray-300 lg:size-10 xl:size-20 dark:text-gray-600"
      :name="props.icon"
    />
  </div>
</template>

<script setup lang="ts">
type Props = {
  label: string;
  value: number;
  icon: string;
};

const props = defineProps<Props>();
</script>
