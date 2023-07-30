<template>
  <input class="rounded border-2 p-2" :type="props.type" @input="updateValue" />
</template>

<script setup lang="ts">
type Props = {
  modelValue?: String;
  type: "text" | "file" | "date" | "password";
};

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>
