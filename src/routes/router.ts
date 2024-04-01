import NoteDetail from '@components/noteDetail/NoteDetail.vue'
import Login from "@components/login/Login.vue"
import Signup from "@components/signup/Signup.vue"
import Notes from "@components/notes/Notes.vue"
import { useNotesStore } from '@store/notes';
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@store/auth"


const routes = [
  { path: '/', alias: '/login', component: Login, },
  {
    path: '/notes', component: Notes, meta: { requiresAuth: true }, children: [
      { path: '/notes/:id', meta: { requiresAuth: true }, component: NoteDetail, },
    ]
  },
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
    next({
      path: '/login'
    })
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