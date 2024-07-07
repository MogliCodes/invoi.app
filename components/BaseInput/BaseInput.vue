<template>
  <input
    :class="[
      baseStyles,
      { 'text-sm': props.type === 'file' },
      props.size === 'md' ? 'p-2' : 'p-1 text-sm',
      { [styleMap.enabled]: !showErrorMessage },
      { [styleMap.error]: showErrorMessage },
    ]"
    :type="props.type"
    :placeholder="props.placeholder || modelValue"
    :value="modelValue"
    @input="updateValue"
    @focusout="validate"
  />
  <p v-show="showErrorMessage" class="text-red-400 text-sm mt-1">
    {{ props.errorMessage }}
  </p>
</template>

<script setup lang="ts">
type Props = {
  placeholder?: string;
  modelValue?: string | number;
  type?: "text" | "file" | "date" | "password" | "number";
  size?: "sm" | "md";
  isRequired?: boolean;
  errorMessage?: string;
};

const baseStyles =
  "font-inherit w-full rounded-lg border-2 text-yellow-dark focus:border-2 focus:outline-0 dark:border-white dark:border-opacity-20";

const styleMap = {
  enabled:
    "border-gray-200 bg-gray-100 focus:border-yellow-normal dark:bg-black dark:bg-opacity-20 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-yellow-300",
  error: "bg-red-100 border-red-300",
};

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  modelValue: "",
  type: "text",
  size: "md",
  isRequired: false,
  errorMessage: "Please provide a value",
});
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};
const showErrorMessage = ref(false);

function validate(event: any) {
  console.log("validate", event.target.value);
  if (props.isRequired && event.target.value === "") {
    showErrorMessage.value = true;
  } else {
    showErrorMessage.value = false;
  }
}
</script>
