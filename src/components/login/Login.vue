<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from "vue";
import { useAuthStore } from "@store/auth"
import { Form, Field, useForm, ErrorMessage } from 'vee-validate';
import { LoginForm } from "@models/auth.ts"
import router from '@routes/router';

const hidePassword = ref(true);

const passwordFieldIcon = computed(() => hidePassword.value ? EyeSlashIcon : EyeIcon);
const passwordFieldType = computed(() => hidePassword.value ? "password" : "text");

const { errors } = useForm<LoginForm>();


const validateUsername = (value: string) => {
  if (!value) {
    return 'This field is required';
  }
  return true;
}

const validatePassword = (value: string) => {
  if (!value) {
    return 'This field is required';
  }
  return true;
};

const onSubmit = async (values: LoginForm) => {
  const authStore = useAuthStore();
  const { username, password } = values;

  const isLogged = await authStore.login(username, password);
  if (isLogged) {
    router.push('/')
  }
};

</script>

<template>
  <div class="p-8 flex flex-col justify-center gap-4 items-center">
    <h1 class="font-bold text-2xl pb-6">Sign in to your account</h1>
    <Form @submit="onSubmit" class="flex flex-col items-center w-full sm:w-2/6">
      <Field type="text" name="username" placeholder="Username" :rules="validateUsername"
        class="text-[18px] bg-transparent border border-b-2  rounded p-2 w-full" />
      <ErrorMessage class="text-red-700 w-full pb-4" name="username" />
      <div class="flex justify-between border-b-2 border rounded p-2 hover:outline hover:outline-gray-400 w-full">
        <Field :type="passwordFieldType" name="password" placeholder="Enter Password" :rules="validatePassword"
          class="text-[18px] outline-none bg-transparent w-full" />
        <span @click="hidePassword = !hidePassword" class="h-6 w-6 text-gray-400 cursor-pointer">
          <component :is="passwordFieldIcon" />
        </span>
      </div>
      <ErrorMessage class="text-red-700 w-full pb-4" name="password" />
      <span class="text-red-700">{{ errors?.password }}</span>
      <div class="flex flex-col gap-4 w-full sm:w-3/4 pt-6">
        <button type="submit" class="text-[18px] rounded bg-gray-600 text-gray-50 p-2">Login</button>
      </div>
    </Form>
    <p class="pt-6 text-[18px] text-gray-600">Don't have an account?
      <RouterLink :to="'/signup'">
        <span class="font-bold underline">Create one now</span>
      </RouterLink>
    </p>
  </div>
</template>
