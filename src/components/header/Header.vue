<script setup>
import { UserIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router';

const router = useRouter()

const goToLogin = () => {
  router.push('/login/')
}
</script>

<template>
  <div class="p-4 flex justify-between items-center shadow-md">
    <div class="font-bold from-neutral-800 text-2xl" @click="router.push('/')">Rock.Notes</div>
    <button @click="goToLogin"
      class="focus:bg-gray-100 focus:rounded focus:shadow-md hover:bg-gray-200 hover:rounded hover:shadow-md p-1">
      <UserIcon class="w-6" />
    </button>
  </div>
</template>
