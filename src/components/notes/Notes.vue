<script setup lang="ts">
import { useNotesStore } from '@store/notes';
import { computed, onMounted } from 'vue';
const store = useNotesStore()
const notes = computed(() => store.notes);

onMounted(() => store.fetchNotes());

</script>

<template>
  <div>
    {{notes}}
  </div>
</template>
