import { Note } from '@models/note';
import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"


export const useNotesStore = defineStore("notes", {
  state: () => ({ notes: [] as Note[], selectedNoteId: null as string | null }),
  getters: {
    getNotes(state) {
      return state.notes
    },
    getSelectedNote(state) {
      return state.notes.find(note => note.id === state.selectedNoteId)
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

    selectNote(id: string) {
      this.selectedNoteId = id
    },

    async editeTitle(newTitle: string) {
      if (this.selectedNoteId) {
        try {
          await axios.patch(`${import.meta.env.VITE_BASE_API_URL}/${this.selectedNoteId}`, { title: newTitle, updatedAt: new Date() });
          this.notes = this.notes.map(note => {
            if (note.id === this.selectedNoteId) {
              return {
                ...note, title: newTitle
              }
            }
            return note
          });
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      }
    },

    async editeBody(newBody: string) {
      if (this.selectedNoteId) {
        try {
          await axios.patch(`${import.meta.env.VITE_BASE_API_URL}/${this.selectedNoteId}`, { body: newBody, updatedAt: new Date() });
          this.notes = this.notes.map(note => {
            if (note.id === this.selectedNoteId) {
              return {
                ...note, body: newBody
              }
            }
            return note
          });

        } catch (error) {
          console.error('Error deleting note:', error);
        }
      }
    },

    async deleteNote() {
      if (this.selectedNoteId) {
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