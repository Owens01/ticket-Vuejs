<template>
  <div v-if="toast" class="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white animate-slide-in"
       :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'">
    <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    <span class="min-w-[180px]">{{ toast.message }}</span>
    <button @click="close" class="ml-2 hover:opacity-80">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from './../../stores/toast';
const store = useToastStore();
const toast = store.toast;
const close = () => store.close();
</script>
