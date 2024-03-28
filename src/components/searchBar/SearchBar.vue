<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

</script>

<template>
  <div class="flex gap-4 border-2 w-fit rounded p-1">
    <span>
      <MagnifyingGlassIcon class="h-6 w-6 text-gray-400" />
    </span>
    <input type="text" placeholder="Search" class="outline-none">
  </div>
</template>
