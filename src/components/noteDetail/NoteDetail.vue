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
  const noteId = +route.params.id;
  if (!isNaN(noteId)) {
    store.selectNote(noteId);
  }
});
</script>

<template>
  <div class="flex justify-center py-4 text-slate-600">{{ formatDateTime(note.createdAt) }}</div>
  <div>
    <h1>{{ note?.title }}</h1>
    <p>{{ note?.body }}</p>
  </div>
</template>
