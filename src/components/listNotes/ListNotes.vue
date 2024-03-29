<script setup>
import { useNotesStore } from '@store/notes';
import { computed, onMounted } from 'vue';
import { formatDate } from '@helpers/formatDate';
import { ListBulletIcon, Squares2X2Icon, TrashIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useNotesStore();
const notes = computed(() => store.getNotes);

onMounted(() => store.fetchNotes());
</script>

<template>
  <nav v-for="note in notes" :key="note.id" class="border-b-2 py-2">
    <RouterLink :to="`/notes/${note.id}`">
      <p class="font-bold">{{ note.title }}</p>
      <span>{{ formatDate(note.createdAt) }}</span>
    </RouterLink>
  </nav>
</template>