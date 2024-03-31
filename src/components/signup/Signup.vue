<script setup>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { RouterLink, useRoute } from 'vue-router';
import { computed, ref } from "vue";

const route = useRoute();

const hidePassword = ref(true);
const passwordFieldIcon = computed(() => hidePassword.value ? EyeSlashIcon : EyeIcon);
const passwordFieldType = computed(() => hidePassword.value ? "password" : "text");

const name = ref("");
const email = ref("");
const password = ref("");

const onSubmit = () => {
  console.log('Submit clicked');
}
</script>

<template>
  <div class="p-8 flex flex-col justify-center gap-4 items-center">
    <h1 class="font-bold text-2xl">Create your account</h1>
    <form @submit.prevent="onSubmit" class="flex flex-col items-center w-full sm:w-2/6">
      <input type="text" v-model="name" placeholder="Name"
        class="text-[18px] bg-transparent border-2 rounded p-2 w-full">
      <input type="text" v-model="email" placeholder="Email address"
        class="text-[18px] bg-transparent border-b-2 border-r-2 border-l-2  rounded p-2 w-full">
      <div
        class="flex justify-between border-b-2 border-r-2 border-l-2 rounded p-2 hover:outline hover:outline-gray-400 w-full">
        <input v-model="password" :type="passwordFieldType" placeholder="Enter Password"
          class="text-[18px] outline-none bg-transparent w-full">
        <span @click="hidePassword = !hidePassword" class="h-6 w-6 text-gray-400 cursor-pointer">
          <component :is="passwordFieldIcon" />
        </span>
      </div>
      <div class="flex flex-col gap-4 w-full sm:w-3/4 pt-6">
        <button type="submit" class="text-[18px] rounded bg-gray-600 text-gray-50 p-2">Sign up</button>
        <!-- <button class="text-[18px] rounded border border-gray-600 text-gray-600 p-2">Sign up with Google</button> -->
      </div>
    </form>
    <p class="pt-4 text-[18px] text-gray-600">Already have an account?
      <RouterLink :to="'/login/'">
        <span class="font-bold underline">Login</span>
      </RouterLink>
    </p>
  </div>
</template>
