<template>
  <div class="overflow-hidden rounded-lg border-2 bg-white">
    <div v-if="editor" class="flex flex-wrap gap-1 bg-gray-100 p-2">
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ '!bg-secondary-100': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        bold
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ '!bg-secondary-100': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        italic
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ '!bg-secondary-100': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        strike
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :class="{ '!bg-secondary-100': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        paragraph
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :class="{
          '!bg-secondary-100': editor.isActive('heading', { level: 1 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :class="{
          '!bg-secondary-100': editor.isActive('heading', { level: 2 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :class="{
          '!bg-secondary-100': editor.isActive('heading', { level: 3 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :class="{ '!bg-secondary-100': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        bullet list
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :class="{ '!bg-secondary-100': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        ordered list
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        horizontal rule
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        undo
      </button>
      <button
        class="rounded-lg bg-gray-700 px-1 py-0.5 text-xs text-gray-200"
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        redo
      </button>
    </div>
    <div v-if="props.modelValue && editor" class="editor p-2">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
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
    editor.value?.commands.setContent(`<p>${value}</p>`);
    emit("update:modelValue", editor.value?.getHTML() || "");
  }
);

onMounted(() => {
  editor.value = new Editor({
    content: `<p>${props.modelValue}</p>`,
    extensions: [StarterKit],
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
.editor h1 {
  font-weight: bold;
  font-size: 2rem;
}

.editor ul {
  padding-left: 18px;
}

.editor ul li {
  list-style-type: disc;
}
</style>
