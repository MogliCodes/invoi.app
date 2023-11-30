<template>
  <div class="bg-white rounded-lg overflow-hidden border-2 rounded-lg">
    <div class="bg-gray-100 p-2 flex flex-wrap gap-1" v-if="editor">
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ '!bg-secondary-100': editor.isActive('bold') }"
      >
        bold
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ '!bg-secondary-100': editor.isActive('italic') }"
      >
        italic
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ '!bg-secondary-100': editor.isActive('strike') }"
      >
        strike
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ '!bg-secondary-100': editor.isActive('paragraph') }"
      >
        paragraph
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{
          '!bg-secondary-100': editor.isActive('heading', { level: 1 }),
        }"
      >
        h1
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{
          '!bg-secondary-100': editor.isActive('heading', { level: 2 }),
        }"
      >
        h2
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{
          '!bg-secondary-100': editor.isActive('heading', { level: 3 }),
        }"
      >
        h3
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ '!bg-secondary-100': editor.isActive('bulletList') }"
      >
        bullet list
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ '!bg-secondary-100': editor.isActive('orderedList') }"
      >
        ordered list
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        horizontal rule
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        undo
      </button>
      <button
        class="bg-gray-700 text-gray-200 rounded-lg px-1 py-0.5 text-xs"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        redo
      </button>
    </div>
    <div v-if="props.content && editor" class="editor p-2">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  content: string;
};
const props = defineProps<Props>();
const editor = ref(null);

onMounted(() => {
  editor.value = new Editor({
    content: `<p>${props.content}</p>`,
    extensions: [StarterKit],
  });
});

onBeforeUnmount(() => {
  editor.value.destroy();
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
