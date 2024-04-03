import NoteDetail from '@components/noteDetail/NoteDetail.vue'
import Login from "@components/login/Login.vue"
import Dashboard from "@components/dashboard/Dashboard.vue"
import Signup from "@components/signup/Signup.vue"
import Notes from "@components/notes/Notes.vue"
import { useNotesStore } from '@store/notes';
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@store/auth"


const routes = [
  { path: '/', alias: '/login', component: Login, },
  {
    path: '/list/notes', component: Notes, meta: { requiresAuth: true }, children: [
      { path: ':id', meta: { requiresAuth: true }, component: NoteDetail, },
    ]
  },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/dashboard/notes/:id', component: NoteDetail, meta: { requiresAuth: true } },
  { path: '/login', component: Login, },
  { path: '/signup', component: Signup, },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})




router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isUserLoggedIn) {
    next({ path: '/login' });
  } else if (to.path === '/' && authStore.isUserLoggedIn || to.path === '/' && authStore.isUserLoggedIn) {
    next({ path: '/list/notes' });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  // Trigger the selectNote action with the new route params
  if (to.params.id) {
    useNotesStore().selectNote(to.params.id as string);
  }
  next()
})

export default router