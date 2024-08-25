<template>
  <div class="overflow-hidden rounded-lg border-2 bg-white">
    <div v-if="props.modelValue && editor" class="editor p-2">
      <editor-content :disabled="true" :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
// eslint-disable-next-line import/no-named-as-default
import StarterKit from "@tiptap/starter-kit";

type Props = {
  modelValue: string;
};
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const editor: Ref<Editor | null> = ref(null);

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value?.getHTML() === value;
    if (isSame) {
      return;
    }
    editor.value?.commands.setContent(`${value}`);
    emit("update:modelValue", editor.value?.getHTML() || "");
  }
);

onMounted(() => {
  editor.value = new Editor({
    content: `${props.modelValue}`,
    extensions: [StarterKit],
    parseOptions: {
      preserveWhitespace: false,
    },
  });

  editor.value.on("update", () => {
    emit("update:modelValue", editor.value?.getHTML() || "");
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style>
.editor {
  h1,
  h2,
  h3 {
    font-weight: bold;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.6rem;
  }
  h3 {
    font-size: 1.3rem;
  }
}

.editor ul {
  padding-left: 18px;
}

.editor ul li {
  list-style-type: disc;
}
</style>
