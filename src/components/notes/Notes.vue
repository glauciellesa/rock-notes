<script setup lang="ts">
import ListNotes from '@components/listNotes/ListNotes.vue'
import CardNotes from '@components/cardNotes/CardNotes.vue'
import { useNotesStore } from '@store/notes';
import { computed } from 'vue';

const store = useNotesStore();

const isDisplayList = computed(() => store.getSelectedDisplayMode == 'list');


</script>

<template>
  <div class=" px-6 flex gap-4 flex-col sm:flex-row w-full" v-if="isDisplayList">
    <div class="w-full md:w-1/3 sm:border-r-2 p-4">
      <ListNotes />
    </div>
    <main class="flex-1 p-4">
      <RouterView />
    </main>
  </div>
  <div v-else>
    <CardNotes />
  </div>
</template>
