<script setup>
defineProps({
  editor: String
})
</script>
<template>
  <section v-if="editor" class="buttons flex justify-center items-center flex-wrap gap-x-4 border border-gray-400 p-4">
    <button @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'bg-gray-200 rounded': editor.isActive('bold') }" class="p-1">
      bold
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'bg-gray-200 rounded': editor.isActive('italic') }" class="p-1">
      italic
    </button>
    <button @click="editor.chain().focus().toggleUnderline().run()"
      :disabled="!editor.can().chain().focus().toggleUnderline().run()"
      :class="{ 'bg-gray-200 rounded': editor.isActive('underline') }" class="p-1">
      underline
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'bg-gray-200 rounded': editor.isActive('heading', { level: 1 }) }" class="p-1">
      h1
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'bg-gray-200 rounded': editor.isActive('heading', { level: 2 }) }" class="p-1">
      h2
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'bg-gray-200 rounded': editor.isActive('bulletList') }" class="p-1">
      list
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'bg-gray-200 rounded': editor.isActive('orderedList') }" class="p-1">
      ordered list
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'bg-gray-200 rounded': editor.isActive('blockquote') }" class="p-1">
      blockquote
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      HR
    </button>
    <button class="p-1 disabled:text-gray-400" @click="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()">
      undo
    </button>
    <button class="p-1 disabled:text-gray-400" @click="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()">
      redo
    </button>
  </section>
</template>



<style>
.tiptap h1 {
  font-size: 32px;
  font-weight: bold;
}
</style>