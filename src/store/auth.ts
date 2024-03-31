import axios from 'axios';
import { defineStore } from 'pinia';
import { deleteCookie, getCookie, setCookie } from '@helpers/cookies';

const baseUrl = `${import.meta.env.VITE_BASE_API_URL}/users`;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: getCookie("user") ? JSON.parse(getCookie("user")!) : null,
  }),
  getters: {
    getUser(state) {
      return state.user
    },
    isUserLoggedIn(state) {
      return !!state.user
    }
  },

  actions: {
    async signup(userName: string, password: string) {
      const newUser = {
        userName,
        password
      }
      try {
        const response = await axios.post(`${baseUrl}`, newUser);
        const user = response.data;
        await this.login(user.userName, user.password)

      } catch (error) {
        console.error('Signup failed:', error);
      }
    },
    async login(username: string, password: string) {
      try {
        const response = await axios.get(`${baseUrl}?userName=${username}&password=${password}`);
        const userList = response.data;

        if (userList.lenght == 0) {
          return null
        } else {
          this.user = userList[0].userName;
          setCookie('user', JSON.stringify(userList[0].userName));
          return userList[0].userName
        }
      } catch (error) {
        this.user = null
        deleteCookie('user');
        console.error('Login failed:', error);
      }
    },

    async logout() {
      this.user = null;
      deleteCookie('user');
    }
  }
});
