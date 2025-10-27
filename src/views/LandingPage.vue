<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar :onNavigate="handleNavigate" :showAuthButtons="true" />

    <section
      class="relative bg-gradient-to-br from-red-100 to-blue-800 text-white overflow-hidden"
    >
      <div class="max-w-7xl mx-auto px-6 py-36 text-center relative z-10">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          Manage Tickets Effortlessly
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-0">
          Streamline your support workflow with powerful ticket management
        </p>
        <div class="flex justify-center mt-12">
          
          <svg
            class="w-64 h-64 sm:w-80 sm:h-80 opacity-30 -mt-25"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#60a5fa" />
                <stop offset="100%" stop-color="#7c3aed" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="50%" y2="50%">
                <stop offset="0%" stop-color="#60a5fa" />
                <stop offset="100%" stop-color="#7c3aed" />
              </linearGradient>
              
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
            <circle cx="160" cy="120" r="40" fill="url(#grad2)" />
            <circle cx="50" cy="50" r="50" fill="url(#grad1)" />
          </svg>
        </div>
      </div>

      <svg
        class="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#f9fafb"
          fill-opacity="1"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L0,320Z"
        />
      </svg>
    </section>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow">
      <h2 class="text-3xl font-bold text-center mb-12">
        Why Choose TicketFlow?
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <div
            class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="text-blue-600 w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ f.title }}</h3>
          <p class="text-gray-600">{{ f.desc }}</p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/common/Navbar.vue";
import Footer from "../components/common/Footer.vue";
import { useRouter } from "vue-router";

// features list
const features = [
  {
    title: "Easy Management",
    desc: "Create, update, and track tickets with ease",
  },
  {
    title: "Real-time Updates",
    desc: "Instant notifications on ticket status changes",
  },
  {
    title: "Team Collaboration",
    desc: "Work together seamlessly on support tickets",
  },
];

const router = useRouter();

function handleNavigate(page: string) {
  if (page === "login") router.push({ name: "Login" });
  else if (page === "signup") router.push({ name: "Signup" });
  else router.push({ name: "Landing" });
}
</script>
