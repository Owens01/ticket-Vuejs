<template>
  <div>
    <div v-if="!tickets.length" class="bg-white p-6 rounded-2xl shadow-lg">No tickets yet.</div>
    <div v-else class="space-y-4">
      <div v-for="t in tickets" :key="t.id" class="bg-white p-4 rounded-2xl shadow flex justify-between items-center">
        <div>
          <div class="font-semibold text-gray-800">{{ t.title }}</div>
          <div class="text-sm text-gray-500">{{ t.description ? (t.description.slice(0, 80) + (t.description.length > 80 ? '...' : '')) : 'No description' }}</div>
        </div>
        <div class="flex items-center gap-2">
          <button @click="$emit('view', t)" class="p-2 hover:bg-gray-100 rounded-md" title="View">🔍</button>
          <button @click="$emit('edit', t)" class="p-2 hover:bg-gray-100 rounded-md" title="Edit">✏️</button>
          <button @click="$emit('delete', t.id)" class="p-2 hover:bg-gray-100 rounded-md text-red-600" title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from './../../stores/tickets';
const props = defineProps<{ tickets: Ticket[] }>();
const emit = defineEmits<{
  (e: 'view', t: Ticket): void;
  (e: 'edit', t: Ticket): void;
  (e: 'delete', id: number): void;
}>();
const tickets = props.tickets;
</script>
