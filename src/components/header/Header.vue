<script setup>
import { UserIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from "@store/auth"
import { computed } from 'vue';
import router from '@routes/router';

const authStore = useAuthStore();
const user = computed(() => authStore.getUser);
const isLogged = computed(() => authStore.isUserLoggedIn);

const onClick = async () => {
  await authStore.logout();
  router.push('/login')
}

</script>

<template>
  <div class="p-4 flex justify-between items-center">
    <RouterLink :to="'/list/notes'">
      <div class="font-bold from-neutral-800 text-2xl">Rock.Notes</div>
    </RouterLink>
    <div v-if="isLogged">
      <button @click="onClick"
        class="focus:bg-gray-100 focus:rounded focus:shadow-md hover:bg-gray-200 hover:rounded hover:shadow-md p-1 flex gap-1">
        <UserIcon class="w-6" />
        <span>{{ isLogged ? "Logout" : "Login" }}</span>
      </button>
    </div>

  </div>
</template>
