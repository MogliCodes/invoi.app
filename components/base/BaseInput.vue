<template>
  <input class="rounded border-2 p-2" type="text" @input="updateValue" />
</template>

<script setup lang="ts">
type Props = {
  modelValue: String;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
