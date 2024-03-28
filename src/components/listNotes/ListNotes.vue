<script setup>
import { useNotesStore } from '@store/notes';
import { computed, onMounted } from 'vue';
import { formatDate } from '@helpers/formatDate'
const store = useNotesStore()
const notes = computed(() => store.getNotes);

onMounted(() => store.fetchNotes());

</script>

<template>
  <nav v-for="note in notes" :key="note.id">
    <RouterLink :to="`/notes/${note.id}`">
      <p class="font-bold">{{ note.title }}</p>
      <span class="">{{ formatDate(note.createdAt) }}</span>
    </RouterLink>
    <div class="border-b-2 py-2" />
  </nav>
</template>
