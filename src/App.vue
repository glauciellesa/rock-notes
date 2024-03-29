<script setup lang="ts">
import ListNotes from '@components/listNotes/ListNotes.vue'
/*import SearchBar from '@components/searchBar/SearchBar.vue'*/
import { useNotesStore } from '@store/notes';
import { useRouter } from 'vue-router';
import { /*ListBulletIcon, Squares2X2Icon,*/ PlusCircleIcon, TrashIcon } from '@heroicons/vue/24/solid';

const store = useNotesStore();
const router = useRouter()

const newNote = async () => {
  const id = await store.newNote()
  router.push(`/notes/${id}`)
}
</script>

<template>

  <div class="flex gap-8 flex-col sm:flex-row w-full">
    <div class="w-full sm:w-1/5 sm:border-r-2 p-4">
      <div class="pb-8">
        <button @click="store.deleteNote" class="flex justify-end items-center w-full">
          <!--  <div class="flex items-center gap-2">
            <button
              class="focus:bg-gray-100 focus:rounded focus:shadow-md hover:bg-gray-200 hover:rounded hover:shadow-md p-1">
              <ListBulletIcon class="h-6 w-6" />
            </button>
            <button
              class="focus:bg-gray-100 focus:rounded focus:shadow-md hover:bg-gray-200 hover:rounded hover:shadow-md p-1">
              <Squares2X2Icon class="h-6 w-6" />
            </button>
          </div>-->
          <span>
            <TrashIcon class="h-6 w-6" />
          </span>
        </button>
      </div>
      <ListNotes />
    </div>
    <main class="flex-1">
      <div class="flex justify-between pb-3 sm:pt-3">
        <button @click="newNote">
          <span>
            <PlusCircleIcon class="h-6 w-6" />
          </span>
        </button>
        <!--   <SearchBar />-->
      </div>
      <RouterView />
    </main>
  </div>
</template>
