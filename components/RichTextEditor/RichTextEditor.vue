<template>
  <div class="overflow-hidden rounded-lg border-2 bg-white">
    <div v-if="editor" class="flex flex-wrap gap-1 bg-gray-100 p-2">
      <IconButton size="xs" variant="outline" icon="i-material-symbols-lists" />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-format-italic"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-format-strikethrough"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-format-paragraph"
        @click="editor.chain().focus().setParagraph().run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-format-h1"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-format-h2"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-format-h3"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-format-list-bulleted"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-format-list-numbered"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-horizontal-rule"
        @click="editor.chain().focus().setHorizontalRule().run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-undo"
        @click="editor.chain().focus().undo().run()"
      />
      <IconButton
        size="xs"
        variant="outline"
        icon="i-material-symbols-redo"
        @click="editor.chain().focus().redo().run()"
      />
    </div>
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
