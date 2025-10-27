<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-600 mb-2">TicketFlow</h1>
        <h2 class="text-2xl font-semibold text-gray-800">Welcome Back</h2>
        <p class="text-gray-600">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white p-8 rounded-2xl shadow-lg">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input v-model="email" type="email" placeholder="your@email.com"
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input v-model="password" type="password" placeholder="••••••••"
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Sign In</button>

        <p class="text-center mt-4 text-gray-600">
          Don't have an account?
          <router-link to="/signup" class="text-blue-600 hover:underline">Sign up</router-link>
        </p>
      </form>

      <router-link to="/" class="mt-4 w-full text-center text-gray-600 hover:text-gray-800 block">← Back to home</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useToastStore } from '../stores/toast';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errors = ref<Record<string, string>>({});

const auth = useAuthStore();
const toast = useToastStore();
const router = useRouter();

function validate() {
  const e: Record<string, string> = {};
  if (!email.value) e.email = 'Email is required';
  if (email.value && !email.value.includes('@')) e.email = 'Invalid email format';
  if (!password.value) e.password = 'Password is required';
  if (password.value && password.value.length < 6) e.password = 'Password must be at least 6 characters';
  return e;
}

function handleSubmit() {
  errors.value = validate();
  if (Object.keys(errors.value).length) return;
  const result = auth.login(email.value, password.value);
  if (result.success) {
    toast.showToast('Login successful!', 'success');
    router.push({ name: 'Dashboard' });
  } else {
    toast.showToast(result.error ?? 'Login failed', 'error');
  }
}
</script>
