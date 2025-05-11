import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useUserStore } from "../store";
import HomeView from "../views/HomeView.vue";
import SyncView from "../views/SyncView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/sync/:id",
    name: "Sync",
    component: SyncView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    userStore.returnUrl = to.fullPath;
    return "/";
  }
});

export default router;
