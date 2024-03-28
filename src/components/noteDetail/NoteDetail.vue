<script setup lang="ts">
import { useNotesStore } from '@store/notes';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateTime } from '@helpers/formatDate'

const route = useRoute();
const store = useNotesStore();

// Compute the selected note based on the store's selectedNoteId
const note = computed(() => store.getSelectedNote);

onMounted(() => {
  const noteId = route.params.id as string;
  if (noteId) {
    store.selectNote(noteId);
  }
});
</script>

<template>
  <div v-if="note">
    <div class="flex justify-center py-4 text-slate-600">{{ formatDateTime(note.createdAt) }}</div>
    <div class="flex flex-col">
      <input class="text-[32px] font-bold bg-transparent outline-none" :value="note.title"
        @input="event => store.editeTitle(event.target?.value ?? '')" />
      <textarea class="bg-transparent outline-none" :value="note.body"
        @input="event => store.editeBody(event.target?.value ?? '')"></textarea>
    </div>
  </div>
  <div v-else>There are no notes selected</div>
</template>
