import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import TicketManagementPage from "../views/TicketManagementPage.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/", name: "Landing", component: LandingPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/signup", name: "Signup", component: SignupPage },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: TicketManagementPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: "Login" });
  } else if (
    auth.isAuthenticated &&
    (to.name === "Login" || to.name === "Signup")
  ) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
