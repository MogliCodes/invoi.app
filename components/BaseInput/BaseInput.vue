<template>
  <input
    class="font-inherit w-full rounded-lg border-2 border-gray-200 bg-gray-100 text-yellow-dark focus:border-2 focus:border-yellow-normal focus:outline-0 dark:border-white dark:border-opacity-20 dark:bg-black dark:bg-opacity-20 dark:text-gray-100 dark:placeholder-gray-600 dark:focus:border-yellow-300"
    :class="[
      { 'text-sm': props.type === 'file' },
      props.size === 'md' ? 'p-2' : 'p-1 text-sm',
    ]"
    :type="props.type"
    :placeholder="props.placeholder || modelValue"
    @input="updateValue"
    :value="modelValue"
  />
</template>

<script setup lang="ts">
type Props = {
  placeholder?: string;
  modelValue?: string | number;
  type?: "text" | "file" | "date" | "password" | "number";
  size?: "sm" | "md";
};

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  modelValue: "",
  type: "text",
  size: "md",
});
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>
