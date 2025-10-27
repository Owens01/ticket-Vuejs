<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Brand -->
        <div class="text-2xl font-bold text-blue-600">TicketFlow</div>

        <!-- Desktop Buttons -->
        <div v-if="showAuthButtons" class="hidden md:flex gap-4">
          <button
            @click="() => onNavigate('login')"
            class="px-4 py-2 text-gray-700 hover:text-blue-600"
          >
            Login
          </button>
          <button
            @click="() => onNavigate('signup')"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
        <div v-else class="hidden md:flex" />

        <!-- Mobile Menu Toggle -->
        <button @click="toggleMobile" class="md:hidden">
          <Menu :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileOpen" class="md:hidden bg-white border-t">
      <div class="px-4 py-4 space-y-3">
        <button
          @click="() => onNavigate('login')"
          class="block w-full text-left px-4 py-2 text-gray-700"
        >
          Login
        </button>
        <button
          @click="() => onNavigate('signup')"
          class="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Menu } from "lucide-vue-next"; // same as lucide-react but for Vue

// Props
defineProps<{
  onNavigate: (page: string) => void;
  showAuthButtons?: boolean;
}>();

// State
const mobileOpen = ref(false);

// Methods
function toggleMobile() {
  mobileOpen.value = !mobileOpen.value;
}
</script>
