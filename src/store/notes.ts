import { useAuthStore } from '@store/auth';
import { Note } from '@models/note';
import { defineStore } from 'pinia'
import axios from "axios"

const baseUrl = `${import.meta.env.VITE_BASE_API_URL}/notes`;

export const useNotesStore = defineStore("notes", {
  state: () => ({ notes: [] as Note[], selectedNoteId: null as string | null, displayMode: 'list' as "list" | "board" }),

  getters: {
    getSelectedDisplayMode(state) {
      return state.displayMode
    },

    getNotes(state) {
      return state.notes
    },

    getSelectedNote(state) {
      return state.notes.find(note => note.id === state.selectedNoteId)
    }
  },
  actions: {
    changeDisplay(displaySelected: 'list' | 'board') {
      this.displayMode = displaySelected
    },

    async fetchNotes() {
      const authStore = useAuthStore()
      try {
        const data = await axios.get(`${baseUrl}?userName=${authStore.getUser}`)
        this.notes = data.data
      }
      catch (error) {
        console.error(error)
      }
    },

    selectNote(id: string) {
      this.selectedNoteId = id
    },

    async newNote() {
      const authStore = useAuthStore()
      try {
        const newNote = {
          title: '',
          body: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          userName: authStore.getUser
        } as Note
        const response = await axios.post(`${baseUrl}`, newNote);
        const savedNote = await response.data

        this.notes = [savedNote, ...this.notes]
        this.selectedNoteId = savedNote.id
        return savedNote.id;

      } catch (error) {
        console.error('Error adding new note:', error);
      }

    },

    async editTitle(newTitle: string) {
      if (this.selectedNoteId) {
        try {
          await axios.patch(`${baseUrl}/${this.selectedNoteId}`, { title: newTitle, updatedAt: new Date() });
          this.notes = this.notes.map(note => {
            if (note.id === this.selectedNoteId) {
              return {
                ...note, title: newTitle
              }
            }
            return note
          });
        } catch (error) {
          console.error('Error editing title:', error);
        }
      }
    },

    async editBody(newBody: string) {
      if (this.selectedNoteId) {
        try {
          await axios.patch(`${baseUrl}/${this.selectedNoteId}`, { body: newBody, updatedAt: new Date() });
          this.notes = this.notes.map(note => {
            if (note.id === this.selectedNoteId) {
              return {
                ...note, body: newBody
              }
            }
            return note
          });

        } catch (error) {
          console.error('Error editing body:', error);
        }
      }
    },

    async deleteNote() {
      if (this.selectedNoteId) {
        try {
          await axios.delete(`${baseUrl}/${this.selectedNoteId}`);
          this.notes = this.notes.filter(note => note.id !== this.selectedNoteId);
          this.selectedNoteId = null;
          return true
        } catch (error) {
          console.error('Error deleting note:', error);
          return false
        }
      }
    }
  },
})