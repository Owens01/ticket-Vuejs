# TicketFlow – Smart Ticket Management System (Vue 3 + Pinia)

TicketFlow is a modern, lightweight ticket management system built with Vue 3 and Pinia.  
It allows users to create, edit, and track tasks or support tickets efficiently — all stored locally using the browser’s storage for a backend-free experience.

The project emphasizes a clean UI, reactivity, accessibility, and maintainable code organization using Vue single-file components (SFCs).

---

## Project Overview

TaskTide provides a simple ticket-tracking experience similar to helpdesk dashboards but runs entirely on the client side — no backend required.

### Core Features

- **Ticket Creation:** Add new tickets with title, description, status, and priority.
- **Update Tickets:** Edit existing tickets (e.g., change priority or status).
- **Delete Tickets:** Remove tickets instantly.
- **LocalStorage Sync:** Automatically persists all data to browser storage.
- **Component-Based:** Separated components for scalability and clarity.
  **State Management:** Centralized via Pinia store (`/src/stores/tickets.ts`).
