<script setup lang="ts">
import { useNotesStore } from '@store/notes';
import { computed, nextTick, onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateTime } from '@helpers/formatDate'
import { debounce } from '@helpers/debounce'

const route = useRoute();
const store = useNotesStore();

// Compute the selected note based on the store's selectedNoteId
const note = computed(() => store.getSelectedNote);

const editTitle = (event: Event) => {
  debounce(() => store.editTitle(event.target?.value ?? ''))
}
const editBody = (event: Event) => {
  debounce(() => store.editBody(event.target?.value ?? ''))
}
const refBody = ref(null)

const resize = () => {
  if (refBody.value) {
    const lineHeight = 25
    const newHeight = (refBody.value.value?.split("\n").length || 0) * lineHeight
    refBody.value.style.height = newHeight + 'px';
  }
}

onMounted(() => {
  const noteId = route.params.id as string;
  if (noteId) {
    store.selectNote(noteId);
  }
});

onUpdated(() => {
  resize()
})

nextTick(() => {
  resize()
})
</script>

<template>
  <div v-if="note" :key="route.path" class="px-6">
    <div class="flex justify-center py-4 text-slate-600">{{ formatDateTime(note.createdAt) }}</div>
    <div class="flex flex-col h-full">
      <input class="text-[32px] font-bold bg-transparent outline-none" :value="note.title" @input="editTitle"
        placeholder="Your title" />
      <textarea ref="refBody" class="bg-transparent outline-none resize-none" :value="note.body" @input="editBody"
        @focus="resize" @keyup="resize" placeholder="Here go your content"></textarea>
    </div>
  </div>
  <div v-else class="p-6">There are no notes selected</div>
</template>
