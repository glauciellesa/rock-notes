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
  <div class="pb-8 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <ListBulletIcon class="h-6 w-6" />
      <Squares2X2Icon class="h-6 w-6" />
    </div>

    <RouterLink :to="`/notes/edit/${route.params.id}`" class="btn btn-sm btn-primary mr-1">Edit</RouterLink>
    <button @click="store.deleteNote" class="btn btn-sm btn-danger btn-delete-user">
      <span>
        <TrashIcon class="h-6 w-6" />
      </span>
    </button>
  </div>

  <nav v-for="note in notes" :key="note.id" class="border-b-2 py-2">
    <RouterLink :to="`/notes/${note.id}`">
      <p class="font-bold">{{ note.title }}</p>
      <span>{{ formatDate(note.createdAt) }}</span>
    </RouterLink>
  </nav>
</template>