<template>
  <div v-if="ticket" class="bg-white p-6 rounded-2xl shadow-lg mb-8">
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-2xl font-bold">{{ ticket.title }}</h2>
      <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✖️</button>
    </div>

    <div class="mb-4">
      <span :class="statusClass(ticket.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
        {{ ticket.status.replace('_', ' ').toUpperCase() }}
      </span>
      <span class="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">{{ ticket.priority.toUpperCase() }}</span>
    </div>

    <p class="text-gray-700 mb-4">{{ ticket.description || 'No description provided' }}</p>

    <div class="flex gap-2">
      <button @click="$emit('edit', ticket)" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Edit</button>
      <button @click="$emit('delete', ticket.id)" class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from './../../stores/tickets';
const props = defineProps<{ ticket: Ticket | null }>();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'edit', t: Ticket): void;
  (e: 'delete', id: number): void;
}>();

function statusClass(status: Ticket['status']) {
  switch (status) {
    case 'open': return 'bg-green-100 text-green-800';
    case 'in_progress': return 'bg-amber-100 text-amber-800';
    case 'closed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
</script>
