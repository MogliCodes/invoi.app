<template>
  <div class="w-1/3 rounded border p-4">
    <span class="text-xl font-bold">{{ props.client.company }}</span
    ><br />
    <span>{{ props.client.street }}</span
    ><br />
    <pre>{{ props.client }}</pre>
  </div>
</template>

<script setup lang="ts">
type Props = {
  client: object;
};

const props = defineProps<Props>();
</script>
