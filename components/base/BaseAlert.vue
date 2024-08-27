<script lang="ts" setup>
type Props = {
  message: string;
  type: "error" | "info" | "success";
  link: string;
};
const props = defineProps<Props>();

const colorClass = computed(() => {
  switch (props.type) {
    case "error":
      return `bg-red-300 text-red-900`;
    case "info":
      return `bg-sky-300 text-sky-900`;
    case "success":
      return `bg-green-400 text-green-900`;
  }
});
</script>

<template>
  <div class="inset-x-6 block rounded-lg p-4 shadow-2xl" :class="colorClass">
    <span>{{ props.message }}</span>
    <a :href="props.link">{{ props.link }}</a>
  </div>
</template>
