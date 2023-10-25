<template>
  <input
    class="rounded border-2 border-gray-medium p-2 text-yellow-dark w-full"
    :type="props.type"
    @input="updateValue"
  />
</template>

<script setup lang="ts">
type Props = {
  modelValue?: string;
  type?: "text" | "file" | "date" | "password";
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
});
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>
