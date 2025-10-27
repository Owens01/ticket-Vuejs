import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ToastType = 'success' | 'error';
export interface ToastState { message: string; type: ToastType }

export const useToastStore = defineStore('toast', () => {
  const toast = ref<ToastState | null>(null);

  function showToast(message: string, type: ToastType) {
    toast.value = { message, type };
    setTimeout(() => (toast.value = null), 4000);
  }

  function close() {
    toast.value = null;
  }

  return { toast, showToast, close };
});
