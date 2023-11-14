<template>
  <input
    class="rounded-lg focus:outline-0 focus:border-2 focus:border-yellow-normal border-2 border-gray-200 bg-gray-100 p-2 text-yellow-dark w-full dark:border-white dark:border-opacity-20 dark:focus:border-yellow-300 dark:placeholder-gray-600 dark:bg-black dark:bg-opacity-20 font-inherit dark:text-gray-100"
    :type="props.type"
    @input="updateValue"
    :value="modelValue"
    :placeholder="props.placeholder"
  />
</template>

<script setup lang="ts">
type Props = {
  placeholder?: string;
  modelValue?: string;
  type?: "text" | "file" | "date" | "password";
};

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  modelValue: "",
  type: "text",
});
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>
