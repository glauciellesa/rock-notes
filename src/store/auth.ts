import axios from 'axios';
import { defineStore } from 'pinia';
import router from '../routes/router';

const baseUrl = `${import.meta.env.VITE_BASE_API_URL}/users`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    returnUrl: null
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post(`${baseUrl}/authenticate`, { username, password });
        const user = response.data;

        // update pinia state
        this.user = user;
        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        // redirect to previous url or default to home page
        router.push(this.returnUrl || '/');
      } catch (error) {
        console.error('Login failed:', error);
        // Handle error, show error message to the user, etc.
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
    }
  }
});
