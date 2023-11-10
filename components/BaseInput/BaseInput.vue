<template>
  <input
    class="rounded-lg focus:outline-0 focus:border-2 focus:border-yellow-normal border-2 border-blue-90 p-2 text-yellow-dark w-full bg-white font-inherit"
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
