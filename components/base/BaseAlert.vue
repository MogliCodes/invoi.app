<script lang="ts" setup>
type Props = {
  message: string;
  type: "error" | "info" | "success";
};
defineProps<Props>();
</script>

<template>
  <div
    class="border-yellow-darky fixed inset-x-4 top-4 z-10 block rounded bg-yellow-normal p-4 text-yellow-dark shadow-2xl"
  >
    {{ message }}
  </div>
</template>

<style scoped></style>
