import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const AUTH_KEY = 'ticketapp_session';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref<boolean>(!!localStorage.getItem(AUTH_KEY));
  const userEmail = ref<string | null>(null);

  function login(email: string, password: string) {
    // simulated validations (same rules as React version)
    if (!email || password.length < 6) {
      return { success: false, error: 'Invalid credentials' };
    }
    const token = btoa(`${email}:${Date.now()}`);
    localStorage.setItem(AUTH_KEY, token);
    isAuthenticated.value = true;
    userEmail.value = email;
    return { success: true, token };
  }

  function signup(email: string, password: string, confirmPassword: string) {
    if (!email || !password) return { success: false, error: 'All fields are required' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters' };
    if (password !== confirmPassword) return { success: false, error: 'Passwords do not match' };
    const token = btoa(`${email}:${Date.now()}`);
    localStorage.setItem(AUTH_KEY, token);
    isAuthenticated.value = true;
    userEmail.value = email;
    return { success: true, token };
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    isAuthenticated.value = false;
    userEmail.value = null;
  }

  return { isAuthenticated, userEmail, login, signup, logout };
});
