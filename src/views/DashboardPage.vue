<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="text-2xl font-bold text-blue-600">TicketFlow</div>
          <div class="flex items-center gap-4">
            <button
              @click="logout"
              class="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-2xl shadow-lg">
          <div class="text-gray-600 mb-2">Total Tickets</div>
          <div class="text-4xl font-bold text-gray-800">{{ stats.total }}</div>
        </div>
        <div
          class="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500"
        >
          <div class="text-gray-600 mb-2">Open</div>
          <div class="text-4xl font-bold text-green-600">{{ stats.open }}</div>
        </div>
        <div
          class="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-amber-500"
        >
          <div class="text-gray-600 mb-2">In Progress</div>
          <div class="text-4xl font-bold text-amber-600">
            {{ stats.inProgress }}
          </div>
        </div>
        <div
          class="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-gray-500"
        >
          <div class="text-gray-600 mb-2">Closed</div>
          <div class="text-4xl font-bold text-gray-600">{{ stats.closed }}</div>
        </div>
      </div>

      <button
        @click="$router.push({ name: 'Tickets' })"
        class="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-lg"
      >
        Manage Tickets
      </button>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Footer from "../components/common/Footer.vue";
import { useTicketsStore } from "../stores/tickets";
import { useAuthStore } from "../stores/auth";
import { useToastStore } from "../stores/toast";

const ticketsStore = useTicketsStore();
const stats = computed(() => ({
  total: ticketsStore.tickets.length,
  open: ticketsStore.tickets.filter((t) => t.status === "open").length,
  inProgress: ticketsStore.tickets.filter((t) => t.status === "in_progress")
    .length,
  closed: ticketsStore.tickets.filter((t) => t.status === "closed").length,
}));

const auth = useAuthStore();
const toast = useToastStore();

function logout() {
  auth.logout();
  toast.showToast("Logged out", "success");
  // navigate handled by router guard in Navbar or caller
}
</script>
