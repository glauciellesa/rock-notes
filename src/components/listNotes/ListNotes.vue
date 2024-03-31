<script setup>
import { useNotesStore } from '@store/notes';
import { computed, onMounted, ref } from 'vue';
import { formatDate } from '@helpers/formatDate';
import { ListBulletIcon, Squares2X2Icon, TrashIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useNotesStore();
const notes = computed(() => store.getNotes);
const selectedNoteId = ref(null);

onMounted(() => store.fetchNotes());

const selectNote = (id) => {
  selectedNoteId.value = id;
};
</script>

<template>
  <nav v-for="note in notes" :key="note.id" class="border-b p-2"
    :class="{ 'rounded-md bg-gray-300': note.id === selectedNoteId }">
    <RouterLink :to="`/notes/${note.id}`" @click="selectNote(note.id)">
      <p class="font-bold">{{ note.title }}</p>
      <span>{{ formatDate(note.createdAt) }}</span>
    </RouterLink>
  </nav>
</template>