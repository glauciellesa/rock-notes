<script setup lang="ts">
import Header from '@components/header/Header.vue'
import ToolBar from '@components/toolBar/ToolBar.vue'

import { useAuthStore } from "@store/auth"
import { computed } from 'vue';

const authStore = useAuthStore();

const isLogged = computed(() => authStore.isUserLoggedIn);
</script>

<template>
  <div class="shadow-md">
    <Header />
    <ToolBar v-if="isLogged" />
  </div>
  <RouterView />
</template>
