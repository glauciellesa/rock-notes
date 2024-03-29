<script setup>
import EditorBtns from '@components/editorBtns/EditorBtns.vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'outline-none p-4 min-h-[16rem] ',
    }
  },
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit, Underline
  ],
})
</script>

<template>
  <EditorBtns :editor="editor" />
  <input :value="note.title" @input="event => store.editeTitle(event.target?.value ?? '')" />
  <editor-content :editor="editor" />
</template>
