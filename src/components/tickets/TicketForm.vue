<template>
  <div class="bg-white p-6 rounded-2xl shadow-lg mb-8">
    <h2 class="text-2xl font-bold mb-4">{{ initial?.id ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
        <input v-model="form.title" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea v-model="form.description" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
      </div>

      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
          <select v-model="form.status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select v-model="form.priority" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div class="flex gap-4">
        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{{ initial?.id ? 'Update' : 'Create' }}</button>
        <button type="button" @click="cancel" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import type { Ticket } from './../../stores/tickets';

interface Props {
  initial?: Partial<Ticket> | null;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'submit', payload: Omit<Ticket, 'id'>): void;
  (e: 'cancel'): void;
}>();

const initial = props.initial ?? null;

const form = ref<Omit<Ticket, 'id'>>({
  title: initial?.title ?? '',
  description: initial?.description ?? '',
  status: (initial?.status as Ticket['status']) ?? 'open',
  priority: (initial?.priority as Ticket['priority']) ?? 'medium',
});

watch(() => props.initial, (v) => {
  if (v) {
    form.value = {
      title: v.title ?? '',
      description: v.description ?? '',
      status: (v.status as Ticket['status']) ?? 'open',
      priority: (v.priority as Ticket['priority']) ?? 'medium',
    };
  }
});

const errors = ref<Record<string, string>>({});

function validate() {
  const e: Record<string, string> = {};
  if (!form.value.title.trim()) e.title = 'Title is required';
  if (form.value.title.length > 100) e.title = 'Title must be less than 100 characters';
  if (!['open', 'in_progress', 'closed'].includes(form.value.status)) e.status = 'Invalid status';
  return e;
}

function onSubmit() {
  errors.value = validate();
  if (Object.keys(errors.value).length) return;
  emit('submit', { ...form.value });
  form.value = { title: '', description: '', status: 'open', priority: 'medium' };
}

function cancel() {
  emit('cancel');
}
</script>
