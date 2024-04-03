<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from "vue";
import { useAuthStore } from "@store/auth.ts"
import { Form, Field, useForm, ErrorMessage } from 'vee-validate';
import { LoginForm } from "@models/auth.ts"
import router from '@routes/router';

const hidePassword = ref(true);
const passwordFieldIcon = computed(() => hidePassword.value ? EyeSlashIcon : EyeIcon);
const passwordFieldType = computed(() => hidePassword.value ? "password" : "text");

const { errors } = useForm<LoginForm>();

const validateUsername = (value: string) => {
  const regularExpression = /^[a-zA-Z]{3,}$/;
  if (!regularExpression.test(value)) {
    return 'Your username must contain at least 3 letters and consist only of alphabetic characters (A-Z, a-z).';
  }
  return true
}

const validatePassword = (value: string) => {
  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!regularExpression.test(value)) {
    return "Create a password that's 6 to 16 characters long and contains at least one digit and one special character from the set !@#$%^&*.";
  }
  return true;
};

const onSubmit = async (values: LoginForm) => {
  const authStore = useAuthStore();
  const { username, password } = values;

  try {
    await authStore.signup(username, password);
    router.push('/notes')

  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="p-8 flex flex-col justify-center gap-4 items-center">
    <h1 class="font-bold text-2xl pb-6">Sign in to your account</h1>
    <Form @submit="onSubmit" class="flex flex-col gap-2 items-center w-full sm:w-2/6">
      <Field type="text" name="username" placeholder="Username" :rules="validateUsername"
        class="text-[18px] bg-transparent border border-b-2  rounded p-2 w-full" />
      <ErrorMessage class="text-red-700 w-full pb-4" name="username" />
      <div
        class="flex justify-between border-b-2 border rounded p-2 hover:outline hover:outline-2 hover:outline-blue-700 w-full">
        <Field :type="passwordFieldType" name="password" placeholder="Enter Password" :rules="validatePassword"
          class="text-[18px] outline-none bg-transparent w-full" />
        <span @click="hidePassword = !hidePassword" class="h-6 w-6 text-gray-400 cursor-pointer">
          <component :is="passwordFieldIcon" />
        </span>
      </div>
      <ErrorMessage class="text-red-700 w-full pb-4" name="password" />
      <span class="text-red-700">{{ errors?.password }}</span>
      <div class="flex flex-col gap-4 w-full sm:w-3/4 pt-6">
        <button type="submit" class="text-[18px] rounded bg-gray-600 text-gray-50 p-2">Sign up</button>
      </div>
    </Form>
    <p class="pt-4 text-[18px] text-gray-600">Already have an account?
      <RouterLink :to="'/login/'">
        <span class="font-bold underline">Login</span>
      </RouterLink>
    </p>
  </div>
</template>