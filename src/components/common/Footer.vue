<template>
  <footer class="bg-gray-100 py-6 text-center text-gray-600 border-t">
    <p>© {{ year }} TicketFlow. All rights reserved.</p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
