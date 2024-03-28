<script setup lang="ts">
import Header from '@components/header/Header.vue';
import ListNotes from '@components/listNotes/ListNotes.vue'

</script>

<template>
  <Header />
  <div class="flex gap-8 flex-col sm:flex-row">
    <div class="border-r-2 p-4">
      <ListNotes />
    </div>
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>
