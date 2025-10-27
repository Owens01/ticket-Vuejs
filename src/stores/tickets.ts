import { defineStore } from "pinia";
import { ref } from "vue";

export type TicketStatus = "open" | "in_progress" | "closed";
export type TicketPriority = "low" | "medium" | "high";

export interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
}

const STORAGE_KEY = "tickets";

export const useTicketsStore = defineStore("tickets", () => {
  // ✅ initialize directly with array, not function
  const saved = localStorage.getItem(STORAGE_KEY);
  const tickets = ref<Ticket[]>(saved ? (JSON.parse(saved) as Ticket[]) : []);

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets.value));
  }

  function createTicket(payload: Omit<Ticket, "id">) {
    const newTicket: Ticket = { ...payload, id: Date.now() };
    tickets.value.push(newTicket);
    persist();
    return newTicket;
  }

  function updateTicket(id: number, payload: Partial<Ticket>) {
    tickets.value = tickets.value.map((t) =>
      t.id === id ? { ...t, ...payload } : t
    );
    persist();
  }

  function deleteTicket(id: number) {
    tickets.value = tickets.value.filter((t) => t.id !== id);
    persist();
  }

  return { tickets, createTicket, updateTicket, deleteTicket };
});
