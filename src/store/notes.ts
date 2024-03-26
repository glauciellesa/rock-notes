import { Note } from '@models/note';
import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"


export const useNotesStore = defineStore("notes",{
    state: () => ({notes:[] as Note[]}),
    getters: {
      getNotes(state){
        return state.notes
      }
    },
    actions: {
      async fetchNotes() {
        try {
          const data = await axios.get(import.meta.env.VITE_BASE_API_URL)
            this.notes = data.data
          }
          catch (error) {
            console.log(error)
        }
      }
    },
})