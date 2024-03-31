<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';
import { computed, ref } from "vue";
import { useAuthStore } from "@store/auth.ts"
import { Form, Field, useForm, ErrorMessage } from 'vee-validate';
import { LoginForm } from "@models/auth.ts"

const route = useRoute();
const hidePassword = ref(true);
const passwordFieldIcon = computed(() => hidePassword.value ? EyeSlashIcon : EyeIcon);
const passwordFieldType = computed(() => hidePassword.value ? "password" : "text");

const { errors, setErrors, setFieldValue } = useForm<LoginForm>();

const validateUsername = () => {
  console.log('====================================');
  console.log('error');
  console.log('====================================');
  return "error"
}
const validateEmail = setErrors({
  email: 'This field is invalid', // auto-complete for `email` and `password`
});

const onSubmit = async (values) => {
  const authStore = useAuthStore();
  const { username, password } = values;

  try {
    console.log(username, password);

    await authStore.login(username, password);
    // Redirect logic if login is successful
  } catch (error) {
    console.log({ error });
    setErrors({ apiError: error.message });
  }
}
</script>

<template v-slot="{ errors, handleSubmit }">
  <div class="p-8 flex flex-col justify-center gap-4 items-center">
    <h1 class="font-bold text-2xl pb-6">Sign in to your account</h1>
    <Form @submit.prevent="handleSubmit(onSubmit)" :validation-schema="schema"
      class="flex flex-col items-center w-full sm:w-2/6">
      <Field type="text" name="username" placeholder="Username" :rules="validateUsername"
        class="text-[18px] bg-transparent border-2 rounded p-2 w-full" />
      <ErrorMessage name="username" />
      <div
        class="flex justify-between border-b-2 border-r-2 border-l-2 rounded p-2 hover:outline hover:outline-gray-400 w-full">
        <Field :type="passwordFieldType" name="password" placeholder="Enter Password"
          class="text-[18px] outline-none bg-transparent w-full" />
        <span @click="hidePassword = !hidePassword" class="h-6 w-6 text-gray-400 cursor-pointer">
          <component :is="passwordFieldIcon" />
        </span>
      </div>
      <span class="text-red-700">{{ errors?.password }}</span>
      <div class="flex flex-col gap-4 w-full sm:w-3/4 pt-6">
        <button type="submit" class="text-[18px] rounded bg-gray-600 text-gray-50 p-2">Login</button>
      </div>
      <div v-if="errors?.apiError" class="alert alert-danger mt-3 mb-0">{{ errors?.apiError }}</div>
    </Form>
    <p class="pt-6 text-[18px] text-gray-600">Don't have an account?
      <RouterLink :to="'/signup'">
        <span class="font-bold underline">Create one now</span>
      </RouterLink>
    </p>
  </div>
</template>
