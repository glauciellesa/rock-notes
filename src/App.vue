<script setup lang="ts">

import ListNotes from '@components/listNotes/ListNotes.vue'

</script>

<template>

  <div class="flex gap-8 flex-col sm:flex-row w-full">
    <div class="w-1/5 border-r-2 p-4">
      <ListNotes />
    </div>
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>
