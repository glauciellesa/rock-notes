import NoteDetail from '@components/noteDetail/NoteDetail.vue'
import Login from "@components/login/Login.vue"
import Signup from "@components/signup/Signup.vue"
import { useNotesStore } from '@store/notes';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/notes/:id', component: NoteDetail, },
  { path: '/login', component: Login, },
  { path: '/signup', component: Signup, },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // Trigger the selectNote action with the new route params
  useNotesStore().selectNote(to.params.id as string);
  next();
});

export default router