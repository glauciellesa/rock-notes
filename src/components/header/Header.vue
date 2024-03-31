<script setup>
import { UserIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router';

const router = useRouter()

</script>

<template>
  <div class="p-4 flex justify-between items-center shadow-md">
    <RouterLink :to="'/notes'">
      <div class="font-bold from-neutral-800 text-2xl">Rock.Notes</div>
    </RouterLink>
    <RouterLink :to="'/login'">
      <button
        class="focus:bg-gray-100 focus:rounded focus:shadow-md hover:bg-gray-200 hover:rounded hover:shadow-md p-1 flex gap-1">
        <UserIcon class="w-6" />
        <span>Logout</span>
      </button>
    </RouterLink>
  </div>
</template>
