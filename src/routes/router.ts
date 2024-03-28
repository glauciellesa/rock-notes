import NoteDetail from '@components/noteDetail/NoteDetail.vue'
import NewNote from '@components/newNote/NewNote.vue'
import { useNotesStore } from '@store/notes';
import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  { path: '/notes/:id', component: NoteDetail },
  { path: '/notes/newNote', component: NewNote },
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