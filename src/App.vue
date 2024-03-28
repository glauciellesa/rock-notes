<script setup lang="ts">
import ListNotes from '@components/listNotes/ListNotes.vue'
import SearchBar from '@components/searchBar/SearchBar.vue'
</script>

<template>

  <div class="flex gap-8 flex-col sm:flex-row w-full">
    <div class="w-full sm:w-1/5 sm:border-r-2 p-4">
      <ListNotes />
    </div>
    <main class="flex-1">
      <div class="flex justify-between pb-3 sm:pt-3">
        <SearchBar />
      </div>
      <RouterView />
    </main>
  </div>
</template>
