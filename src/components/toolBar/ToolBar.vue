<script setup  lang="ts">
import { PencilSquareIcon, TrashIcon, ListBulletIcon, Squares2X2Icon } from '@heroicons/vue/24/solid';
import { useNotesStore } from '@store/notes';
import { useRouter } from 'vue-router';
import { computed} from 'vue';


const store = useNotesStore();
const router = useRouter()

const displayMode = computed(() => store.getSelectedDisplayMode);

const setDisplayModeList = () => {
  store.changeDisplay('list')
  router.push('/list/notes')
}

const setDisplayModeBoard = () => {
  store.changeDisplay('board')
  router.push('/dashboard')
}

const newNote = async () => {
  const id = await store.newNote()
  if ( displayMode === 'list') {
    router.push(`/list/notes/${id}`)
  }else{
    router.push(`/dashboard/notes/${id}`)
  }
}

const deleteSelectedNote = async() => {
  if (store.selectedNoteId) {
    let isDeleted = await store.deleteNote();

    if (isDeleted) {
      const displayMode = store.getSelectedDisplayMode;
      if (displayMode === 'list') {
        router.push(`/list/notes`);
      } else {
        router.push(`/dashboard`);
      }
    }
  }
};

</script>

<template>
  <div class="px-6 flex w-full items-start">
    <div class="flex justify-between items-start gap-2 pr-4 w-full md:w-[33.2%]">
      <div class="flex gap-2 pb-2">
        <button @click="setDisplayModeList"  :class="{ 'rounded-md bg-gray-200 shadow-md': displayMode === 'list'}"
          class="hidden sm:inline-block  focus:bg-gray-100 focus:rounded focus:shadow-md hover:bg-gray-200 hover:rounded hover:shadow-md p-1">
          <ListBulletIcon class="h-6 w-6" />
        </button>
        <button @click="setDisplayModeBoard"  :class="{ 'rounded-md bg-gray-200 shadow-md': displayMode === 'board' }"
          class="focus:bg-gray-100 focus:rounded focus:shadow-md hover:bg-gray-200 hover:rounded hover:shadow-md p-1">
          <Squares2X2Icon class="h-6 w-6" />
        </button>
      </div>
      <div>
        <button @click="deleteSelectedNote" class="flex justify-between items-center w-full">
          <span
            class="focus:bg-gray-100 focus:rounded focus:shadow-md hover:bg-gray-200 hover:rounded hover:shadow-md p-1">
            <TrashIcon class="h-6 w-6" />
          </span>
        </button>
      </div>
    </div>
    <div class="pl-4 border-l-2 justify-start w-1/2 flex items-center">
      <button @click="newNote"
        class="focus:bg-gray-100 focus:rounded focus:shadow-md hover:bg-gray-200 hover:rounded hover:shadow-md p-1">
        <span>
          <PencilSquareIcon class="h-6 w-6" />
        </span>
      </button>
    </div>
  </div>
</template>
