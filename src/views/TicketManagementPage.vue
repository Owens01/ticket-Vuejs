<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="text-2xl font-bold text-blue-600">TicketFlow</div>
          <div class="flex gap-4">
            <button
              @click="$router.push({ name: 'Dashboard' })"
              class="px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </button>
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
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800">Ticket Management</h1>
        <button
          @click="openCreate"
          class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          <span>➕</span> New Ticket
        </button>
      </div>

      <div v-if="showForm">
        <TicketForm
          :initial="editing"
          @submit="handleSubmit"
          @cancel="closeForm"
        />
      </div>

      <TicketView
        v-if="viewing"
        :ticket="viewing"
        @close="viewing = null"
        @edit="startEdit"
        @delete="handleDelete"
      />

      <TicketList
        :tickets="tickets"
        @view="startView"
        @edit="startEdit"
        @delete="handleDelete"
      />
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Footer from "../components/common/Footer.vue";
import TicketForm from "../components/tickets/TicketForm.vue";
import TicketList from "../components/tickets/TicketList.vue";
import TicketView from "../components/tickets/TicketView.vue";
import { useTicketsStore, type Ticket } from "../stores/tickets";
import { useToastStore } from "../stores/toast";
import { useAuthStore } from "../stores/auth";

const ticketsStore = useTicketsStore();
const tickets = ticketsStore.tickets;
const createTicket = ticketsStore.createTicket;
const updateTicket = ticketsStore.updateTicket;
const deleteTicket = ticketsStore.deleteTicket;

const toast = useToastStore();
const auth = useAuthStore();

const showForm = ref(false);
const editing = ref<Ticket | null>(null);
const viewing = ref<Ticket | null>(null);

function openCreate() {
  editing.value = null;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  editing.value = null;
}

function handleSubmit(payload: Omit<Ticket, "id">) {
  if (editing.value) {
    updateTicket(editing.value.id, payload as Partial<Ticket>);
    toast.showToast("Ticket updated successfully", "success");
    editing.value = null;
  } else {
    createTicket(payload);
    toast.showToast("Ticket created successfully", "success");
  }
  showForm.value = false;
}

function startEdit(t: Ticket) {
  editing.value = t;
  showForm.value = true;
  viewing.value = null;
}

function startView(t: Ticket) {
  viewing.value = t;
  showForm.value = false;
  editing.value = null;
}

function handleDelete(id: number) {
  if (!confirm("Are you sure you want to delete this ticket?")) return;
  deleteTicket(id);
  toast.showToast("Ticket deleted successfully", "success");
  if (viewing.value?.id === id) viewing.value = null;
}

function logout() {
  auth.logout();
  toast.showToast("Logged out", "success");
  // router navigation handled by other UI
}
</script>
