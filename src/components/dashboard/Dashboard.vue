<script setup lang="ts">
import { useNotesStore } from '@store/notes';
import { computed, onMounted, ref } from 'vue';
import { formatDate } from '@helpers/formatDate';

const store = useNotesStore();
const notes = computed(() => store.getNotes);
const selectedNoteId = ref();

onMounted(() => store.fetchNotes());

const selectNote = (id: string) => {
  selectedNoteId.value = id;
};
</script>

<template>
  <div class="p-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 row-auto">
    <nav v-for="note in notes" :key="note.id">
      <RouterLink :to="`/dashboard/notes/${note.id}`" @dblclick="selectNote(note.id)">
        <div class="border-2 rounded-md p-2 h-52 "
          :class="{ 'border-0 outline outline-blue-700': note.id === selectedNoteId }">
          <h1 class="font-bold pb-4 break-all">{{ note.title }}</h1>
          <p class="line-clamp-3">{{ note.body }}</p>
        </div>
      </RouterLink>
      <div class="flex flex-col items-center">
        <span class="font-bold line-clamp-1 text-center w-44">{{ note.title }}</span>
        <span>{{ formatDate(note.createdAt) }}</span>
      </div>
    </nav>
  </div>
</template>