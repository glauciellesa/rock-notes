import { Note } from '@models/note';
import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"


export const useNotesStore = defineStore("notes", {
  state: () => ({ notes: [] as Note[], selectedNoteId: null as number | null }),
  getters: {
    getNotes(state) {
      return state.notes
    },
    getSelectedNote(state) {
      return state.notes.find(note => +note.id === state.selectedNoteId)
    },
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
    },
    selectNote(id: number) {
      this.selectedNoteId = id
    },
    async deleteNote() {
      if (this.selectedNoteId !== null) {
        try {
          await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/${this.selectedNoteId}`);
          this.notes = this.notes.filter(note => note.id !== this.selectedNoteId);
          this.selectedNoteId = null;
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      }
    }
  },
})